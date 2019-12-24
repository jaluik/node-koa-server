const Router = require("koa-router");
const router = new Router({
  prefix: "/v1/book"
});
const { HotBook } = require("../../models/hot-book");

router.get("/hot_list", async (ctx, next) => {
  const favors = await HotBook.getAll();
  ctx.body = {
    book: favors
  };
});

module.exports = router;
