const { Op } = require("Sequelize");
const { flatten } = require("lodash");

const { Movie, Music, Sentence } = require("./classic");
class Art {
  constructor(art_id, type) {
    this.art_id = art_id;
    this.type = type;
  }

  async getDetail(uid) {
    const art = await Art.getData(this.art_id, Number(this.type));
    if (!this.type) {
      throw new global.errs.NotFound();
    }
    const { Favor } = require("./favor");
    const like = await Favor.userLikeIt(this.art_id, Number(this.type), uid);
    return {
      art,
      like_status: like
    };
  }

  static async getList(artInfoList) {
    const artInfoObj = {
      100: [],
      200: [],
      300: []
    };
    for (let artInfo of artInfoList) {
      artInfoObj[artInfo.type].push(artInfo.art_id);
    }
    const arts = [];
    for (let key in artInfoObj) {
      const ids = artInfoObj[key];
      if (ids.length > 0) {
        key = parseInt(key);
        arts.push(await Art._getListByType(artInfoObj[key], key));
      }
    }
    return flatten(arts);
  }

  static async _getListByType(ids, type) {
    let arts = null;
    const finder = {
      where: {
        id: {
          [Op.in]: ids
        }
      }
    };
    const scope = "bh";
    switch (type) {
      case 100:
        arts = await Movie.findAll(finder);
        break;
      case 200:
        arts = await Music.findAll(finder);
        break;
      case 300:
        arts = await Sentence.findAll(finder);
        break;
      case 400:
        break;
      default:
        break;
    }
    return arts;
  }

  static async getData(art_id, type, useScope = true) {
    let art = null;
    const finder = {
      where: {
        id: art_id
      }
    };
    const scope = useScope ? "bh" : null;
    switch (type) {
      case 100:
        art = await Movie.findOne(finder);
        break;
      case 200:
        art = await Music.findOne(finder);
        break;
      case 300:
        art = await Sentence.findOne(finder);
        break;
      case 400:
        const { Book } = require("./book");
        art = await Book.findOne(finder);
        if (!art) {
          art = await Book.create({
            id: art_id
          });
        }

        break;
      default:
        break;
    }
    return art;
  }
}

module.exports = {
  Art
};
