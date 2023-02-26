const Router = require("koa-router");
const { verifyUser, handlePassword } = require("../middleware/user.middleware");
const { create, avatarInfo } = require("../controller/user.controller");

const userRouter = new Router();

userRouter.post("/users", verifyUser, handlePassword, create);

userRouter.get("/users/:userId/avatar", avatarInfo);

module.exports = userRouter;
