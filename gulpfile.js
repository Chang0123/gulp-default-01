'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var connect = require('gulp-connect');

var vendorScripts = require('./vendor.scripts.json');
var conf = require('./gulp.conf.json');

gulp.task('default', ['build' , 'watch', 'connect']);

gulp.task('build', ['scss', 'vendor', 'app']);

gulp.task('watch', () => {
    gulp.watch(conf.path.watch.scss, ['scss']);
    gulp.watch(conf.path.watch.js, ['app']);
});

gulp.task('scss', () => {
    return gulp.src(conf.path.src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(conf.path.dist.css));
});

gulp.task('vendor', () => {
    gulp.src(vendorScripts)
        .pipe(concat('vendor.js'))
        .pipe(minify({
            ext: {
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest(conf.path.dist.js));
});

gulp.task('app', () => {
    return gulp.src(conf.path.src.js)
        .pipe(concat('app.js'))
        .pipe(minify({
            ext: {
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest(conf.path.dist.js))
});

gulp.task('connect', () => {
    connect.server({
        root: './',
        port: 8989
    })
});