const Router = require("koa-router");
const router = new Router({
  prefix: "/v1/book"
});
const { HotBook } = require("../../models/hot-book");
const { Book } = require("../../models/book");
const {
  PositiveIntegerValidator,
  SearchValidator,
  AddShortCommentValidator
} = require("../../validators/validator");
const { Auth } = require("../../../middlewares/auth");
const { Favor } = require("../../models/favor");
const { Comment } = require("../../models/book-comment");
const { success } = require("../../lib/helper");

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
  const result = await Book.searchFromYuShu(
    v.get("query.q"),
    v.get("query.count"),
    v.get("query.start")
  );
  ctx.body = result;
});

router.get("/favor/count", new Auth().m, async ctx => {
  const count = await Book.getMyFavorBookCount(ctx.auth.uid);
  ctx.body = { count };
});

router.get("/:book_id/favor", new Auth().m, async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: "book_id"
  });
  const favor = await Favor.getBookFavor(ctx.auth.uid, v.get("path.book_id"));
  ctx.body = favor;
});

router.post("/add/short_comment", new Auth().m, async ctx => {
  const v = await new AddShortCommentValidator().validate(ctx, {
    id: "book_id"
  });
  await Comment.addComment(v.get("body.book_id"), v.get("body.content"));
  success();
});

router.get("/:book_id/short_comment", new Auth().m, async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: "book_id"
  });
  const books = await Comment.getComment(v.get("path.book_id"));
  ctx.body = books;
});

router.get("/hot_keyword", async ctx => {
  ctx.body = {
    hot: ["python", "哈利波特"]
  };
});
module.exports = router;
