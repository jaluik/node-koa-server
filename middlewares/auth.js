const basicAuth = require("basic-auth");
const jwt = require("jsonwebtoken");

class Auth {
  constructor() {}
  get m() {
    return async (ctx, next) => {
      // token检测
      const userToken = basicAuth(ctx.req);
      let errMsg = "token不合法";
      if (!userToken || !userToken.name) {
        throw new global.errs.Forbbiden(errMsg);
      }
      try {
        var decode = jwt.verify(
          userToken.name,
          global.config.security.secretKey
        );
      } catch (err) {
        if (err.name === "TokenExpiredError") {
          errMsg = "token已过期";
        }
        throw new global.errs.Forbbiden(errMsg);
      }
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      };
      await next();
    };
  }
}

module.exports = {
  Auth
};
