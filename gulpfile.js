'use strict';
 
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const merge = require('merge-stream');


gulp.task('dist.css', function () {
  var sassStream,
      cssStream;
  
  sassStream = gulp.src('src/scss/*.scss')
    .pipe(concat('sass-styles.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
	  	browsers: ['last 2 versions'],
	  	cascade: false
	  }))
	  .pipe(rename('styles.css'));
	
	cssStream = gulp.src(['node_modules/reset-css/reset.css', 'src/css/*.css'])
	  .pipe(concat('css-styles.css'));
	  
	return merge(cssStream, sassStream)
    .pipe(concat('app.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('dist.js', function() {
    return gulp.src(['src/js/doorBase.js', 'src/js/doorOthers.js', 'src/js/app.js'])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rename('app.min.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('dist.img', function() {
    return gulp.src('src/img/*.{png,gif,jpg}')
      .pipe(gulp.dest('dist/img'));
})

gulp.task('dist', ['dist.css', 'dist.js', 'dist.img']);