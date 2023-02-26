const connection = require("../app/database");

class MomentService {
  async create(userId, content) {
    const statement = `INSERT INTO moment (user_id,content) VALUES(?,?);`;
    const result = await connection.execute(statement, [userId, content]);
    return result[0];
  }
  async getMomentById(momentId) {
    const statement = `SELECT m.id,m.content,m.createAt createTime,m.updateAt updateTime,
                      JSON_OBJECT('id',u.id,'name',u.name,'avatarUrl',u.avatar_url) user FROM moment m 
                      LEFT JOIN users u ON m.user_id = u.id WHERE m.id = 1;`;
    const [result] = await connection.execute(statement, [momentId]);
    return result[0];
  }
  async getMomentList(offset, size) {
    const statement = `SELECT m.id,m.content,m.createAt createTime,m.updateAt updateTime,
                      JSON_OBJECT('id',u.id,'name',u.name) user,
                      (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) commentCount 
                      FROM moment m LEFT JOIN users u ON m.user_id = u.id LIMIT ?,?;`;
    const [result] = await connection.execute(statement, [offset, size]);
    return result;
  }
  async updateMomentById(content, momentId) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [content, momentId]);
    return result;
  }
  async deleteMomentById(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }
  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result[0] ? true : false;
  }
  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id,label_id) VALUES(?,?);`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result;
  }
}

module.exports = new MomentService();
