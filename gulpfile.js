var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var source = require('vinyl-source-stream');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');
var watch = require('gulp-watch');
var watchify = require('watchify');
var reactify = require('reactify');

/**
  Paths
*/

var paths = {
  root: 'dist',
  main: './client/scripts/main.js',
  scripts: 'client/scripts/*.js',
  styles: 'client/styles/*.css',
  assets: 'client/assets/**/*',
  bower: 'client/bower-components/**/*',
  destAssets: 'dist/assets',
  destBower: 'dist/bower-components',
  destStyles: 'dist/styles',
  destScripts: 'dist/scripts'
};

/**
  Main Task Sequences
*/

gulp.task('default', ['clean', 'copyAssets', 'copyStyles', 'browserify', 'start', 'watchStyles']);


/**
  Clean
*/

gulp.task('clean', function() {
  return gulp.src('dist', { read: false }).pipe(clean({ force: true }));
});

/**
  Copy Assets & Styles
*/

gulp.task('copyAssets', ['clean'], function() {
  gulp.src(paths.assets)
    .pipe(gulp.dest(paths.destAssets));
});


gulp.task('copyStyles', ['clean'], function() {
  gulp.src(paths.styles)
    .pipe(gulp.dest(paths.destStyles));
});

/**
  Watch Styles
*/

gulp.task('watchStyles', ['start'], function() {
  return gulp.src(paths.styles)
    .pipe(watch(paths.styles))
    .pipe(gulp.dest(paths.destStyles));
});


/**
  Browserify, Transform JSX
*/

gulp.task('browserify', ['clean'], function() {
  var bundler = browserify({
    entries: [paths.main],
    transform: [reactify],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  });
  var watcher = watchify(bundler);
  return watcher
    .on('update', function() {
      var startedAt = Date.now();
      gutil.log('Gulp watcher updating ...');
      watcher.bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./dist/scripts/'));
      gutil.log('Gulp watcher updated!', (Date.now() - startedAt) + 'ms');
    })
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./dist/scripts/'));
});

/**
  Nodemon
*/

gulp.task('start', ['browserify'], function() {
  nodemon({ script: 'server/app.js', ignore: ['dist/**/*'] })
    .on('restart', function() {
      gutil.log('Gulp Nodemon Restarted')
    });
});
