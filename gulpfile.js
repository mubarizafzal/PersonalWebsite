// npm init
// npm install --save-dev @babel/core @babel/preset-env @babel/cli gulp sass
// npm install browser-sync


// sass --watch --sourcemap=none public/css/style.scss:public/css/main.css
// npx babel --watch public/js/index.js --out-file public/js/main.js --presets=@babel/preset-env
// gulp

// accept 0 or 1 parameters
// /public/{var}index.html
// var can be "todo-list" or "calendar"
// for build.sh, it contains gulp command as well

var arg = '';
if (process.argv.length > 2) {
  arg = process.argv[2].slice(2);
  arg += '/';
}

const gulp = require('gulp');
const browserSync = require('browser-sync').create();

function watch () {
  gulp.watch(`./public/${arg}index.html`).on("change", browserSync.reload);
  gulp.watch(`./public/${arg}js/main.js`).on("change", browserSync.reload);
  gulp.watch(`./public/${arg}css/main.css`).on("change", browserSync.reload);
}

function server () {
  browserSync.init({
    notify: false,
    server: {
      baseDir: `./public/${arg}`
    }
  });

  gulp.watch(`./public/${arg}index.html`).on("change", browserSync.reload);
  gulp.watch(`./public/${arg}js/main.js`).on("change", browserSync.reload);
  gulp.watch(`./public/${arg}css/main.css`).on("change", browserSync.reload);
}

var build = gulp.series(server, watch);

gulp.task("default", build);