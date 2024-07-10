'use strict';

const {src, dest, watch, series} = require('gulp');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');

exports.default = function () {
    return src('./src/styles/style.less')
        .pipe(less())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('./dist/styles'));
};
exports.watch = function () {
    watch('./src/styles/*.less', series('default'));
};