/* jshint node: true, esversion: 6 */
'use strict';

const gulp = require('gulp');
const run = require('run-sequence');
const del = require('del');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const browserify = require('browserify');
const tsify = require('tsify');
const watchify = require('watchify');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const argv = require('yargs')
  .option('p', {
    alias: 'production',
    default: false,
    type: 'boolean'
  })
  .argv;

const srcPaths = {
  images: 'src/images/**/*',
  pages: 'src/**/*.html',
  app: 'src/app/bootstrap.ts',
  scripts: 'src/app/**/*.ts',
  styles: 'src/styles/**/*.scss'
};

gulp.task('clean', () => {
  return del(['dist']);
});

gulp.task('build:images', () => {
  if (argv.p) {
    return gulp.src(srcPaths.images)
      .pipe(imagemin())
      .pipe(gulp.dest('dist/img'));
  } else {
    return gulp.src(srcPaths.images)
      .pipe(gulp.dest('dist/img'));
  }
});

gulp.task('build:pages', () => {
  if (argv.p) {
    return gulp.src(srcPaths.pages)
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('dist'));
  } else {
    return gulp.src(srcPaths.pages)
      .pipe(gulp.dest('dist'));
  }
});

gulp.task('build:scripts', () => {
  // Note: tsify automatically uses tsconfig.json
  // Note: Browserify doesn't support ES6

  if (argv.p) {
    return browserify()
      .add(srcPaths.app)
      .plugin('tsify')
      .bundle()
      .on('error', (error) => console.error(error.toString()))
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
  } else {
    // TODO: Add source mapping
    return browserify({
        plugin: [tsify]
      })
      .add(srcPaths.app)
      .bundle()
      .on('error', (error) => console.error(error.toString()))
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(gulp.dest('dist/js'));
  }
});

gulp.task('watch:scripts', () => {
  // TODO: Add source mapping
  return browserify({
      cache: {},
      packageCache: {},
      plugin: [watchify, tsify]
    })
    .add(srcPaths.app)
    .bundle()
    .on('error', (error) => console.error(error.toString()))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('build:styles', () => {
  if (argv.p) {
    return gulp.src(srcPaths.styles)
      .pipe(sass({
        outputStyle: 'compressed',
        includePaths: [
          'bower_components'
        ]
      }).on('error', sass.logError))
      .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
  		.pipe(gulp.dest('dist/css'));
  } else {
    return gulp.src(srcPaths.styles)
      .pipe(sourcemaps.init())
      .pipe(sass({
        includePaths: [
          'bower_components'
        ]
      }).on('error', sass.logError))
      .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
      .pipe(sourcemaps.write('./'))
  		.pipe(gulp.dest('dist/css'));
  }
});

gulp.task('default', ['clean'], (cb) => {
  return run(['build:pages', 'build:styles', 'build:images', 'build:scripts'], cb);
});

gulp.task('watch', ['default'], () => {
  gulp.watch(srcPaths.styles, ['build:styles']);
  gulp.watch(srcPaths.scripts, ['watch:scripts']);
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
