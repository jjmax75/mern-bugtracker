var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');

gulp.task('bundle', function(){
  return browserify('src/App.js')
    .transform('babelify', {presets: ['react']})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./static/'));
});
