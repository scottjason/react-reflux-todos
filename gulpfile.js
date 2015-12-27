var gulp = require('gulp');
var stream = require('vinyl-source-stream');
var reactify = require('reactify');
var notify = require('gulp-notify');
var flatten = require('gulp-flatten');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');

var scriptsDir = './client/scripts';
var stylesDir = './client/styles';
var targetDir = './dist/';
var entryPoint = 'main.js';

gulp.task('buildScript', function() {
  return browserify({ entries: [scriptsDir + '/' + entryPoint], debug: true })
    .transform(reactify)
    .bundle()
    .pipe(stream(entryPoint))
    .pipe(gulp.dest(targetDir))
    .pipe(notify('Bundling done.'));
});

gulp.task('copyStyles', function() {
 return gulp.src(stylesDir + '*/**.css')
    .pipe(flatten())
    .pipe(gulp.dest(targetDir))
});

gulp.task('watch', function() {
  gulp.watch(scriptsDir + '/' + "*/**.js", ['buildScript'])
  gulp.watch(stylesDir + '/' + "*.css", ['copyStyles']);
});

gulp.task('server', function() {
  return nodemon({ script: 'server/app.js', ignore: ['dist/**/*'] }).on('start', function() {
    console.log('Gulp Nodemon Started.');
  });
});

gulp.task('default', ['server', 'watch']);
gulp.task('build', ['copyStyles', 'buildScript']);