const jwt = require("jsonwebtoken");
const { PUBLIC_KEY } = require("../app/config");

const errorType = require("../constants/error-types");
const UserService = require("../service/user.service");
const AuthService = require("../service/auth.service");
const md5password = require("../utils/password-md5");

const verifyLogin = async (ctx, next) => {
  //获取用户名密码
  const { name, password } = ctx.request.body;

  //判断用户名密码是否为空
  if (!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  //判断用户名是否存在
  const result = await UserService.getUserByName(name);
  let user = result[0];
  if (!user) {
    const error = new Error(errorType.NAME_IS_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }

  //判断密码是否匹配
  if (md5password(password) !== user.password) {
    const error = new Error(errorType.PASSWORD_IS_ERROR);
    return ctx.app.emit("error", error, ctx);
  }
  ctx.user = user;

  await next();
};

const verifyAuth = async (ctx, next) => {
  //获取token
  const authorization = ctx.headers.authorization;
  //没有传token
  if (!authorization) {
    const error = new Error(errorType.NOT_AUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
  const token = authorization.replace("Bearer ", "");
  //验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: "RS256",
    });
    ctx.user = result;
    await next();
  } catch (err) {
    console.log(err);
    const error = new Error(errorType.NOT_AUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
};

const verifyPermission = async (ctx, next) => {
  const [resourceKey] = Object.keys(ctx.params);
  const tableName = resourceKey.replace("Id", "");
  const resourceId = ctx.params[resourceKey];
  const { id } = ctx.user;
  const isPermission = await AuthService.checkResource(
    tableName,
    resourceId,
    id
  );
  if (!isPermission) {
    const error = new Error(errorType.NOT_PERMISSION);
    return ctx.app.emit("error", error, ctx);
  }
  await next();
};

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission,
};
