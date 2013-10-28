module.exports = function(grunt) {
    "use strict";

    var DEPTH_LEVELS = ['all', 'dependencies', 'build', 'release'];

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.renameTask('clean', 'contrib-clean');

    var i,
        toRun = false,
        config = grunt.config('clean'),
        manifest = {
            release: {
                src: []
            },
            build: {
                src: []
            },
            dependencies: {
                src: ['bower_components']
            }
        };

    if (Object.prototype.toString.call(config) == '[object Array]') {
        for(i in config) {
            manifest.build.src = config[i];
        }
    } else if (config instanceof Object) {
        for(i in config) {
            if (Object.prototype.toString.call(config) !== '[object Array]') {
                manifest[i].src = config[i];
            } else {
                manifest[i].src = config[i].src;
            }
        }
    }

    grunt.config('contrib-clean', manifest);
    grunt.config('clean', manifest);

    grunt.registerTask('pax-clean', 'Clean project', function() {});
    grunt.registerTask('clean', 'Clean project', function(depth) {
        depth = depth || 'all';
        grunt.log.subhead('Cleaning project for ' + depth + ' resources...');

        var toRun = false, i;
        for (i in DEPTH_LEVELS) {
            if (DEPTH_LEVELS[i] == depth) {
                toRun = true;
            }

            if (toRun && DEPTH_LEVELS[i] != 'all') {
                grunt.task.run('contrib-clean:' + DEPTH_LEVELS[i]);
            }
        }
    });
};