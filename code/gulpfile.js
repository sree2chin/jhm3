var gulp = require("gulp");
var nodemon = require("gulp-nodemon");
var del = require('del');
var path = require('path');
var fs = require("fs");
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack-stream');
var sass = require('gulp-sass');
var concat = require("gulp-concat");
var fs = require("fs");
var sassFiles = JSON.parse(fs.readFileSync("./src/css/requiredSass.json")).files;
var runSequence = require('run-sequence');
var stripComments = require('gulp-strip-comments');
var uglify = require('gulp-uglify');
var gulpUtil = require('gulp-util');
var pump = require('pump');

/* for opening chrome browser on default build */
var shell = require('gulp-shell');

/* to replace url with cdn url */
var gulpreplace = require('gulp-replace');
/** to upload file to s3 */
var loadawsgulp = require('./gulpawslib.js');

// Open one file with default application
gulp.task('openbrowser', shell.task("gksu -u saibabu google-chrome http://localhost:3024/"));

//,'openbrowser'
gulp.task("default", function () {
    process.env.NODE_ENV="dev";
    process.env.PORT="3024";
  runSequence("clean:dist", ["scss", "image", "css"], ["build", "font", "font-awesome"],'updatecdnurl','uploadtos3','start_server');
});

gulp.task("prod", function () {
    process.env.NODE_ENV="production";
    process.env.PORT="3022";
  runSequence("clean:dist", ["scss", "image", "css"], ["build", "font", "font-awesome"],'updatecdnurl','uploadtos3', ["compress"]);
});

gulp.task("watch", function () {
  return gulp.watch([
    "src/**/*.*", "src/**/**/*.*"],
   runSequence(["scss"], ["build"])
  );
});

gulp.task("watchscss", function () {
    return gulp.watch([
        "src/**/*.scss"],
       runSequence(["scss"], ["build"])
    );
});

gulp.task('compress', function (cb) {
  pump([
        gulp.src('dist/*.js'),
        uglify(),
        gulp.dest('dist')
    ],
    cb
  );
});

gulp.task("build", ["webpack"]);

gulp.task("webpack", function () {
    return webpack(require('./webpack.config.babel.js'))
		.on('error', function handleError() {
			this.emit('end');
		})
        .pipe(sourcemaps.write('dist/'))
        .pipe(gulp.dest('dist/'));
});

gulp.task("start_server", [], function () {
  nodemon({ script: "./bin/www" });
});

gulp.task('scss', function () {
    return gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('app.css'))
        .pipe(gulp.dest("dist/"))
});

gulp.task('css', function () {
    return gulp.src([
            "src/css/*.css"
        ])
        .pipe(gulp.dest("dist/css/"))
});

gulp.task('css_admin', function () {
    return gulp.src([
            "src/static_assets/css/*.css",
            "!src/static_assets/css/*.scss"
        ])
        .pipe(gulp.dest("dist/client/css/"))
});

gulp.task('image', function () {
    return gulp.src("src/images/**")
        .pipe(gulp.dest("dist/images/"))
});

gulp.task('angularJs', function () {
    return gulp.src("angular-repo/**")
        .pipe(gulp.dest("dist/client/js/"))
});

gulp.task('angularCSS', function () {
    return gulp.src("angular-repo/**")
        .pipe(gulp.dest("dist/client/css/"))
});

gulp.task('font', function () {
    return gulp.src("fonts/Nunito/**")
        .pipe(gulp.dest("dist/fonts/"))
});

gulp.task('font-awesome', function () {
    return gulp.src("font-awesome/fonts/**")
        .pipe(gulp.dest("dist/fonts/"))
});

gulp.task('bundle-sw', () => {
    return wbBuild.injectManifest({
      swSrc: 'public/clevertap_sw1.js',
      swDest: 'public/clevertap_sw.js',
      globDirectory: './',
      staticFileGlobs: [
        'dist/bundle.*.css',
        'dist/app.*.js',
        'dist/1.AboutPage.*.js',
        'dist/2.MemberPages.*.js',
        'dist/app.*.js',
        'dist/vendor*.js'
      ]
    })
    .catch((err) => {
      console.log('[ERROR] This happened: ' + err);
    });
});

gulp.task('clean:dist', function () {
    del.sync('public/clevertap_sw.js');
    return del.sync('dist');
});

gulp.task('updatecdnurl',function(){
    var s3path = "http://d66xi69gei13h.cloudfront.net/dist/";
    gulp.src(['dist/index.ejs'])
    .pipe(gulpreplace('/dist/', s3path))
    .pipe(gulp.dest("dist/"));

    gulp.src(['dist/*.css'])
    .pipe(gulpreplace('/dist/', s3path))
    .pipe(gulp.dest("dist/"));
});
