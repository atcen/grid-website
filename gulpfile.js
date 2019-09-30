// General
var gulp = require("gulp");
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();

//HTML Templating
var nunjucksRender = require('gulp-nunjucks-render');

gulp.task('nunjucks', function () {
    return gulp.src('src/*.{html,njk}')
        .pipe(plumber())
        .pipe(nunjucksRender({
            path: ['src/'] // String or Array
        }))
        .pipe(gulp.dest('dist'));
});

// CSS in /dist kopieren
gulp.task('style', function () {
    return gulp.src('./src/**/*.css')
        .pipe(plumber())
        .pipe(gulp.dest('./dist'));
});

// Static Server + watching scss/html files
gulp.task('serve', function () {

    browserSync.init({
        server: "./dist",
        open: false,
        notify: false,
        reloadOnRestart: true
    });
    gulp.watch(['src/**/*.{html,njk}'], gulp.series('nunjucks'));
    gulp.watch(['src/**/*.{css}'], gulp.series('style'));
    gulp.watch("dist/**/*").on('change', browserSync.reload);
});

// ********************
//    Task Processes
// ********************
gulp.task('default', gulp.series('nunjucks', 'style', 'serve'));
