const Router = require('koa-router');
const router = new Router();
const child_process = require('child_process');
const { readFileJson, writeFile } = require('./utils');

router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello1, ${name}!</h1>`;
});

/**
 * 新增工程
 */
router.post('/', async (ctx, next) => {
    const { projectName, name, desc } = ctx.request.body;
    const baseProject = {
        projectName,
        name,
        url: `/websiteProject/${projectName}/index.html`,
        urlList: [
            {
                "pageName": "首页",
                "url": `/websiteProject/${projectName}/index.html`
            }
        ],
        desc
    };
    const project = await readFileJson({ url: "./data/project.json" });
    const isExistList = project.filter((v, k) => {
        return v.projectName == projectName
    })
    if (isExistList.length) {
        ctx.response.redirect('/');
    } else {
        project.unshift(baseProject);
        let str = JSON.stringify(project, null, 4);
        const res = await writeFile({ url: './data/project.json', str })
        child_process.exec(`sh ./sh/install.sh ${projectName}`, (code, stdout, stderr) => {
            console.log({ code: -1, msg: `新增失败${code}${stdout}${stderr}` })
        })
        ctx.response.redirect('/');
    }
});

/**
 * 查询工程
 */
router.get('/', async (ctx, next) => {
    const project = await readFileJson({ url: "./data/project.json" });
    await ctx.render('index', {
        project
    })
});

/**
 * 删除工程
 */
router.post('/delete', async (ctx, next) => {
    const { projectName } = ctx.request.body;
    const jsonData = await readFileJson({ url: "./data/project.json" });
    const isExistList = jsonData.filter((v, k) => {
        return v.projectName != projectName
    })
    let str = JSON.stringify(isExistList, null, 4);
    const res = await writeFile({ url: './data/project.json', str })
    ctx.response.body = await res;
});

const routers = router.routes();
module.exports = routers
