const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminSvgo = require('imagemin-svgo');
const { extendDefaultPlugins } = require('svgo');
const del = require('del');

const path = {
    build: 'build/',
    src: 'src/**/*',
    clean: 'build/*'
};

const images = () => gulp
    .src(path.src)
    .pipe(
        imagemin([
            imageminJpegtran(),
            imageminPngquant({
                quality: [0.6, 0.8]
            }),
            imageminSvgo({
                plugins: extendDefaultPlugins([{
                    name: 'removeViewBox',
                    active: false
                }])
            })
        ])
    )
    .pipe(gulp.dest(path.build));

const clean = () => del([path.clean]);

exports.clean = clean;
exports.default = gulp.series(clean, images);
