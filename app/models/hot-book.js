const { Sequelize, Model, Op } = require("sequelize");
const { sequelize } = require("../../core/db");
const { Favor } = require("./favor");

class HotBook extends Model {
  static async getAll() {
    const books = await HotBook.findAll({
      order: ["index"]
    });
    const ids = [];
    books.forEach(book => {
      ids.push(book.id);
    });
    const favors = await Favor.findAll({
      where: {
        art_id: {
          [Op.in]: [ids]
        }
      },
      group: ["art_id"],
      attributes: ["art_id", [Sequelize.fn("COUNT", "*"), "count"]]
    });
    return favors;
  }
}
HotBook.init(
  {
    index: Sequelize.INTEGER,
    image: Sequelize.STRING,
    author: Sequelize.STRING,
    title: Sequelize.STRING
  },
  { sequelize, tableName: "hotBook" }
);

module.exports = {
  HotBook
};
