const Router = require("koa-router");
const router = new Router({
  prefix: "/v1/token"
});
const { LoginType } = require("../../lib/enum");
const { TokenValidator } = require("../../validators/validator");
const { User } = require("../../models/user");

router.post("/", async ctx => {
  const v = await new TokenValidator().validate(ctx);

  switch (v.get("body.type")) {
    case LoginType.USER_EMAIL:
      const user = await emailLogin(
        v.get("body.account"),
        v.get("body.secret")
      );
      break;

    case LoginType.USER_MINI_PROGRAM:
      break;
    default:
      throw new global.errs.ParameterException("没有相应的处理函数");
  }
});

async function emailLogin(account, secret) {
  const user = await User.verifyEmailPassword(account, secret);
}

module.exports = router;
