 module.exports = function(grunt) {
    'use strict';
 
    var gruntConfig = {
        pkg: grunt.file.readJSON('package.json'),
        
        uglify: {
            options: {
                mangle: true
            },
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: '**/*.js',
                    dest: 'build/',
                    ext: '.min.js'
                }]
            }
        },

        jshint: {
            all: [
                'Gruntfile.js',
                'src/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        jasmine: {
            src: 'src/storage-utils.js',
            options: {
                specs: "spec/**/*.spec.js"
            }
        }
    };
 
    grunt.initConfig(gruntConfig);
 
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('test', ['jshint', 'jasmine']);
    grunt.registerTask('build', ['uglify']);
    grunt.registerTask('default', ['test']);
};