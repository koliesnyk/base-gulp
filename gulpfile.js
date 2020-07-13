var gulp				 = require('gulp'),
		sass				 = require('gulp-sass'),
		browserSync  = require('browser-sync'),
		cleancss		 = require('gulp-clean-css'),
		autoprefixer = require('gulp-autoprefixer');

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
	});
});

gulp.task('styles', function () {
	return gulp.src('app/sass/**/*.scss')
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(autoprefixer({
			grid: true,
			overrideBrowserslist: ['last 10 versions']
		}))
		.pipe(cleancss({
			level: {
				1: {
					specialComments: 0
				}
			}
		}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream());
});

gulp.task('html', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('scripts', function () {
	return gulp.src('app/js/**/*.js')
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('watch', function () {
	gulp.watch('app/sass/**/*.scss', gulp.parallel('styles'));
	gulp.watch('app/js/**/*.js', gulp.parallel('scripts'));
	gulp.watch('app/*.html', gulp.parallel('html'));
});

gulp.task('default', gulp.parallel('styles', 'browser-sync', 'watch'));
