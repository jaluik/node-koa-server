const { Sequelize, Model } = require("sequelize");
const { unset } = require("lodash");
const {
  dbName,
  host,
  port,
  user,
  password
} = require("../config/config").database;

const sequelize = new Sequelize(dbName, user, password, {
  // 数据库类型
  dialect: "mysql",
  host,
  port,
  logging: true,
  timezone: "+08:00",
  define: {
    //   create_time , update_time
    timestamps: true,
    paranoid: true,
    createAt: "createAt",
    updateAt: "update_at",
    deleteAt: "delete_at",
    underscored: true
  }
});

sequelize.sync({
  force: false
});

Model.prototype.toJSON = function() {
  let data = { ...this.dataValues };
  unset(data, "updatedAt");
  unset(data, "createdAt");
  unset(data, "deletedAt");
  if (Array.isArray(this.exclude)) {
    this.exclude.forEach(item => {
      unset(data, item);
    });
  }

  return data;
};

module.exports = {
  sequelize
};
