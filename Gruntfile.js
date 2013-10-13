module.exports = function (grunt) {
    "use strict";
    // Configuration
    grunt.initConfig({
        "less": {
            "main": {
                files: {
                    "app/assets/stylesheets/draww.css": "app/assets/less/draww.less"
                },
                options: {
                    //yuicompress: true
                }
            }
        },
        "watch": {
            "main": {
                "files": ["app/assets/less/draww.less"],
                "tasks": ["less:main"]
            }
        }
    });
    // Task Loading
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('build', ["less:main"]);
};