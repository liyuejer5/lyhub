const errorType = require("../constants/error-types");

const errorHandler = (error, ctx) => {
  let status, message;
  switch (error.message) {
    case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      message = "用户名或密码不能为空";
      break;
    case errorType.NAME_IS_EXISTS:
      status = 409;
      message = "用户名已存在";
      break;
    case errorType.NAME_IS_NOT_EXISTS:
      status = 400;
      message = "用户名不存在";
      break;
    case errorType.PASSWORD_IS_ERROR:
      status = 400;
      message = "密码错误";
      break;
    case errorType.NOT_AUTHORIZATION:
      status = 401;
      message = "无效的token";
      break;
    case errorType.NOT_PERMISSION:
      status = 401;
      message = "您没有权限这样做";
      break;
    default:
      status = 404;
      message = "Not Found";
  }
  ctx.status = status;
  ctx.body = message;
};

module.exports = errorHandler;
