var childProc = require("child_process");
var gulp = require("gulp");
var less = require("gulp-less");
var browserSync = require("browser-sync").create();
var header = require("gulp-header");
var cleanCSS = require("gulp-clean-css");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var pkg = require("./package.json");

// Set the banner content
var themeCopyright = ['/*!\n',
  ' * Start Bootstrap - New Age Theme\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' Blackrock Digital\n',
  ' * Licensed under MIT License (https://github.com/BlackrockDigital/startbootstrap-new-age/blob/master/LICENSE)\n',
  ' */\n',
  ''
].join('');

// Compile LESS files from /less into /css
function lessCSS() {
  return gulp.src(["less/new-age.less"])
    .pipe(less())
    .pipe(header(themeCopyright, { pkg: pkg }))
    .pipe(gulp.dest("css"))
    .pipe(browserSync.reload({
      stream: true
    })) 
};

function minifyCSS() {
  return gulp.src("css/new-age.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(header(themeCopyright, { pkg: pkg }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("css"))
    .pipe(browserSync.reload({
      stream: true
    }))
};

function minifyJS() {
  return gulp.src("js/new-age.js")
    .pipe(uglify())
    .pipe(header(themeCopyright, { pkg: pkg }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("js"))
    .pipe(browserSync.reload({
      stream: true
    }))
};

// Copy vendor libraries from /node_modules into /vendor
function copyVendor(done) {
  gulp.src(["node_modules/bootstrap/dist/**/*", "!**/npm.js", "!**/bootstrap-theme.*", "!**/*.map"])
    .pipe(gulp.dest("vendor/bootstrap"));

  gulp.src(["node_modules/jquery/dist/jquery.js", "node_modules/jquery/dist/jquery.min.js"])
    .pipe(gulp.dest("vendor/jquery"));

  gulp.src(["node_modules/simple-line-icons/*/*"])
    .pipe(gulp.dest("vendor/simple-line-icons"));

  gulp.src([
    "node_modules/font-awesome/**",
    "!node_modules/font-awesome/**/*.map",
    "!node_modules/font-awesome/.npmignore",
    "!node_modules/font-awesome/*.txt",
    "!node_modules/font-awesome/*.md",
    "!node_modules/font-awesome/*.json"
  ])
    .pipe(gulp.dest("vendor/font-awesome"))
  done()
};

function jekyllBuild(done) {
  browserSync.notify("Building Jekyll");
  return childProc.spawn("jekyll", ["build"], {stdio: "inherit"})
    .on("close", done);
};

function browserSync() {
  browserSync.init({
    server: {
      baseDir: "_site"
    }
  })
};

function watch() {
  gulp.watch("less/*.less", lessCSS);
  gulp.watch("css/*.css", minifyCSS);
  gulp.watch("js/*.js", minifyJS);
  gulp.watch("js/**/*.js", browserSync.reload);
  gulp.watch(["*.html", "_includes/*.html", "_layouts/*.html", "_posts/*"], browserSync.reload);
};

exports.build = gulp.series(lessCSS, minifyCSS, minifyJS, copyVendor, jekyllBuild);
exports.serve = gulp.series(lessCSS, minifyCSS, minifyJS, copyVendor, jekyllBuild, browserSync.reload, watch);