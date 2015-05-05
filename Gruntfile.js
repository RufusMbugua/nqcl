/*jslint node: true */
"use strict";


module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		bower: {
			install: {
				options: {
					install: true,
					copy: false,
					targetDir: './libs',
					cleanTargetDir: true
				}
			}
		},

		uglify: {
			dist: {
				files: {
					'dist/app.js': ['dist/app.js']
				},
				options: {
					mangle: false
				}
			}
		},

		html2js: {
			dist: {
				src: ['app/partials/**/*.html'],
				dest: 'tmp/partials.js'
			}
		},

		clean: {
			temp: {
				src: ['tmp']
			}
		},

		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['app/**/*.js', 'tmp/*.js'],
				dest: 'dist/app.js'
			}
		},

		jshint: {
			all: ['Gruntfile.js', 'app/*.js', 'app/**/*.js']
		},

		connect: {
			server: {
				options: {
					hostname: 'localhost',
					port: 8080
				}
			}
		},

		watch: {
			dev: {
				files: ['Gruntfile.js', 'app/**/*.js', '*.html', 'app/styles/*.scss'],
				tasks: ['html2js:dist', 'sass', 'concat:dist', 'clean:temp'],
				options: {
					atBegin: true,
					livereload: true
				}
			},
			min: {
				files: ['Gruntfile.js', 'app/*.js', '*.html'],
				tasks: ['jshint', 'karma:unit', 'html2js:dist', 'concat:dist',
					'clean:temp', 'uglify:dist'
				],
				options: {
					atBegin: true
				}
			}
		},

		compress: {
			dist: {
				options: {
					archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
				},
				files: [{
					src: ['index.html'],
					dest: '/'
				}, {
					src: ['dist/**'],
					dest: 'dist/'
				}, {
					src: ['assets/**'],
					dest: 'assets/'
				}, {
					src: ['libs/**'],
					dest: 'libs/'
				}]
			}
		},
		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: 'app/styles',
					src: ['styles.scss'],
					dest: 'dist/',
					ext: '.css'
				}]
			}
		},
		reload: {
			proxy: {
				host: 'localhost',
			}
		},
		karma: {
			options: {
				configFile: 'config/karma.conf.js'
			},
			unit: {
				singleRun: true
			},

			continuous: {
				singleRun: false,
				autoWatch: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-reload');

	grunt.registerTask('dev', ['bower', 'connect:server', 'watch:dev']);
	grunt.registerTask('test', ['bower', 'jshint', 'karma:continuous']);
	grunt.registerTask('minified', ['bower', 'connect:server', 'watch:min']);
	grunt.registerTask('package', ['bower', 'jshint', 'karma:unit',
		'html2js:dist', 'concat:dist', 'uglify:dist',
		'clean:temp', 'compress:dist'
	]);
};
