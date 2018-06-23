var gulp = require('gulp'),
    path = require('./path.js'),
    plugins = require('gulp-load-plugins')();

// Copy fonts to dist folder
gulp.task('fonts:build', function() {
    gulp.src(path.path.src.fonts)
        .pipe(plugins.changed(path.path.build.fonts))
        .pipe(gulp.dest(path.path.build.fonts))
});

// Copy fonts to cms folder
gulp.task('fontsCopyCms:build', function() {
    gulp.src(path.path.src.fonts)
        .pipe(plugins.changed(path.path.cms.cmsPath + 'fonts'))
        .pipe(gulp.dest(path.path.cms.cmsPath + 'fonts'))
});