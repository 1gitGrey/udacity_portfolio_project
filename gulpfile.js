var gulp       = require('gulp'),
    watch      = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    header     = require('gulp-header'),
    concat     = require('gulp-concat'),
    htmlV      = require('gulp-html-validator'),
    md         = require('gulp-html2md'),
    imagemin   = require('gulp-imagemin'),
    jsV        = require('gulp-jsvalidate'),
    mCSS       = require('gulp-minify-css'),
    notify     = require('gulp-notify'),
    uglify     = require('gulp-uglify'),
    order      = require('gulp-order'),
    compass    = require('gulp-compass'),
    clean      = require('gulp-cleanhtml'),
    mario      = require('gulp-plumber');


// -----------------------------------------------------------------
var paths      =  {
		     js : ['dev/js/*.js'],
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
       	            css : 'dev/css',
                   sass : 'dev/sass',
	          images: 'dev/unoptimized_photography',
                  javascript: 'dev/js',
                  comments: false,
                 style  : 'compressed'
		 })).on("error", function(err) {});
		});

gulp.task('js', function() {
	return gulp.src(paths.js).pipe(order([
                                       "core.js",
                                       "classie.js",
                                       "cbpAnimatedHeader.js",
                                       "background.js",
                                       "owl.carousel.js",
                                       "jquery.easing.js",
                                       "jquery.magnific-popup.js",
                                       "wow.js",
                                       "contact_me.js",
                                       "jqBootstrapValidation.js",
                                       "mediaquery.js",
                                       "build.js"
                                       ]))
    .pipe(concat("the_feel.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
    .pipe(notify("gulp 'js' just finished: \n  a. created dist/js/all.js \n b. put js files in corrct order \n c. uglified (aka minified) the file \n tip: make sure wiredep is connected! \n\n\n gulp: js complete :) ."));
});

gulp.task("css", function() {
	return gulp.src(paths.css).pipe(concat("the_look.css")).pipe(gulp.dest("dist/css")).pipe(livereload()).pipe(notify("gulp: css has completed :) "));
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
