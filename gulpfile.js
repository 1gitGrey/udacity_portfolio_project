var gulp       = require('gulp'),
    watch      = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    header     = require('gulp-header'),
    concat     = require('gulp-concat'),
    mCSS       = require('gulp-minify-css'),
    notify     = require('gulp-notify'),
    uglify     = require('gulp-uglify'),
    order      = require('gulp-order'),
    compass    = require('gulp-compass'),
    mario      = require('gulp-plumber');
// -----------------------------------------------------------------
var paths      =  {
		     js : ['dev/js/vendor/*.js', 'dev/js/proprietary/*.js'],
		   sass : ['dev/sass/*.sass'],
    		    css : ['dev/css/*.css'],
    		    img : 'dev/unoptimized_photography/*',
  		   html : ['*.html']
};
// ------------------------------------------------------------------
// ------------------------------------------------------------------
gulp.task('compass', function(){
	  gulp.src(paths.sass).pipe(mario({
	   errorHandler : function(error) {
                 console.log(error.message);
                    return this.emit("end");
			  }
			 })).pipe(compass({
       	            css : './',
                   sass : 'dev/sass',
	          images: 'images',
                  javascript: 'dev/js',
                  comments: false,
                 style  : 'compressed'
		 })).on("error", function(err) {});
		});

gulp.task('js', function() {
	return gulp.src(paths.js).pipe(concat("all.js")).pipe(uglify()).pipe(gulp.dest("js")).pipe(notify("gulp: js complete :) ."));
});

gulp.task("css", function() {
	return gulp.src(paths.css).pipe(concat("main.css")).pipe(gulp.dest("dev/css")).pipe(livereload()).pipe(notify("gulp: css has completed :) "));
});

gulp.task("html", function() {
//	var reload_script;
  //	reload_script = void 0;
 /*		reload_script = "<script>document.write('<script src=\'http://'
                               + (location.host || 'localhost').split(':')[0] +
					 ':35729/livereload.js?snipver=1\"></' +
						 'script>')</script>";
    return gulp.src('./*.html').pipe(header(reload_script, {})).pipe(gulp.dest("./")); */
});

//-------------------------------------------------------------------------------------------------------------

gulp.task('default', function() {
	return gulp.run("compass", "js", "css");
});

gulp.task('release', function() {
	gulp.src('style.css')
	    .pipe(mCSS())
            .pipe(gulp.dest('./'));
        gulp.src('js/all.js')
            .pipe(uglify())
	    .pipe(gulp.dest('js'));
});

gulp.task('watch', function() {
	var server;
	gulp.watch(paths.sass, ["compass"]);
	gulp.watch(paths.js,   ["js"]);
  gulp.watch(paths.css, ["css"]);
	gulp.watch(paths.js,   ["release"]);
        server = livereload();

	return gulp.watch(['css/*.css', 'js/*.js']).on("change", function(file) {
		return server.changed(file.path);
	});
});
