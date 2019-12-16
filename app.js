const Koa = require("koa");
const InitManager = require("./core/init");
const parser = require("koa-bodyparser");
const catchError = require("./middlewares/exception");

require("./app/models/user");

const app = new Koa();

app.use(catchError);
app.use(parser());
InitManager.initCore(app);

// app.use(book.routes());
// app.use(classic.routes());

app.listen(3000);
