const fileService = require("../service/file.service");
const UserService = require("../service/user.service");
const fs = require("fs");

class UserController {
  async create(ctx, next) {
    const user = ctx.request.body;
    const result = await UserService.create(user);
    ctx.body = result;
  }
  async avatarInfo(ctx, next) {
    const { userId } = ctx.params;
    const result = await fileService.getAvatarByUserId(userId);
    // ctx.body = result;
    //提供图像信息
    ctx.response.set("content-type", result.mimetype);//告诉浏览器类型，这样可以直接打开图片而不是下载
    ctx.body = fs.createReadStream(`./uploads/avatar/${result.filename}`);
  }
}

module.exports = new UserController();
