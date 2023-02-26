const labelService = require("../service/label.service");

class LableController {
  async create(ctx, next) {
    const { name } = ctx.request.body;
    const result = await labelService.create(name);
    ctx.body = result;
  }
  async list(ctx, next) {
    const { offset, size } = ctx.query;
    const result = await labelService.getLabelList(offset, size);
    ctx.body = result;
  }
}

module.exports = new LableController();
