"use strict";

let gulp = require("gulp");
let sass = require("gulp-sass");
let plumber = require("gulp-plumber");
let postcss = require("gulp-postcss");
let autoprefixer = require("autoprefixer");
let mqpacker = require("css-mqpacker"); //Сортировка медиавыражений
let minify = require("gulp-csso"); //Минификация scc
let minifyjs = require("gulp-js-minify"); //Минификация js
let rename = require("gulp-rename"); //Переименовываем файлы
let imagemin = require("gulp-imagemin"); //Сжимаем изображения
let svgstore = require("gulp-svgstore"); //Спрайт svg
let svgmin = require("gulp-svgmin");  //Сжатие svg
let server = require("browser-sync").create();
let run = require("run-sequence");
let del = require("del"); //Очистка папки


// "build": "gulp style" (package.json)
// gulp.task("style", function() {
//   gulp.src("sass/style.scss")
//     .pipe(plumber())
//     .pipe(sass())
//     .pipe(postcss([
//       autoprefixer({browsers: [
//         "last 2 versions"
//       ]}),
//       mqpacker({
//         sort: false
//       })
//     ]))
//     .pipe(gulp.dest("css"))
//     .pipe(minify())
//     .pipe(rename("style.min.css"))
//     .pipe(gulp.dest("css"))
//     .pipe(server.stream());
// });

// Минификация JS
// gulp.task("js-mini", function () {
//   gulp.src("js/script.js")
//     .pipe(plumber())
//     .pipe(minifyjs())
//     .pipe(rename("script.min.js"))
//     .pipe(gulp.dest("js"));
// });

// gulp.task("images", function() {
//   return gulp.src("img/**/*.{png,jpg,gif}")
//   .pipe(imagemin([
//     imagemin.optipng({optimizationLevel: 3}),
//     imagemin.jpegtran({progressive: true})
//     ]))
//     .pipe(gulp.dest("img"));
// });

// gulp.task("symbols", function() {
//   return gulp.src("img/icons/*.svg")
//     .pipe(svgmin())
//     .pipe(svgstore({
//       inlineSvg: true
//     }))
//     .pipe(rename("symbols.svg"))
//     .pipe(gulp.dest("img"));
// });

// "start": "gulp serve" (package.json)
// gulp.task("serve", ["style"], function() {
//   server.init({
//     server: ".",
//     notify: false,
//     open: true,
//     cors: true,
//     ui: false
//   });

//   gulp.watch("sass/**/*.{scss,sass}", ["style"]);
//   gulp.watch("*.html").on("change", server.reload);
// });

// Gulp-sass для build
gulp.task("style", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 2 versions"
      ]}),
      mqpacker({
        sort: false
      })
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.reload({ stream: true }));
});

// Минификация JS для build
gulp.task("js-mini", function () {
  gulp.src("js/script.js")
    .pipe(plumber())
    .pipe(minifyjs())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("build/js"));
});

// Gulp-imagemin для build
gulp.task("images", function() {
  return gulp.src("build/img/**/*.{png,jpg,gif}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest("build/img"));
});

// Gulp-svgstore для build
gulp.task("symbols", function() {
  return gulp.src("build/img/icons/*.svg")
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("symbols.svg"))
    .pipe(gulp.dest("build/img"));
});

// Копирование html-файлов для живого сервера build
gulp.task("html:copy", function() {
  return gulp.src("*.html")
    .pipe(gulp.dest("build"));
});

gulp.task("html:update", ["html:copy"], function(done) {
  server.reload();
  done();
});

// Живой сервер для build
gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html", ["html:update"]);
});

// Копирование файлов для build (всегда висит)
gulp.task("copy", function() {
  return gulp.src([
      "fonts/**/*.{woff,woff2}",
      "img/**",
      "js/**",
      "*.html"
    ], {
      base: "."
    })
    .pipe(gulp.dest("build"));
});

// Очистка папки build (всегда висит)
gulp.task("clean", function() {
  return del("build");
});

gulp.task("build", function(fn) {
  run("clean", "copy", "style", "js-mini", "images", "symbols", fn);
});
