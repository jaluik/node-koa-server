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
  define: {}
});

module.exports = {
  sequelize
};
