var config = require('./config.js');
var mozjpeg = require('imagemin-mozjpeg');
var concatTask = 'concat:' + config.concatOnly;

// files to watch and compile/merge based on the CSS usage.
if(config.preProcessor) {
  var cssTypeTask = config.preProcessor;
} else {
  var cssTypeTask = concatTask;
}

module.exports = function(grunt) {

    // This is where the magic happens
    // -------------------------------
    "use strict";
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserSync: {
            dev: {
                bsFiles: {
                    src: ['src/build/**', 'src/*.html']
                },
                options: {
                    watchTask: true,
                    server: './src'
                }
            }
        },

        watch: {
            css: {
                files: config.styling,
                tasks: [
                    cssTypeTask
                ],
                options: {
                    spawn: false
                }
            },
            all: {
                files: ['src/**'],
                tasks: [],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        },
        express: {
            all: {
                options: {
                    port: config.port,
                    hostname: config.host,
                    bases: ['./src'],
                    livereload: true,
                    open: 'http://localhost:' + config.port + '/html'
                }
            }
        },
        copy: {
            main: {
                files: [// includes files within path and its sub-directories
                    {
                        expand: true,
                        cwd: 'src/',
                        src: config.distFiles,
                        dest: 'dist/'
                    }
                ]
            }
        },

        sass: {
            dist: {
                options: {
                    style: config.cssStyle
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src/scss',
                        src: [
                            '*.sass', '*.scss'
                        ],
                        dest: 'src/css',
                        ext: '.css'
                    }
                ]
            }
        },

        less: {
            development: {
                options: {
                    paths: ['src/less']
                },
                files: {
                    'src/build/css/main.css' : config.sourceStyle
                }
            }
        },

        imagemin: { // Task
            static: { // Target
                options: { // Target options
                    optimizationLevel: 3,
                    svgoPlugins: [
                        {
                            removeViewBox: false
                        }
                    ],
                    use: [mozjpeg()]
                },
                files: { // Dictionary of files
                    'dist/img/**.png': 'src/img/**.png', // 'destination': 'source'
                    'dist/img/**.jpg': 'src/img/**.jpg',
                    'dist/img/**.gif': 'src/img/**.gif'
                }
            },
            dynamic: { // Another target
                files: [
                    {
                        expand: true, // Enable dynamic expansion
                        cwd: 'src/img/', // Src matches are relative to this path
                        src: ['**/*.{png,jpg,jpeg,gif}'], // Actual patterns to match
                        dest: 'dist/' // Destination path prefix
                    }
                ]
            }
        },

        concat: {
            js: {
                src: config.jsConcatSrc,
                dest: config.jsConcatDest
            },
            css: {
                src: config.cssConcatSrc,
                dest: config.cssConcatDest
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-less');

    // =server task
    grunt.loadNpmTasks('grunt-express');

    // =watch task
    grunt.loadNpmTasks('grunt-contrib-watch');

    // =default task
    grunt.registerTask('default', ['browserSync', 'watch']);

    // =server task
    grunt.registerTask('server', ['browserSync', 'watch']);

    // =copy task: this task will copy needed files to "dist" (Distribution directory)
    grunt.registerTask('build-production', ['copy']);

    // =image compress task
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // =Concat task
    grunt.loadNpmTasks('grunt-contrib-concat');

    // =test task: this is to check if grunt is successfuly setup or not
    grunt.registerTask("test", function() {
        console.log("\n\n-----------------------------------\n" + config.cool + "\n-----------------------------------\n\n");
    });

    // browsersync task
    grunt.loadNpmTasks('grunt-browser-sync');

};
