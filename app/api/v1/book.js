const Router = require("koa-router");
const router = new Router({
  prefix: "/v1/book"
});
const { HotBook } = require("../../models/hot-book");
const { Book } = require("../../models/book");
const {
  PositiveIntegerValidator,
  SearchValidator
} = require("../../validators/validator");

router.get("/hot_list", async (ctx, next) => {
  const books = await HotBook.getAll();
  ctx.body = {
    books
  };
});

router.get("/:id/detail", async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx);
  const book = new Book(v.get("path.id"));
  ctx.body = await book.getDetail();
});

router.get("/search", async ctx => {
  const v = await new SearchValidator().validate(ctx);
  const result = Book.searchFromYuShu(
    v.get("query.q"),
    v.get("query.start"),
    v.get("query.count")
  );
  ctx.body = result;
});

module.exports = router;
