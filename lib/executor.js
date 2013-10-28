var nodepDelegate = require('./command/nodep.js'),
    bowerDelegate = require('./command/bower.js');

var Executor = function(grunt) {
    this.registries = {};
    this.grunt = grunt;

    this.register('nodep', nodepDelegate);
    this.register('bower', bowerDelegate);
};

Executor.prototype = {

    get: function(name) {
        return this.registries[name];
    },

    register: function(name, delegate) {
        var Command = function(name, grunt) {
            this.name = name;
            this.grunt = grunt;

            if (this.initialize) {
                this.initialize();
            }
        };
        Command.prototype = delegate;

        this.registries[name] = new Command(name, this.grunt);
    }
};

module.exports = Executor;