module.exports = function(grunt) {
    "use strict";

    var config = grunt.config('build') || {};

    grunt.registerTask('pax-build', 'Build project', function() {});
    // grunt.registerTask('pax-build', 'Build project', (config.flow) ? config.flow : function() {});
    grunt.registerTask('build', 'Build project', function() {
        grunt.log.muted = false;

        grunt.log.subhead('Building project...');

        if (config.flow) {
            for(var i in config.flow) {
                grunt.task.run(config.flow[i]);
            }
        }

        // grunt.task.run('pax-build');
        // grunt.log.error('task is not defined yet!');

        // grunt.log.muted = true;

    });
};