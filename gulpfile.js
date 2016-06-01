/* jshint node: true, esversion: 6 */

const gulp = require('gulp');
const run = require('run-sequence');
const del = require('del');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const browserify = require('browserify');
const tsify = require('tsify');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

const srcPaths = {
  images: 'src/images/**/*',
  pages: 'src/**/*.html',
  app: 'src/app/index.ts',
  scripts: 'src/app/**/*.ts',
  styles: 'src/styles/**/*.scss'
};

gulp.task('clean', () => {
  return del(['dist']);
});

gulp.task('build:images', () => {
  gulp.src(srcPaths.images)
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

gulp.task('build:pages', () => {
  return gulp.src(srcPaths.pages)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('build:scripts', () => {
  return browserify()
    .add(srcPaths.app)
    .plugin('tsify', {
      module: "commonjs",
      target: "es5",
      noImplicitAny: false,
      sourceMap: false
    })
    .bundle()
    .on('error', (error) => console.error(error.toString()))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('build:styles', () => {
	gulp.src(srcPaths.styles)
    .pipe(sass({
      includePaths: [
        'bower_components'
      ]
    }).on('error', sass.logError))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['clean'], (cb) => {
  run(['build:pages', 'build:styles', 'build:images', 'build:scripts'], cb);
});

gulp.task('watch', ['default'], () => {
  gulp.watch(srcPaths.styles, ['build:styles']);
  gulp.watch(srcPaths.scripts, ['build:scripts']);
  gulp.watch(srcPaths.images, ['build:images']);
  gulp.watch(srcPaths.pages, ['build:pages']);
});

gulp.task('serve', ['watch'], () => {
  browserSync.init({
    server: {
      baseDir: 'dist',
      routes: {
        "/bower_components": "bower_components",
        "/node_modules": "node_modules"
      }
    }
  });

  gulp.watch('dist/**/*').on('change', browserSync.reload);
});
