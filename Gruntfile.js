module.exports = function(grunt) {
    grunt.initConfig({
        mocha: {
            test: {
                src: ['test/index.html']
            }
        }
    });

    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('test', ['mocha']);
};