const http = require('http');
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
// const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const uglify = require('gulp-uglify');
// const babel = require('gulp-babel');
const watch = require('gulp-watch');
const run = require('gulp-run-command').default;
const concat = require('gulp-concat');
const refresh = require('gulp-livereload');
const lr = require('tiny-lr');
const lrserver = lr();
const minifyCSS = require('gulp-minify-css');
const embedlr = require('gulp-embedlr');
const ecstatic = require('ecstatic');
const imagemin = require('gulp-imagemin');
const browserify = require('gulp-browserify');
const nunjucksRender = require('gulp-nunjucks-render');
const data = require('gulp-data');
// const buffer = require("vinyl-buffer");

const livereloadport = 35729, serverport = 9999;


// use npm tasks
async function npmBuild(cb) {
  run('npm run build')();
  cb();
};
exports.build = npmBuild;

async function copyFiles(cb) {
  run('npm run build:copy')();
  cb();
};
exports.copy_files = copyFiles;

async function npmClean(cb) {
  run('npm run clean')();
  cb();
};
exports.clean = npmClean;

async function npmFormat(cb) {
  run('npm run format')();
  cb();
}
exports.format = npmFormat;

// generate css from scss
function generateCSS(cb) {
  gulp.src('./src/scss/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'));
  cb();
}
exports.css = generateCSS;

// helper function for browserSync
function bsInit() {
  browserSync.init({
    server: "dist",
    port: 9999, // this can be any port, it will show our app
    reloadDelay: 1000 // Important, otherwise syncing will not work
  });
}

function sync() {
  bsInit();
  gulp.watch(['./dist/**/*.js', './dist/**/*.html', './dist/**/*.css']).on("change", browserSync.reload);
}
gulp.task('sync', sync);


gulp.task('default', gulp.series('sync'));


gulp.task('html', () => 
    gulp.src('./src/*.html')
        .pipe(gulp.dest('dist'))
);

gulp.task('sass', () =>
    gulp.src('./src/sass/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
);


// gulp.task('babel', () =>
//     gulp.src('./src/js/*.es6')
//         .pipe(babel({
//             presets: ['@babel/env']
//         }))
//         .pipe(gulp.dest('./src/js'))
// );

gulp.task('uglifyJS', () =>
    gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
);

// gulp.task('imagemin', () => 
//     gulp.src('./src/assets/images/*')
//         .pipe(imagemin())
//         .pipe(gulp.dest('./dist/assets/images'))
// );

gulp.task('stream', () =>
        gulp.watch('./src', () => 
            gulp.series('html', 
                        'sass', 
                        // 'babel', 
                        'uglifyJS', 
                        // 'imagemin'
                        )
        )
);

function renderTemplates() {
  // Gets .html and .nunjucks files in pages
  return gulp.src('src/**/*.+(html|nunjucks)')
  // Renders template with nunjucks
  .pipe(data(() => { require('./src/data.json') }))
  .pipe(nunjucksRender({
      path: ['src/templates']
    }))
  // output files in app folder
  .pipe(gulp.dest('dest'))
}
gulp.task('nunjucks', renderTemplates);
exports.nunjucks = renderTemplates;

function processScripts() {
    return gulp.src(['src/**/*.js'])
        .pipe(browserify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js/'))
        .pipe(refresh(lrserver));
}
gulp.task('scripts', processScripts);
exports.scripts = processScripts;

gulp.task('styles', function() {
    return gulp.src(['src/scss/*.scss'])
        .pipe(sass())
        .on('error', console.log)
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/build'))
        .pipe(browserSync.stream())
});

gulp.task('serve', function() {
  //Set up your static fileserver, which serves files in the build dir
  http.createServer(ecstatic({ root: __dirname + '/dist' })).listen(serverport);

  //Set up your livereload server
  lrserver.listen(livereloadport);
});


function renderHTML() {
    return gulp.src("src/*.html")
        .pipe(embedlr())
        .pipe(gulp.dest('dist/'))
        // .pipe(refresh(lrserver));
}
gulp.task('html', renderHTML);

gulp.task('assets', function() {
    return gulp.src("dist/assets/**")
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('dist/assets/'))
        .pipe(refresh(lrserver));
});

//compile scss into css
function style() {
  return gulp.src('src/scss/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream({match: '**/*.css'}));
}

function watchFiles() {
  bsInit()
  gulp.watch('src/scss/**/*.scss', style).on('change', browserSync.reload);
  gulp.watch('src/*.html', renderHTML).on('change', browserSync.reload);
  gulp.watch('dist/css/*.css').on('change', browserSync.reload);
  gulp.watch('dist/**.html').on('change', browserSync.reload);
  gulp.watch('src/**/*.js', processScripts).on('change', browserSync.reload);
}
exports.style = style;
exports.watch = watchFiles;

gulp.task('default', gulp.series(['scripts', 'styles', 'html', 'assets', watchFiles]));