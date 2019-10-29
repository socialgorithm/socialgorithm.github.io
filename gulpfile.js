var childProc = require("child_process");
var gulp = require("gulp");
var less = require("gulp-less");
var _browserSync = require("browser-sync").create();
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

// BrowserSync
function browserSync(done) {
  _browserSync.init({
    server: {
      baseDir: "./_site/"
    },
    port: 4000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  _browserSync.reload();
  done();
}

function lessCSS() {
  return gulp.src("src/less/new-age.less")
    .pipe(less())
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(header(themeCopyright, { pkg: pkg }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("src/css"))
    .pipe(_browserSync.stream());
}

function minifyJS() {
  return gulp.src("src/js/new-age.js")
    .pipe(uglify())
    .pipe(header(themeCopyright, { pkg: pkg }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("src/js"))
    .pipe(_browserSync.stream());
};

// Copy vendor libraries from /node_modules into /vendor
function copyVendor(done) {
  gulp.src(["node_modules/bootstrap/dist/**/*", "!**/npm.js", "!**/bootstrap-theme.*", "!**/*.map"])
    .pipe(gulp.dest("src/vendor/bootstrap"));

  gulp.src(["node_modules/jquery/dist/jquery.js", "node_modules/jquery/dist/jquery.min.js"])
    .pipe(gulp.dest("src/vendor/jquery"));

  gulp.src(["node_modules/simple-line-icons/*/*"])
    .pipe(gulp.dest("src/vendor/simple-line-icons"));

  gulp.src([
    "node_modules/font-awesome/**",
    "!node_modules/font-awesome/**/*.map",
    "!node_modules/font-awesome/.npmignore",
    "!node_modules/font-awesome/*.txt",
    "!node_modules/font-awesome/*.md",
    "!node_modules/font-awesome/*.json"
  ])
    .pipe(gulp.dest("src/vendor/font-awesome"))
  done()
};

function jekyllBuild() {
  return childProc.spawn("jekyll", ["build"], {stdio: "inherit"});
};

function watch(done) {
  gulp.watch("src/less/*.less", lessCSS);
  gulp.watch("src/js/*.js", minifyJS);
  gulp.watch(["src/*.html", "src/_includes/*.html", "src/_layouts/*.html", "src/_posts/*"], gulp.series(jekyllBuild, browserSyncReload));
  done();
};

exports.build = gulp.series(lessCSS, minifyJS, copyVendor, jekyllBuild);
exports.serve = gulp.series(lessCSS, minifyJS, copyVendor, jekyllBuild, watch, browserSync);
