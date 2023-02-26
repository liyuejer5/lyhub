const momentService = require("../service/moment.service");

class MomentController {
  async create(ctx, next) {
    const userId = ctx.user.id;
    const { content } = ctx.request.body;
    //查询数据库
    const result = await momentService.create(userId, content);
    ctx.body = result;
  }
  async detail(ctx, next) {
    const momentId = ctx.params.momentId;
    //查询数据库
    const result = await momentService.getMomentById(momentId);
    ctx.body = result;
  }
  async list(ctx, next) {
    const { offset, size } = ctx.query;
    //查询数据库
    const result = await momentService.getMomentList(offset, size);
    ctx.body = result;
  }
  async update(ctx, next) {
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;
    //查询数据库
    const result = await momentService.updateMomentById(content, momentId);
    ctx.body = result;
  }
  async remove(ctx, next) {
    const { momentId } = ctx.params;
    //查询数据库
    const result = await momentService.deleteMomentById(momentId);
    ctx.body = result;
  }
  async addLabels(ctx, next) {
    const { momentId } = ctx.params;
    const { labels } = ctx;

    for (let label of labels) {
      const isExists = await momentService.hasLabel(momentId, label.id);
      if (!isExists) {
        const result = await momentService.addLabel(momentId, label.id);
        ctx.body = result;
      }
    }
  }
}

module.exports = new MomentController();
