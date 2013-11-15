/* globals module */

module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'lib/*.js', 'test/*.js'],
            options: {
                jshintrc: true
            }
        },

        qunit: {
            files: ['test/*.html']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('test', ['jshint', 'qunit']);
};
