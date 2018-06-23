var gulp = require('gulp'),
    path = require('./path.js'),
    plugins = require('gulp-load-plugins')();

// Собираем SVG-sprite.
gulp.task('spriteSvg:build', function() {
    gulp.src(path.path.src.svgIcons)
        .pipe(plugins.plumber())
        .pipe(plugins.cheerio({
            run: function($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(plugins.replace('&gt;', '>'))
        .pipe(plugins.svgSprite({
            mode: {
                symbol: {
                    sprite: "../sprite.svg",
                    svg: {
                        xmlDeclaration: false,
                        doctypeDeclaration: false
                    },
                    render: {
                        scss: {
                            dest: '../../sass/mixins/_sprite-svg.scss',
                            template: "src/sass/templates/_sprite_svg_template.scss"
                        }
                    }
                }
            }
        }))
        .pipe(gulp.dest(path.path.build.img));
});