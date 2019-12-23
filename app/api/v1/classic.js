const Router = require("koa-router");
const router = new Router({
  prefix: "/v1/classic"
});
const { Flow } = require("../../models/flow");
const { Art } = require("../../models/art");
const { Favor } = require("../../models/favor");

const {
  PositiveIntegerValidator,
  ClassicValidator
} = require("../../validators/validator");
const { Auth } = require("../../../middlewares/auth");

router.get("/latest", new Auth().m, async (ctx, next) => {
  const flow = await Flow.findOne({
    order: [["index", "DESC"]]
  });
  if (!flow) {
    throw new global.errs.NotFound();
  }
  const art = await Art.getData(flow.art_id, flow.type);
  // art.dataValues.index = flow.index;
  const likePrevious = await Favor.userLikeIt(
    flow.art_id,
    flow.type,
    ctx.auth.uid
  );
  art.setDataValue("index", flow.index);
  art.setDataValue("like_status", likePrevious);
  ctx.body = art;
});

router.get("/:type/:id/favor", new Auth().m, async (ctx, next) => {
  const v = await new ClassicValidator().validate(ctx);
  const id = v.get("path.id");
  const type = v.get("path.type");
  const art = await Art.getData(id, Number(type));
  if (!type) {
    throw new global.errs.NotFound();
  }
  const like = await Favor.userLikeIt(id, type, ctx.auth.uid);
  ctx.body = {
    fav_nums: art.fav_nums,
    like_status: like
  };
});

router.get("/favor", new Auth().m, async ctx => {
  const uid = ctx.auth.uid;
  ctx.body = await Favor.getMyClassicFavors(uid);
});

module.exports = router;
