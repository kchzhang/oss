const Router = require('koa-router');
const router = new Router();
const fs = require('fs');
const path = require('path');
const project = require('./data/project.json');
// add url-route:
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello1, ${name}!</h1>`;
});

router.get('/', async (ctx, next) => {
    let title = 'hello koa2'
    await ctx.render('index', {
        title,
        project
    })

});

router.get('/', async (ctx, next) => {
    let title = 'hello koa2'
    // await ctx.render('index', {
    //     title,
    // })
    // let id = ctx.request.body.id
    // let params = ctx.request.body.params
    let writeJson = () => {
        return new Promise((resolve, reject) => {
            // fs模块读取json文件 对fs、path模块不熟悉的可以去查下官方文档
            fs.readFile(path.join(__dirname, './data/project.json'), function (err, data) {
                if (err) {
                    // 报错返回
                    resolve({ code: -1, msg: '新增失败' + err })
                    return console.error(err);
                }
                let jsonData = data.toString();//将二进制的数据转换为字符串
                jsonData = JSON.parse(jsonData);//将字符串转换为json对象
                // 有id值=>修改 无id值=>新增
                if (id) {
                    jsonData.splice(jsonData.findIndex(item => item.id === id), 1, params)
                } else {
                    // 有重复 => 返回-1 无重复 => 将params加到json数组末尾
                    let hasRepeat = jsonData.filter((item) => item.id === params.id);
                    hasRepeat ? resolve({ code: -1, msg: '新增失败，有重复项目id' }) : jsonData.push(params);
                }
                //因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
                let str = JSON.stringify(jsonData);
                fs.writeFile(path.join(__dirname, './data/project.json'), str, function (err) {
                    if (err) {
                        resolve({ code: -1, msg: '新增失败' + err })
                    }
                    resolve({ code: 0, msg: '新增成功' })
                })
            })
        })
    }
    // 返回给前端
    const writeJson1 = await writeJson();
    console.log(writeJson1);
    ctx.body = await writeJson()
});
const routers = router.routes();
module.exports = routers
