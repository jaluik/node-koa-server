module.exports = {
  // prod
  enviroment: "dev",
  database: {
    dbName: "island",
    host: "localhost",
    port: 3306,
    user: "root",
    password: "123456"
  },
  security: {
    secretKey: "abcdefg",
    expiresIn: 60 * 60
  }
};
