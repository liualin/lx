var gulp = require('gulp');
var webserver = require('gulp-webserver')
var sequence = require('gulp-sequence')
var zcss = require('gulp-clean-css')
var uglify = require('gulp-uglify')
var htmlmin = require('gulp-htmlmin')
gulp.task('css', function() {
    gulp.src('./src/**/*.css')
        .pipe(zcss())
        .pipe(gulp.dest('./zlib/css'))
})
gulp.task('js', function() {
    gulp.src('./src/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./zlib/js'))
})
gulp.task('html', function() {
    gulp.src('./src/index.html')
        .pipe(htmlmin())
        .pipe(gulp.dest('./zlib'))
})
gulp.task('server', function() {
    gulp.src('src')
        .pipe(webserver({
            host: 'localhost',
            port: 8080,
            livereload: true, //实时更新
            open: true,
            middleware: function(req, res, next) {

                next()
            }
        }))
})
gulp.task('default', function(cb) {
    sequence('css', 'js', 'html', 'server', cb)
})