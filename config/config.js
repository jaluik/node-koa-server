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
  },
  wx: {
    appId: "",
    appSecret: "",
    loginUrl:
      "https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code"
  }
};
