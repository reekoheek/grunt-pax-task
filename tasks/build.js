module.exports = function(grunt) {
    "use strict";

    grunt.registerTask('pax-build', 'Build project', function() {});
    grunt.registerTask('build', 'Build project', function() {
        grunt.log.muted = false;

        grunt.log.subhead('Building project...');

        grunt.log.error('task is not defined yet!');

        grunt.log.muted = true;

    });
};