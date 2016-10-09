'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var vendor = require('gulp-concat-vendor');
var minify = require('gulp-minify');
var connect = require('gulp-connect');

var vendorScripts = require('./vendor.scripts.json')

gulp.task('default', ['build' , 'watch', 'connect']);

gulp.task('build', ['scss', 'vendor', 'app']);

gulp.task('watch', () => {
    gulp.watch('./assets/scss/**/*.scss', ['scss']);
    gulp.watch('./assets/js/app/*.js', ['app']);
});

gulp.task('scss', () => {
    return gulp.src('./assets/scss/root.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('vendor', () => {
    gulp.src(vendorScripts)
        .pipe(vendor('vendor.js'))
        .pipe(gulp.dest('./assets/js/dist'));
});

gulp.task('app', () => {
    return gulp.src('./assets/js/app/**/*.js')
        .pipe(vendor('app.js'))
        .pipe(minify({
            ext: {
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest('./assets/js/dist'))
});

gulp.task('connect', () => {
    connect.server({
        root: './',
        port: 8989
    })
});