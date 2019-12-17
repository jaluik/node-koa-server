const Router = require("koa-router");
const { success } = require("../../lib/helper");
const { User } = require("../../models/user");
const router = new Router({
  prefix: "/v1/user"
});
const { RegisterValidator } = require("../../validators/validator");

router.post("/register", async ctx => {
  const v = await new RegisterValidator().validate(ctx);

  const user = {
    email: v.get("body.email"),
    password: v.get("body.password1"),
    nickname: v.get("body.nickname")
  };
  await User.create(user);

  //   ctx.body = {
  //     key: "success"
  //   };
  success("新增成功");
});

module.exports = router;
