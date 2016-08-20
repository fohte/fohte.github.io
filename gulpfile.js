const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const browserSync = require('browser-sync')

const distDir = 'dist'
const srcDir = 'src'

const dirPath = {
  sass: srcDir + '/sass',
  babel: srcDir + '/babel',
  pug: srcDir + '/pug',
  css: distDir + '/css',
  js: distDir + '/js',
  html: distDir,
}

const filePath = {
  sass: dirPath.sass + '/**/*.sass',
  babel: dirPath.babel + '/**/*.es',
  pug: dirPath.pug + '/**/*.pug',
  css: dirPath.css + '/**/*.css',
  js: dirPath.js + '/**/*.js',
  html: dirPath.html + '/**/*.html',
}

const plumberConfig = {
  errorHandler: $.notify.onError('Error: <%= error.message %>'),
}

gulp.task('sass', () => {
  return gulp.src(filePath.sass)
      .pipe($.plumber(plumberConfig))
      .pipe($.sass())
      .pipe($.cssnext())
      .pipe(gulp.dest(dirPath.css))
})

gulp.task('babel', () => {
  return gulp.src(filePath.babel)
      .pipe($.plumber(plumberConfig))
      .pipe($.eslint({useEslintrc: true}))
      .pipe($.eslint.format())
      .pipe($.eslint.failAfterError())
      .pipe($.babel())
      .pipe(gulp.dest(dirPath.js))
})

gulp.task('pug', () => {
  return gulp.src(filePath.pug)
      .pipe($.plumber(plumberConfig))
      .pipe($.pug({pretty: true}))
      .pipe(gulp.dest(dirPath.html))
})

gulp.task('browser-sync', () => {
  browserSync.init(null, {
    server: distDir,
    open: false,
  })
  gulp.watch([filePath.html, filePath.css, filePath.js], ['browser-sync-reload'])
})

gulp.task('browser-sync-reload', () => {
  browserSync.reload()
})

gulp.task('build', ['sass', 'babel', 'pug'])

gulp.task('watch', () => {
  gulp.watch([filePath.sass], ['sass'])
  gulp.watch([filePath.babel], ['babel'])
  gulp.watch([filePath.pug], ['pug'])
})

gulp.task('default', ['build', 'browser-sync', 'watch'])
