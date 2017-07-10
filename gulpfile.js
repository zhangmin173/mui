var gulp = require('gulp'), // gulp打包工具
    less = require('gulp-less'), // less编译插件
    plumber = require('gulp-plumber'), // 报错并继续执行
    cssmin = require('gulp-clean-css'), // css压缩插件
    autoprefix = require('gulp-autoprefixer'), // css补全前缀
    uglify = require('gulp-uglify'), // js压缩插件
    rename = require('gulp-rename'), // 重命名
    concat = require("gulp-concat"); // 文件合并

// 合并所有js到all.js
gulp.task('concat', function () {
    gulp.src('js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/js'));
});

// 编译less并压缩输出css
gulp.task('less', function() {
    return gulp.src('less/*.less')
        .pipe(less())
        .pipe(plumber())
        .pipe(autoprefix())
        .pipe(cssmin())
        .pipe(gulp.dest('css/'));
});

// 压缩ljs
gulp.task('js', function() {
    return gulp.src('js/dev/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('js/wx/'));
});

// 编译lib下的所有less并压缩
gulp.task('less-lib', function() {
    return gulp.src('js/lib/**/*.less')
        .pipe(less())
        .pipe(plumber())
        .pipe(autoprefix())
        .pipe(cssmin())
        .pipe(gulp.dest('js/lib/'));
});

// 压缩lib下的所有js
gulp.task('js-lib', function() {
    return gulp.src(['js/lib/**/*.js',,'!js/lib/**/*.min.js'])
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('js/lib/'));
});

// 开启监控，当这些文件变化时自动执行任务
gulp.task('watch', function() {
    gulp.watch('less/*.less', ['less']);
    gulp.watch('js/lib/**/*.less', ['less-lib']);
});

// gulp默认执行的任务，第二个数组的任务在你当前任务运行之前完成
gulp.task('dev',['less','less-lib'], function() {

});

// gulp默认执行的任务，第二个数组的任务在你当前任务运行之前完成
gulp.task('default',['less','js','less-lib','js-lib'], function() {

});