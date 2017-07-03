var gulp = require('gulp');
var webserver = require('gulp-webserver');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
var runSequence = require('run-sequence');
 
gulp.task('serve', function() {
  gulp.src('./')
    .pipe(webserver({
    	fallback: '/index.html',
    	port: 8080,
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

gulp.task('build', function(callback) {
  runSequence('imgmin',
              'htmlmin',
              'cssmin',
              callback);
});

gulp.task('imgmin', () =>
    gulp.src('images/*/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);

gulp.task('htmlmin', function() {
  return gulp.src('*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('cssmin', function() {
  return gulp.src('styles/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
    .pipe(gulp.dest('dist/styles'));
});