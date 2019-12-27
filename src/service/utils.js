const fs = require('fs');
const path = require('path');

module.exports = {
    readFileJson({ url }) {
        return new Promise((resolve, reject) => {
            // fs模块读取json文件 对fs、path模块不熟悉的可以去查下官方文档
            fs.readFile(path.join(__dirname, url), function (err, data) {
                if (err) {
                    // 报错返回
                    resolve([])
                    return console.error(err);
                }
                let jsonData = data.toString();//将二进制的数据转换为字符串
                jsonData = JSON.parse(jsonData);//将字符串转换为json对象
                resolve(jsonData)
            })
        })
    },
    writeFile({ url, str }) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, url), str, async (err) => {
                if (err) {
                    resolve({ status: 500, message: "失败" })
                    return console.error(err);
                }
                resolve({ status: 200, message: "成功" })
            })
        })
    }
}