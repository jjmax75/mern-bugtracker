var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var watchify = require('watchify');

function scripts(watch) {
  var bundler = browserify('./src/App.js', {});

  if (watch) {
    bundler.cache = {};
    bundler.packageCache = {};
    bundler = watchify(bundler);
  }

  bundler.on('update', makeBundle);

  bundler.on('log', function(msg) {console.log('Updated: ' + msg)});

  function makeBundle() {
    bundler.transform('babelify', {presets: ['react']})
      .bundle()
      .on('error', function(err) {
        console.error(err.message);
        console.error(err.stack);
        this.emit('end');
      })
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./static/'));
  };

  makeBundle();
};

gulp.task('bundle', function(){
  return scripts(false);
});

gulp.task('watch', function(){
  return scripts(true);
});
