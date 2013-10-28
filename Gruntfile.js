require('shelljs/global');

var fs = require('fs');

var detectDependencies = function(config) {
    try {
        packageJson = fs.readFileSync('bower.json', {encoding: 'utf8'});
        delete config.dependencies.nodep;
        config.dependencies.bower = {};
    } catch(e) {
    }
};

module.exports = function(grunt) {
    var packageJson,
        config = {
            pkg: grunt.file.readJSON('package.json'),
            clean: {
                // dependencies: [],
                // build: [],
                // release: []
            },
            dependencies: {
                nodep: {}
            }
        };

    detectDependencies(config);

    grunt.initConfig(config);

    try {
        packageJson = fs.readFileSync('package.json', {encoding: 'utf8'});
        if (packageJson) {
            packageJson = JSON.parse(packageJson);
        }
        if (packageJson.name != 'grunt-pax-task') {
            throw new Error('Not grunt-pax-task');
        }
        grunt.loadTasks('tasks');
    } catch(e) {
        grunt.loadNpmTasks('grunt-pax-task');
    }

    grunt.log.muted = true;

};