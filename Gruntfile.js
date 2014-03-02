/* globals module */

module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'src/*.js', 'tests/*.js'],
            options: {
                jshintrc: true
            }
        },

        qunit: {
            files: ['tests/*.html']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('test', ['jshint', 'qunit']);
};
