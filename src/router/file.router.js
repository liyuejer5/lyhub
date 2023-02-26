const Router = require("koa-router");
const { saveAvatarInfo } = require("../controller/file.controller");
const { verifyAuth } = require("../middleware/auth.middleware");
const { avatarHandler } = require("../middleware/file.middleware");

const fileRouter = new Router();

fileRouter.post("/upload/avatar", verifyAuth, avatarHandler, saveAvatarInfo);

module.exports = fileRouter;
