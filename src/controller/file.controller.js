const { APP_HOST, APP_PORT } = require("../app/config");
const fileService = require("../service/file.service");
const userService = require("../service/user.service");

class FileController {
  async saveAvatarInfo(ctx, next) {
    //获取图像相关信息
    const { filename, mimetype, size } = ctx.req.file;
    const { id } = ctx.user;

    //保存到数据库
    const result = await fileService.createAvatar(filename, mimetype, size, id);

    //将图片地址保存到users表中
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
    await userService.updateAvatarUrlById(avatarUrl, id);
    ctx.body = result;
  }
}

module.exports = new FileController();
