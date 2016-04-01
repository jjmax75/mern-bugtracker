var gulp = require('gulp');
var source = require('vinyl-source-stream');
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

  bundler.on('error', function(err) {
    console.error(err);
    this.emit('end');
  });

  function makeBundle() {
    bundler.transform('babelify', {presets: ['react']})
      .bundle()
      .pipe(source('bundle.js'))
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
