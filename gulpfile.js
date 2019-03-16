var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var paths = {
    css:['sass/style.scss'],
    html:['index.html']
};

gulp.task('mincss', function(){
    return gulp.src(paths.css)
        .pipe(minifyCss())
        .pipe(gulp.dest('DEST'));
});
/////////////////
//ТАСК BROWSER SYNC НА HTML
/////////////////
gulp.task('html', function () {
    gulp.src(paths.html)
    .pipe(reload({stream:true}));
});
/////////////////
//ТАСК BROWSER SYNC
/////////////////
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: "./"
        },
        port: 8080,
        open: true,
        notify: false
    });
});
/////////////////
// ТАСК BROWSER SYNC НА CSS
/////////////////
gulp.task('css', function () {
    return gulp.src(paths.css)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('DEST'))
        .pipe(reload({stream:true}));
});

gulp.task('watcher', function () {
    gulp.watch(paths.css, ['css']);
    gulp.watch(paths.html, ['html']);
});

gulp.task('default', ['watcher', 'browserSync']);