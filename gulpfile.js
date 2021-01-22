'use strict';

var gulp = require('gulp');
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var postcss = require("gulp-postcss");
var autoprefixer = require('gulp-autoprefixer');
var csso = require("gulp-csso");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");

gulp.task("clean", function () {
    return del("build");
});

gulp.task("html", function () {
    return gulp.src("source/*.html")
        .pipe(posthtml([
            include()
        ]))
        .pipe(gulp.dest("build"));
});

gulp.task("copy", function () {
    return gulp.src([
            "source/fonts/**/*.{woff,woff2}",
            "source/img/**",
            "source/js/*.js",
            "source/*.ico",
            "source/*.htaccess"
        ], {
            base: "source"
        })
        .pipe(gulp.dest("build"));
});

gulp.task("webp", function () {
    return gulp.src("build/img/**/*.{png,jpg}")
        .pipe(webp({
            quality: 70
        }))
        .pipe(gulp.dest("build/img"));
});

gulp.task("images", function () {
    return gulp.src("build/img/**/*.{png,jpg,svg}")
        .pipe(imagemin([
            imagemin.optipng({
                optimizationLevel: 3
            }),
            imagemin.mozjpeg({
                progressive: true
            }),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest("build/img"));
});

gulp.task("js", function () {
    return gulp.src("source/js/*.js") 
    .pipe(gulp.dest("build/js"))
});

gulp.task("css", function () {
    return gulp.src("source/css/style.css")
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest("build/css"))
        .pipe(csso())
        .pipe(rename("style.min.css"))
        .pipe(sourcemap.write("."))
        .pipe(gulp.dest("build/css"))
        .pipe(server.stream());
});

gulp.task("server", function () {
    server.init({
        server: "build/",
    });

    gulp.watch("source/css/**/*.css", gulp.series("css", "refresh"));
    gulp.watch("source/img/icon-*.svg", gulp.series("html", "refresh"));
    gulp.watch("source/*.html", gulp.series("html", "refresh"));
    gulp.watch("source/js/*.js", gulp.series("js", "refresh"));
});

gulp.task("refresh", function (done) {
    server.reload();
    done();
    });

gulp.task("build", gulp.series("clean", "copy", "images", "webp", "css", "html"));
gulp.task("start", gulp.series("build", "server"));