var gulp 				 = require('gulp'),
		sass 				 = require('gulp-sass'),
		browserSync  = require('browser-sync'),
		cleancss		 = require('gulp-clean-css'),
		autoprefixer = require('gulp-autoprefixer'),
		ftp 				 = require('vinyl-ftp');

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
	})
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
		.pipe(browserSync.stream())
});

gulp.task('html', function () {
	return gulp.src('app/**/*.html')
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('scripts', function () {
	return gulp.src('app/js/**/*.js')
		.pipe(browserSync.reload({
			stream: true
		}))
});

var localFiles = 'app/**/*',
		remoteFolder = '/path/to/site';

function getFtpConnection() {
	return ftp.create({
		host: 'host',
		port: 21,
		user: 'user',
		password: 'password',
		parallel: 10
	});
}

gulp.task('ftp-deploy-watch', function () {
	var ftpConnection = getFtpConnection();

	gulp.watch(localFiles).on('change', function (changedFile) {
		console.log('Changes detected! Uploading file:' + changedFile)
		return gulp
			.src(changedFile, {
				base: 'app/',
				buffer: false
			})
			.pipe(ftpConnection.newer(remoteFolder))
			.pipe(ftpConnection.dest(remoteFolder));
	});
});

gulp.task('watch', function () {
	gulp.watch('app/sass/**/*.scss', gulp.parallel('styles'));
	gulp.watch('app/js/**/*.js', gulp.parallel('scripts'));
	gulp.watch('app/*.html', gulp.parallel('html'));
});

gulp.task('default', gulp.parallel('styles', 'ftp-deploy-watch', 'browser-sync', 'watch'));