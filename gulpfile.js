const gulp = require('gulp');
const $ = require('gulp-load-plugins')();


gulp.task('default',['watch'],function(){
    console.log('default');
});

gulp.task('watch',function(){
    console.log('watch something');
});

gulp.task('sass',function(){
    const sass = require('gulp-sass');
    gulp.src('app/css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'));
});

gulp.task('sass:watch',function(){
    gulp.watch('app/css/*.scss',['sass']);
});

gulp.task('clean',function(){
    return gulp.src([
        'dist',
        'dist/test/**/*',
        '!package.json'
    ]).pipe($.clean());
});