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
var banner = ["/*!\n",
    " * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n",
    " * Copyright 2013-" + (new Date()).getFullYear(), " <%= pkg.author %>\n",
    " * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n",
    " */\n",
    ""
].join("");

// Compile LESS files from /less into /css
gulp.task("less", function() {
  return gulp.src("less/new-age.less")
    .pipe(less())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest("css"))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task("minify-css", ["less"], function() {
  return gulp.src("css/new-age.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("css"))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task("minify-js", function() {
  return gulp.src("js/new-age.js")
    .pipe(uglify())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("js"))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Copy vendor libraries from /node_modules into /vendor
gulp.task("copy-vendor", function() {
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
});

gulp.task("jekyll-build", function (done) {
  browserSync.notify("Building Jekyll");
  return childProc.spawn("jekyll", ["build"], {stdio: "inherit"})
    .on("close", done);
});

gulp.task("jekyll-rebuild", ["jekyll-build"], function () {
  browserSync.reload();
});

gulp.task("browser-sync", ["jekyll-build"], function() {
  browserSync.init({
    server: {
      baseDir: "_site"
    }
  })
});

gulp.task("watch", function() {
  gulp.watch("less/*.less", ["less"]);
  gulp.watch("css/*.css", ["minify-css"]);
  gulp.watch("js/*.js", ["minify-js"]);
  gulp.watch("js/**/*.js", browserSync.reload);
  gulp.watch(["*.html", "_includes/*.html", "_layouts/*.html", "_posts/*"], ["jekyll-rebuild"]);
});

gulp.task("build", ["less", "minify-css", "minify-js", "copy-vendor", "jekyll-build"]);

gulp.task("serve", ["build", "browser-sync", "watch"]);

gulp.task("default", ["build"]);
