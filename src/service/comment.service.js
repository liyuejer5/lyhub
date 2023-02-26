const connection = require("../app/database");

class CommentService {
  async create(momentId, content, user_id) {
    const statement = `INSERT INTO comment (moment_id,content,user_id) VALUES(?,?,?);`;
    const result = await connection.execute(statement, [
      momentId,
      content,
      user_id,
    ]);
    return result[0];
  }
  async reply(momentId, content, user_id, commentId) {
    const statement = `INSERT INTO comment (moment_id,content,user_id,comment_id) VALUES(?,?,?,?);`;
    const result = await connection.execute(statement, [
      momentId,
      content,
      user_id,
      commentId,
    ]);
    return result[0];
  }
  async update(content, commentId) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`;
    const result = await connection.execute(statement, [content, commentId]);
    return result[0];
  }
  async remove(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?;`;
    const result = await connection.execute(statement, [commentId]);
    return result[0];
  }
  async getCommentListById(momentId) {
    const statement = `SELECT * FROM comment WHERE moment_id = ?;`;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }
}

module.exports = new CommentService();
