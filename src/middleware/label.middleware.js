const labelService = require("../service/label.service");

const verifyLabelExists = async (ctx, next) => {
  //取出标签
  const { labels } = ctx.request.body;
  //判断每一个标签是否存在
  const newLables = [];
  for (let name of labels) {
    const labelResult = await labelService.getLabelByName(name);
    const label = { name };
    if (!labelResult) {
      const result = await labelService.create(name);
      label.id = result.insertId;
    } else {
      label.id = labelResult.id;
    }
    newLables.push(label);
  }
  ctx.labels = newLables;
  await next();
};

module.exports = { verifyLabelExists };
