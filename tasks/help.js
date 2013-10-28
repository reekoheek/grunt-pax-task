
module.exports = function(grunt) {
    "use strict";

    grunt.registerTask('pax-help', 'Help page', function() {});
    grunt.registerTask('help', 'Help page', function(sub) {
        var i, tasks;

        grunt.log.muted = false;

        if (sub == 'config') {
            grunt.log.subhead('Configuration');
            grunt.log.write(JSON.stringify(grunt.config(), null, 2));
        } else {
            if (sub == 'json') {
                tasks = [];
                for(i in grunt.task._tasks) {
                    if (i.indexOf('pax-') === 0) {
                        tasks.push(i);
                    }
                }
                grunt.log.writeln(JSON.stringify({targets:tasks}, null, 2));
            } else {
                if (sub != 'raw') {
                    grunt.log.subhead('Available target:');
                }
                for(i in grunt.task._tasks) {
                    if (i.indexOf('pax-') === 0) {
                        if (sub == 'raw') {
                            grunt.log.writeln(i.substr('pax-'.length));
                        } else {
                            grunt.log.writeln('- ' + i.substr('pax-'.length));
                        }
                    }
                }
            }
        }

        grunt.log.muted = true;
    });
};