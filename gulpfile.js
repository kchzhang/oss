const { src, dest, series } = require('gulp');
const imagemin = require('gulp-imagemin'); //图片压缩
const uglify = require("gulp-uglify"); //js压缩
const less = require('gulp-less'); //less
const cleanCSS = require('gulp-clean-css'); //css压缩

// `clean` 函数并未被导出（export），因此被认为是私有任务（private task）。
// 它仍然可以被用在 `series()` 组合中。
function clean(cb) {
    // body omitted
    cb();
}

// `build` 函数被导出（export）了，因此它是一个公开任务（public task），并且可以被 `gulp` 命令直接调用。
// 它也仍然可以被用在 `series()` 组合中。
function build(cb) {
    // body omitted
    cb();
}

function HTML(cb) {
    return src("src/font/websiteProject/**/*.html")
        .pipe(dest("dist"))
    cb();
}

function JS(cb) {
    return src("src/font/websiteProject/**/*.js")
        .pipe(uglify())
        .pipe(dest("dist"))
    cb();
}

function IMAGE(cb) {
    return src("src/font/websiteProject/**/*")
        .pipe(imagemin())
        .pipe(dest("dist"))
    cb();
}

function CSS(cb) {
    return src(["src/font/websiteProject/**/*.less", "src/font/websiteProject/**/*.css"])
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(dest("dist"))
    cb();
}

exports.build = build;
exports.default = series(clean, build, HTML, IMAGE, CSS, JS);
