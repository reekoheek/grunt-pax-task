var _ = require('lodash');

var defaultBowerOptions = {
    targetDir: './vendor',
    verbose: true
};

module.exports = {
    initialize: function() {
        this.grunt.loadNpmTasks('grunt-bower-task');

        var bowerOptions = this.grunt.config('bower.install.options') || {},
            depBowerOptions = this.grunt.config('dependencies.bower.options');

        bowerOptions = _.defaults(_.extend(bowerOptions, depBowerOptions), defaultBowerOptions);

        this.grunt.config('bower.install.options', bowerOptions);
    },

    pull: function() {
        this.grunt.task.run('bower');
    }
};