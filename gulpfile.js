
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

gulp.task('default',['watch'],function(){
    console.log('default');
});

gulp.task('watch',function(){
    console.log('watch something');
});

gulp.task('styles',function(){
    const sass = require('gulp-sass');
    gulp.src('app/css/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'));
});

gulp.task("sass:watch",function(){
    gulp.watch('app/css/scss/*.scss',['sass']);
});

gulp.task('clean',function(){
    return gulp.src([
        'dist',
        'dist/test/**/*',
        '!package.json'
    ]).pipe($.clean());
})


gulp.task('scripts',function(){
    const babel = require('gulp-babel');
    return gulp.src('app/js/es6/*.js')
    .pipe(babel())
    .pipe(gulp.dest('app/js'));
});

gulp.task('html',function(){
    const options = {
        removeComment : false, //清除HTML的注释
        collapseWhitespace : true, //压缩HTML
        collapseBooleanAttributes : false, //省略布尔属性的值 <input checked="true"/> ==> <input>
        removeEmptyAttributes : false, //删除所有空格属性值 <input id=""/> ==> <input>
        removeScriptTypeAttributes : false, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes : false, //删除<style>和<link>的type="text/css"
        minifyJS : false, //压缩页面里的JS
        minifyCSS : false //压缩页面里的CSS
    };

        const uglify = require('gulp-uglify');
        const cssnano = require('gulp-cssnano');
        const htmlmin = require('gulp-htmlmin');

    gulp.src('app/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist'));
    gulp.src('app/css/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('dist'));
    gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});


gulp.task('serve',['styles','scripts'],function(){
    const browserSync = require('browser-sync');
    const reload = browserSync.reload;
    browserSync({
        notify : false,
        port : 9000,
        server : {
            baseDir : ['app'],
            routes : {
                '/bower_components' : 'bower_components'
            }
        }
    });

    gulp.watch([
        'app/*.html',
        'app/css/*.css',
        'app/js/*.js'
    ]).on('change',reload);

    gulp.watch('app/css/scss/*.scss',['styles']);
    gulp.watch('app/js/es6/*.js',['scripts']);
});