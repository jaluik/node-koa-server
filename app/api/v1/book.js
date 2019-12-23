const Router = require("koa-router");
const router = new Router({
  prefix: "/v1/book"
});

router.get("/hot_list", async (ctx, next) => {
  ctx.body = {};
});

module.exports = router;
