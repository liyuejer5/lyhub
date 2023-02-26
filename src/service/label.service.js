const connection = require("../app/database");

class LabelService {
  async create(labelName) {
    const statement = `INSERT INTO label (name) VALUES(?);`;
    const [result] = await connection.execute(statement, [labelName]);
    return result;
  }
  async getLabelByName(labelName) {
    const statement = `SELECT * FROM label WHERE name = ?;`;
    const [result] = await connection.execute(statement, [labelName]);
    return result[0];
  }
  async getLabelList(offset, size) {
    const statement = `SELECT * FROM label LIMIT ?,?;`;
    const [result] = await connection.execute(statement, [offset, size]);
    return result;
  }
}

module.exports = new LabelService();
