 module.exports = function(grunt) {
    'use strict';
 
    var pkg = grunt.file.readJSON('package.json'); 
    var gruntConfig = {
        pkg: pkg,
        uglify: {
            options: {
                mangle: true,
                banner: '/* <%= pkg.name %> ' +
                    '- version <%= pkg.version %> - ' +
                    '<%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: '**/*.js',
                    dest: 'build/',
                    ext: '-' + pkg.version + '.min.js'
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