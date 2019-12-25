const { sequelize } = require("../../core/db");
const { Sequelize, Model } = require("sequelize");

class Comment extends Model {
  static async addComment(bookId, content) {
    const comment = await Comment.findOne({
      where: {
        content,
        book_id: bookId
      }
    });
    if (!comment) {
      return await Comment.create({
        book_id: bookId,
        content,
        nums: 1
      });
    } else {
      return await comment.increment("nums", {
        by: 1
      });
    }
  }

  static async getComment(bookId) {
    const comments = await Comment.findAll({
      where: {
        book_id: bookId
      }
    });
    return comments;
  }

  toJSON() {
    return {
      content: this.getDataValue("content"),
      nums: this.getDataValue("nums")
    };
  }
}

Comment.init(
  {
    content: Sequelize.STRING(12),
    nums: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    book_id: Sequelize.INTEGER
  },
  {
    sequelize,
    tableName: "comment"
  }
);

module.exports = {
  Comment
};
