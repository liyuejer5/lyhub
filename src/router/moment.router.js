const Router = require("koa-router");
const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");
const {
  create,
  detail,
  list,
  update,
  remove,
  addLabels,
} = require("../controller/moment.controller");
const { verifyLabelExists } = require("../middleware/label.middleware");

const momentRouter = new Router();

momentRouter.post("/moment", verifyAuth, create); //增
momentRouter.get("/moment/:momentId", detail); //查
momentRouter.get("/moment", list); //查
momentRouter.patch("/moment/:momentId", verifyAuth, verifyPermission, update); //改
momentRouter.delete("/moment/:momentId", verifyAuth, verifyPermission, remove); //删

//给动态添加标签
momentRouter.post(
  "/moment/:momentId/labels",
  verifyAuth,
  verifyPermission,
  verifyLabelExists,
  addLabels
);

module.exports = momentRouter;
