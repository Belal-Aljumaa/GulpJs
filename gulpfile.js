const gulp = require('gulp');  // to import gulp from gulp modules
const concat = require('gulp-concat');  // to concat files
const autoprefixer = require('gulp-autoprefixer');  // to add css prefixes
const sass = require('gulp-sass')(require('sass'));  // to manipulate sass file
const pug = require('gulp-pug');  // for html pug
const livereload = require('gulp-livereload');  // for livereload
const sourcemaps = require('gulp-sourcemaps');  // to create a map
const uglify = require('gulp-uglify');  // to minify js scripts
const notify = require('gulp-notify');  // to show notifications
const zip = require('gulp-zip');  // to compress files
const ftp = require('vinyl-ftp'); // to upload the files to the host using ftp

// Html Task
gulp.task('html', function () {
  return gulp
    .src('project/index.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('dist/Html'))
    .pipe(notify('HTML Task Is Done'))
    .pipe(livereload());
});

// Css Task
gulp.task('css', function () {
  return (
    gulp
      .src('project/css/main.scss')
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer('last 2 versions')) 
      /* 
      - We do not need it at this stage but we can use it
      -later if we have other css libraries that we want to add 
      */
      .pipe(concat('main.css'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist/Css'))
      .pipe(notify('CSS Task Is Done'))
      .pipe(livereload())
  );
});

// Js Task
gulp.task('js', function () {
  return gulp
    .src('project/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/Js'))
    .pipe(notify('Javascript Task Is Done'))
    .pipe(livereload());
});

// Compress Files
gulp.task('compress', function () {
  return gulp
    .src('dist/**/*.*')
    .pipe(zip('website.zip'))
    .pipe(gulp.dest('.'))
    .pipe(notify('Files Compressed'));
});

// deploy the app in my case I do not have a host but this is how the code will look like
// gulp.task( 'deploy', function () {
//     const conn = ftp.create( {
//         host:     'mywebsite.tld', // enter your host here
//         user:     'me', // the user
//         password: 'mypass', // the password
//         parallel: 10
//     } );

//     const globs = ['dist/**/*.*'];

//     // using base = '.' will transfer everything to /public_html correctly
//     // turn off buffering in gulp.src for best performance

//     return gulp.src( globs, { base: '.', buffer: false })
//         .pipe( conn.newer( '/public_html' ) ) // only upload newer files
//         .pipe( conn.dest( '/public_html' ) )
//         .pipe(livereload()); // reload the after finishing the upload
// });

// Watch Task
gulp.task('watch', function () {
  require('./server.js');
  livereload.listen();
  gulp.watch(['project/index.pug', 'project/pug/*.pug'], gulp.series('html'));
  gulp.watch('project/css/**/*.scss', gulp.series('css'));
  gulp.watch('project/js/*.js', gulp.series('js'));
  gulp.watch('dist/**/*.*', gulp.series('compress'));
  //gulp.watch('dist/**/*.*', gulp.series('deploy'));
});

// Default Task
gulp.task('default', gulp.series('watch'));
