const { sequelize } = require("../../core/db");
const { Sequelize, Model, Op } = require("sequelize");
const { Art } = require("./art");

class Favor extends Model {
  static async like(art_id, type, uid) {
    const favour = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    });
    if (favour) {
      throw new global.errs.LikeError();
    }
    return sequelize.transaction(async t => {
      await Favor.create(
        {
          art_id,
          type,
          uid
        },
        {
          transaction: t
        }
      );
      const art = await Art.getData(art_id, type);
      await art.increment("fav_nums", { by: 1, transaction: t });
    });
  }

  static async dislike(art_id, type, uid) {
    const favour = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    });
    if (!favour) {
      throw new global.errs.DislikeError();
    }
    return sequelize.transaction(async t => {
      await favour.destroy({
        force: true,
        transaction: t
      });
      const art = await Art.getData(art_id, type);
      await art.decrement("fav_nums", { by: 1, transaction: t });
    });
  }
  static async userLikeIt(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    });
    return favor ? true : false;
  }

  static async getMyClassicFavors(uid) {
    const arts = await Favor.findAll({
      where: {
        uid,
        type: {
          [Op.not]: 400
        }
      }
    });
    if (!arts) {
      throw new global.errs.NotFound();
    }
    return await Art.getList(arts);
  }
  static async getBookFavor(uid, bookId) {
    const favorNums = await Favor.count({
      where: {
        art_id: bookId,
        type: 400
      }
    });
    const myFavor = await Favor.findOne({
      where: {
        art_id: bookId,
        uid,
        type: 400
      }
    });
    return {
      fav_nums: favorNums,
      likeStatus: myFavor ? 1 : 0
    };
  }
}

Favor.init(
  {
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
  },
  {
    sequelize,
    tableName: "favor"
  }
);

module.exports = {
  Favor
};
