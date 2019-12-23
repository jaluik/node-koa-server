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

router.get("/:type/:id", new Auth().m, async ctx => {
  const v = await new ClassicValidator().validate(ctx);
  const id = v.get("path.id");
  const type = v.get("path.type");
  const artDetail = await new Art(id, type).getDetail(ctx.auth.uid);
  artDetail.art.setDataValue("like_status", artDetail.like_status);
  ctx.body = artDetail.art;
});

router.get("/:type/:id/favor", new Auth().m, async (ctx, next) => {
  const v = await new ClassicValidator().validate(ctx);
  const id = v.get("path.id");
  const type = v.get("path.type");
  const artDetail = await new Art(id, type).getDetail(ctx.auth.uid);
  ctx.body = {
    fav_nums: artDetail.art.fav_nums,
    like_status: artDetail.like_status
  };
});

router.get("/:type/:id", new Auth().m, async ctx => {});

router.get("/favor", new Auth().m, async ctx => {
  const uid = ctx.auth.uid;
  ctx.body = await Favor.getMyClassicFavors(uid);
});

module.exports = router;
