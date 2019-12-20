const Koa = require('koa');
const app = new Koa();
const views = require('koa-views')
const path = require('path')
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
const _static = require('koa-static');

// 配置静态web服务的中间件
app.use(_static(
    path.join(__dirname, './font')
))
// 加载模板引擎
app.use(views(path.join(__dirname, './font'), {
    extension: 'html'
}))

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// add url-route:
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello1, ${name}!</h1>`;
});

router.get('/', async (ctx, next) => {
    let title = 'hello koa2'
    await ctx.render('index', {
        title,
    })
});

// add router middleware:
app.use(router.routes());

// app.use( async ( ctx ) => {
//     let title = 'hello koa2'
//     await ctx.render('index', {
//       title,
//     })
//   })

app.listen(3000);