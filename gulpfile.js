const gulp = require('gulp');
const browserSync = require('browser-sync').create();
// const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const uglify = require('gulp-uglify');
// const babel = require('gulp-babel');
const watch = require('gulp-watch');
const run = require('gulp-run-command').default;

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

gulp.task('sync', function() {
  bsInit();
  gulp.watch(['./dist/**/*.js', './dist/**/*.html', './dist/**/*.css']).on("change", browserSync.reload);
});


function watchFiles(cb) {
  gulp.watch('src/scss/*.scss', generateCSS);
  gulp.watch('src/html/*.html', npmFormat);
}
exports.watch = watchFiles;

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