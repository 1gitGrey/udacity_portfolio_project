// variables of path
var src = 'app',
	build = 'build',
	development = 'build/dev',
    production = 'build/production',
    srcAssets = 'app/_assets',
    developmentAssets = 'dev',
    productionAssets = 'build/production/assets';

//------------------------------------------


module.exports = {
	browsersync: {
		development: {
			server: {
				baseDir: [development, build, src]
			},
			port: 9999,
			files: [
			developmentAssets + '/css/*.css',
			developmentAssets + '/js/*.js',
			developmentAssets + '/unoptimized_photography/**',
			developmentAssets + '/fonts/*'
			]
		},
		production: {
			server: {
				baseDir: [production]
			},
			port: 9998
		}
	},

	sass: {
		src:  'dev/sass/**/*.scss',
		dest: 'dist/css',
		options: {
			noCache: true,
			compass: true,
			bundleExec: false,
			sourcemap: true,
		}
	},
	autoprefixer: {
		browsers: [
		'last 2 versions',
		'safari 5',
		'ie 8',
		'ie 9',
		'opera 12.1',
		'ios 10',
		'android 4' ],
		cascade: true
	},

	watch: {
		sass: 'dev/sass/*.scss'
	}
/*
	browserify: {
		//enable source maps
		debug: true,
		bundleConfigs: [{
			entries: './' + srcAssets + '/javascripts/application.js',}]
	}
	} */
};