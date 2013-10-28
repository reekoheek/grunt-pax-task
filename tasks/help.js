
module.exports = function(grunt) {
    "use strict";

    grunt.registerTask('pax-help', 'Help page', function() {});
    grunt.registerTask('help', 'Help page', function(sub) {
        if (sub == 'config') {
            grunt.log.subhead('Configuration');
            grunt.log.write(JSON.stringify(grunt.config(), null, 2));
        } else {
            for(var i in grunt.task._tasks) {
                if (i.indexOf('pax-') === 0) {
                    if (sub == 'raw') {
                        grunt.log.writeln(i);
                    } else {
                        grunt.log.write(i.substr('pax-'.length));
                    }
                }
            }
        }
    });
};