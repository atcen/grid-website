// General
var gulp = require("gulp");
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve', function () {

    browserSync.init({
        server: "./src",
        open: false,
        notify: false,
        reloadOnRestart: true
    });

    gulp.watch("src/**/*").on('change', browserSync.reload);
});

// ********************
//    Task Processes
// ********************
gulp.task('default', gulp.series('serve'));