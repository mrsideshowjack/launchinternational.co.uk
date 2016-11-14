var gulp = require('gulp');
var webserver = require('gulp-webserver');
 
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