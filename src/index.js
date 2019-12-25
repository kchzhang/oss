const Koa = require('koa');
const app = new Koa();
const views = require('koa-views')
const path = require('path')
// 注意require('koa-router')返回的是函数:
// const router = require('koa-router')();
const _static = require('koa-static');
const routers = require('./service/router');
//配置静态web服务的中间件
app.use(_static(
    path.join(__dirname, './font')
))
// 加载模板引擎
app.use(views(path.join(__dirname, './font'), {
    extension: 'ejs'
}))

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.use(routers);

app.listen(3000);