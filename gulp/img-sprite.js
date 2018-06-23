var gulp = require('gulp'),
    path = require('./path.js'),
    plugins = require('gulp-load-plugins')();

// Собираем спрайты изображений
gulp.task('spriteImg:build', function() {
    var spriteData =
        gulp.src(path.path.src.pngIcons) // путь, откуда берем картинки для спрайта
            .pipe(plugins.changed(path.path.build.img))
            .pipe(plugins.spritesmith({
            imgName: 'sprite.png',
            imgPath: '../images/sprite.png',
            cssName: '_sprite-img.scss',
            cssFormat: 'scss',
            algorithm: 'binary-tree',
            padding: 5
        }));

    spriteData.img.pipe(gulp.dest(path.path.build.img)); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('src/sass/mixins/')); // путь, куда сохраняем стили
});