require('shelljs/global');

var fs = require('fs'),
    path = require('path'),
    _ = require('lodash'),
    Executor;

global.DEBUG_START_TIME = (new Date()).getTime();

var detectConfiguration = function(config, packageJson) {
    config.pkg = packageJson;
    try {
        fs.readFileSync('bower.json', {encoding: 'utf8'});
        delete config.dependencies.nodep;
        config.dependencies.bower = {};
    } catch(e) {
    }

    if (packageJson.pax && packageJson.pax.config) {
        for(var i in packageJson.pax.config) {
            config[i] = _.extend(config[i] || {}, packageJson.pax.config[i]);
        }
    }
};

var preRun = function(config, grunt) {
    if (config.pkg && config.pkg.pax && config.pkg.pax.prerun) {
        var prerun = require(path.join(process.cwd(), config.pkg.pax.prerun));
        prerun(grunt);
    }
};

module.exports = function(grunt) {
    var packageJson,
        config = {
            dependencies: {
                nodep: {}
            }
        };

    detectConfiguration(config, grunt.file.readJSON('package.json'));

    grunt.initConfig(config);

    preRun(config, grunt);

    var oldFailReport = grunt.fail.report;
    grunt.fail.report = function() {
        global.DEBUG_STOP_TIME = (new Date()).getTime();

        oldFailReport.apply(this, arguments);

        if (process.argv[1] !== 'help:json' && process.argv[1] !== 'help:raw') {
            grunt.log.muted = false;
            grunt.log.writeln('Grunt elapsed: ' + (global.DEBUG_STOP_TIME - global.DEBUG_START_TIME));
        }

    };

    try {
        packageJson = fs.readFileSync('package.json', {encoding: 'utf8'});
        if (packageJson) {
            packageJson = JSON.parse(packageJson);
        }
        if (packageJson.name != 'grunt-pax-task') {
            throw new Error('Not grunt-pax-task');
        }
        grunt.loadTasks('tasks');
        Executor = require('./lib/executor');
    } catch(e) {
        grunt.loadNpmTasks('grunt-pax-task');
        Executor = require('grunt-pax-task/lib/executor');
    }

    grunt.executor = new Executor(grunt);

    grunt.log.muted = true;

};