const Sequelize = require("sequelize");
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
    createAt: "create_at",
    updateAt: "update_at",
    deleteAt: "delete_at",
    underscored: true
  }
});

sequelize.sync({
  force: false
});

module.exports = {
  sequelize
};
