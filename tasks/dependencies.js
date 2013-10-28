module.exports = function(grunt) {
    "use strict";

    grunt.registerTask('pax-dependencies', 'Prepare dependencies for project', function() {});
    grunt.registerMultiTask('dependencies', 'Prepare dependencies for project', function() {
        grunt.log.muted = false;

        var target = this.target,
            command = grunt.executor.get(target);

        grunt.log.subhead('Preparing "' + target + '" dependencies...');
        command.pull(this);

        grunt.log.muted = true;
    });
};