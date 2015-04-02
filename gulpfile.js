var gulp = require('gulp');

var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
//var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var webpack = require('gulp-webpack-build');
var path = require('path');
var jest = require('gulp-jest');
var webserver = require('gulp-webserver');

gulp.task('jshint', function () {
    gulp.src('./src/js/*.js').pipe(jshint()).pipe(jshint.reporter('default'));
});

//gulp.task('imagemin', function() {
//  var imgSrc = './src/images/**/*',
//      imgDst = './build/images';
//
//  gulp.src(imgSrc).pipe(changed(imgDst)).pipe(imagemin()).pipe(gulp.dest(imgDst));
//});

gulp.task('sass', function () {
    gulp.src('./src/sass/*.scss').pipe(sass()).pipe(gulp.dest('./src/css'));
});

// Unit testing using Jest - Jasmine based unit test framework
gulp.task('jest', function () {
    return gulp.src('__tests__').pipe(jest({
        scriptPreprocessor: "./spec/support/preprocessor.js",
        unmockedModulePathPatterns: [
            "node_modules/react"
        ],
        testDirectoryName: "spec",
        testPathIgnorePatterns: [
            "node_modules",
            "spec/support"
        ],
        moduleFileExtensions: [
            "js",
            "json",
            "react"
        ]
    }));
});

// Configuration overrides for webpack
var src = './src',
    dest = './dist',
    webpackOptions = {
        debug: true,
        devtool: '#source-map',
        watchDelay: 200
    },
    webpackConfig = {
        useMemoryFs: true,
        progress: true
    },
    CONFIG_FILENAME = webpack.config.CONFIG_FILENAME;

gulp.task("webpack", [], function () {
    return gulp.src(path.join(src, '**', CONFIG_FILENAME), {base: path.resolve(src)})
        .pipe(webpack.configure(webpackConfig))
        .pipe(webpack.overrides(webpackOptions))
        .pipe(webpack.compile())
        .pipe(webpack.format({
            version: false,
            timings: true
        }))
        .pipe(webpack.failAfter({
            errors: true,
            warnings: true
        }))
        .pipe(gulp.dest(dest));
});

gulp.task('watch', function () {
    gulp.watch(path.join(src, '**/*.*')).on('change', function (event) {
        if (event.type === 'changed') {
            gulp.src(event.path, {base: path.resolve(src)})
                .pipe(webpack.closest(CONFIG_FILENAME))
                .pipe(webpack.configure(webpackConfig))
                .pipe(webpack.overrides(webpackOptions))
                .pipe(webpack.watch(function (err, stats) {
                    gulp.src(this.path, {base: this.base})
                        .pipe(webpack.proxy(err, stats))
                        .pipe(webpack.format({
                            verbose: true,
                            version: false
                        }))
                        .pipe(gulp.dest(dest));
                }));
        }
    });
});

gulp.task('webserver', function () {
    gulp.src(src)
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true
        }));
});

gulp.task('default', ['jshint', 'imagemin', 'sass', 'webpack', 'watch']);
