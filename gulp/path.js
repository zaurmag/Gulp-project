module.exports = {
    path: {
        build: { // Готовые файлы
            html: 'dist/',
            style: 'dist/css',
            img: 'dist/images',
            js: 'dist/js',            
            fonts: 'dist/fonts'
        },
        src: { // Файлы исходники
            pug: 'src/pug/*.pug',
            style: 'src/sass/main.sass',
            img: 'src/images/**/*.*',
            pngIcons: 'src/images/icons/png/*.png',
            svgIcons: 'src/images/icons/svg/*.svg',
            js: 'src/js/**/*.js',
            fonts: 'src/fonts/*.*'
        },
        watch: { // Изменение файлов   
            style: 'src/sass/**/*.+(sass|scss)',
            pug: 'src/pug/**/*.pug',
            img: 'src/images/**/*.*',
            js: 'src/js/**/*.js',
            jsConct: 'src/js/**/*.js',
            copyCss: 'dist/css/*.css',
            copyJs: 'dist/js/*.js',
            copyImages: 'dist/images/**/*.*'
        },
        clean: {
            all: './dist'
        },
        cms: {
            cmsPath: 'template_path' // Path to cms template
        }
    }
}