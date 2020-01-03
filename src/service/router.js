const Router = require('koa-router');
const router = new Router();
const child_process = require('child_process');
const { readFileJson, readFileHtml, writeFile, copyFile, uploadWriteFile, removeFile } = require('./utils');
const multiparty = require("multiparty");

router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello1, ${name}!</h1>`;
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
 * 编辑页面
 */
router.get('/edit/:projectName/:pageName', async (ctx, next) => {
    const { projectName, pageName } = ctx.params;
    await ctx.render('edit', {
        project: { projectName, pageName }
    })
});

/**
 * 查询编辑页面
 */
router.post('/editContent', async (ctx, next) => {
    const { projectName, pageName } = ctx.request.body;
    const url = pageName == "index" ? `../font/websiteProject/${projectName}/${pageName}.html` : `../font/websiteProject/${projectName}/view/${pageName}.html`;
    const htmlData = await readFileHtml({ url });
    ctx.response.body = { status: 200, data: htmlData };
});

/**
 * 上传图片
 */
router.post('/upload', async (ctx, next) => {
    const file = await uploadWriteFile({ ctx, next });
    const { projectName, pageName, fieldName, originalFilename, originPath } = file
    const splitChunk = `websiteProject/${projectName[0]}/public`;
    const copyPath = originPath.replace("public", splitChunk);
    await copyFile({ originPath, copyPath });
    ctx.response.body = await removeFile({ originPath, copyPath })
});

/**
 * 保存编辑页面
 */
router.post('/saveContent', async (ctx, next) => {
    const { projectName, pageName, content } = ctx.request.body;
    const url = '../font/view/common/template.html';
    let htmlData = await readFileHtml({ url });
    htmlData = htmlData.split(/#content|#script/);
    const [header, ...footer] = htmlData;
    const str = [header, content, ...footer].join("");
    const htmlUrl = pageName == "index" ? `../font/websiteProject/${projectName}/${pageName}.html` : `../font/websiteProject/${projectName}/view/${pageName}.html`;
    const res = await writeFile({ url: htmlUrl, str })
    ctx.response.body = { status: 200, data: [] };
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
                "name": "首页",
                "pageName": "index",
                "url": `/websiteProject/${projectName}/index.html`,
                "desc": ""
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

/**
 * 下载项目
 */
router.post('/down', async (ctx, next) => {
    const fileName = `project${new Date().getTime()}.zip`;
    const { projectName } = ctx.request.body;
    const DELETEFILE = () => {
        return new Promise((resolve, reject) => {
            child_process.exec("rm -r dist src/font/dist", (code, stdout, stderr) => {
                resolve({ status: 200, message: "编译成功", data: "11111" })
                //resolve({ status: 200, message: "成功", data: "11111" })
                console.log({ code: -1, msg: `gulp新增失败11111${code}22222${stdout}33333${stderr}` })
            })
        })
    }

    const GULP = () => {
        return new Promise((resolve, reject) => {
            child_process.exec("gulp", (code, stdout, stderr) => {
                resolve({ status: 200, message: "编译成功", data: "11111" })
                //resolve({ status: 200, message: "成功", data: "11111" })
                console.log({ code: -1, msg: `gulp新增失败11111${code}22222${stdout}33333${stderr}` })
            })
        })
    }

    const ZIP = () => {
        return new Promise((resolve, reject) => {
            child_process.exec(`zip -r dist/${fileName} dist/${projectName}`, (code, stdout, stderr) => {
                resolve({ status: 200, message: "编译成功", data: "11111" })
                //resolve({ status: 200, message: "成功", data: "11111" })
                console.log({ code: -1, msg: `新增失败11111${code}22222${stdout}33333${stderr}` })
            })
        })
    }

    const COPY = () => {
        return new Promise((resolve, reject) => {
            child_process.exec(`cp -rf dist/ src/font/dist/`, (code, stdout, stderr) => {
                resolve({ status: 200, message: "编译成功", data: { fileName } })
                //resolve({ status: 200, message: "成功", data: "11111" })
                console.log({ code: -1, msg: `COPY新增失败11111${code}22222${stdout}33333${stderr}` })
            })
        })
    }

    await DELETEFILE();
    await GULP();
    await ZIP();
    ctx.response.body = await COPY();
});
/**
 * 新增工程页面
 */

router.post('/addPage', async (ctx, next) => {
    const { projectName, pageName, name, desc } = ctx.request.body;
    const jsonData = await readFileJson({ url: "./data/project.json" });
    const isExistList = jsonData.filter((v, k) => {
        return v.projectName == projectName;
    })
    if (isExistList.length) {
        const [{ urlList }] = isExistList;
        const isurlList = urlList.filter((v, k) => {
            return v.pageName == pageName;
        })
        if (!isurlList.length) {
            urlList.unshift({
                name,
                pageName,
                url: `/websiteProject/${projectName}/${pageName}.html`,
                desc
            })
            jsonData.map((v, k) => {
                return v.urlList == urlList;
            })
            let str = JSON.stringify(jsonData, null, 4);
            const res = await writeFile({ url: './data/project.json', str })
            child_process.exec(`cp -rf src/font/view/common/template.html src/font/websiteProject/${projectName}/${pageName}.html`, (code, stdout, stderr) => {
                //resolve({ status: 200, message: "成功", data: "11111" })
                console.log({ code: -1, msg: `COPY新增失败11111${code}22222${stdout}33333${stderr}` })
            })
        }
        ctx.response.redirect('/');

    } else {
        ctx.response.redirect('/');
    }

});
const routers = router.routes();
module.exports = routers
