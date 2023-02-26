const koa = require("koa");
const bodyParser = require("koa-bodyparser");
const useRoutes = require("../router");
const errorHandler = require("./error-handle");

const app = new koa();

app.use(bodyParser());

useRoutes(app); //路由封装

app.on("error", errorHandler);

module.exports = app;
