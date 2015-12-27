var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var react = require('gulp-react');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var runSequence = require('gulp-run-sequence');

/**
  Paths
*/

var paths = {
  root: 'dist',
  scripts: 'client/script/*.js',
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

gulp.task('default', function(cb) {
  runSequence('clean', 'copyAssets', 'copyStyles', 'transform', 'bundle', cb);
});


/**
  Clean
*/

gulp.task('clean', function() {
  return gulp.src('dist', {
    read: false
  }).pipe(clean());
});

/**
  Copy Assets & Styles
*/

gulp.task('copyAssets', function() {
  gulp.src(paths.assets)
    .pipe(gulp.dest(paths.destAssets));
});


gulp.task('copyStyles', function() {
  gulp.src(paths.styles)
    .pipe(gulp.dest(paths.destStyles));
});

/**
  Transform JSX to JS
*/

gulp.task('transform', function() {
  gulp.src(paths.scripts)
    .pipe(react())
    .pipe(gulp.dest(paths.destScripts));
});

/**
  Browserify Bundle
*/

gulp.task('bundle', function() {
  return browserify('./client/scripts/main.js')
    .bundle()
    .on('error', function(err) {
      gutil.log('Gulp Log, browserify error', err);
    })
    .pipe(source('main.js'))
    .pipe(gulp.dest('./dist/scripts/'));
});
