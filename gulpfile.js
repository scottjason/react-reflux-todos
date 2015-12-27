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
	Main Task Sequences
*/

gulp.task('default', function(cb) {
  runSequence('transform', 'bundle', cb);
});

/**
  Paths
*/

var paths = {
  all: ['client/scripts/*.js', 'client/scripts/lib/*.js', 'client/styles/*.css', 'client/styles/lib/*.css'],
  scripts: ['client/script/*.js'],
  destSource: 'dist/scripts',
  dest: 'dist'
};

/**
  Transform JSX to JS Bunde
*/

gulp.task('transform', function() {
  gulp.src(paths.scripts)
    .pipe(react())
    .pipe(gulp.dest(paths.destSource));
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
