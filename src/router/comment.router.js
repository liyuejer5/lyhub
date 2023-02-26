const Router = require("koa-router");
const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");
const {
  create,
  reply,
  update,
  remove,
  list,
} = require("../controller/comment.controller");

const commentRouter = new Router();

commentRouter.post("/comment", verifyAuth, create);
commentRouter.post("/comment/:commentId/reply", verifyAuth, reply);
commentRouter.patch(
  "/comment/:commentId",
  verifyAuth,
  verifyPermission,
  update
);
commentRouter.delete(
  "/comment/:commentId",
  verifyAuth,
  verifyPermission,
  remove
);
commentRouter.get("/comment", verifyAuth, list);

module.exports = commentRouter;
