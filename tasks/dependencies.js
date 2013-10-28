var Executor = require('../lib/executor');

module.exports = function(grunt) {
    "use strict";

    var executor = new Executor(grunt);

    grunt.registerTask('pax-dependencies', 'Prepare dependencies for project', function() {});
    grunt.registerMultiTask('dependencies', 'Prepare dependencies for project', function() {
        var target = this.target,
            command = executor.get(target);

        command.pull(this);
    });
};