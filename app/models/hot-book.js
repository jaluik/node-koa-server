const { Sequelize, Model } = require("sequelize");
const { sequelize } = require("../../core/db");

class HotBook extends Model {
  static async getAll() {
    const books = await HotBook.findAll({
      order: ["index"]
    });
    const ids = [];
    books.forEach(book => {
      ids.push(book.id);
    });
  }
}
HotBook.init({
  index: Sequelize.INTEGER,
  image: Sequelize.STRING,
  author: Sequelize.STRING,
  title: Sequelize.STRING
});

module.exports = {
  HotBook
};
