module.exports = function (grunt) {
  "use strict";
  // Configuration
  grunt.initConfig({
    less: {
      main: {
        files: {
          "app/assets/stylesheets/draww.css": "app/grunt_assets/less/draww.less"
        }
      }
    },
    grunticon: {
      icons: {
        options: {
          src: "app/grunt_assets/svg/",
          dest: "app/assets/grunticon",
          svgo: true,
          datasvgcss: "../stylesheets/icons.data.svg.css",
          customselectors: {
            "cc_by_nc": ".cc",
            "draww_logo": ".logo",
            "spinner": ".spinner",
            "spinner_grey": ".spinner-grey",
            "drop_area": "#drop-area .target",
            "no_canvas_warn": ".mz-no-draganddrop #drop-area .target"
          }
        }
      }
    },
    watch: {
      main: {
        files: ["app/grunt_assets/less/draww.less"],
        tasks: ["less:main"]
      }
    }
  });
  // Task Loading
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-grunticon');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('build', ["less:main", "grunticon:icons"]);
};