const Router = require("koa-router");
const { create, list } = require("../controller/label.controller");
const { verifyAuth } = require("../middleware/auth.middleware");

const labelRouter = new Router();

labelRouter.post("/label", verifyAuth, create);
labelRouter.get("/label", verifyAuth, list);

module.exports = labelRouter;
