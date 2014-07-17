/*
 *  Gruntfile.js
 *  This nasty looking Javascript file actually helps Grunt
 *  automate the building of Business Casual. I know, I'm
 *  surprised it works, too.
 *
 *  © 2014 Jonathan Ballands
 */

module.exports = function(grunt) {
    
    grunt.initConfig({
        
        pkg: grunt.file.readJSON("package.json"),
        
        uglify: {
            dist: {
                files: {
                    "js/business-casual.min.js": ["business-casual.js"]
                }
            }
        },
                     
        less: {
            options: {
                compress: true,
                yuicompress: true,
                optimization: 2
            },
            files: {
                "css/business-casual.css": ["less/basics.less", 
                                            "less/business-casual.less", 
                                            "less/buttons.less", 
                                            "less/customize.less", 
                                            "less/flexors.less",
                                            "less/heroes.less",
                                            "less/images.less",
                                            "less/navigation-bar.less",
                                            "less/scaffolding.less",
                                            "less/tables.less",
                                            "less/wells.less"]
            }
        }
        
    });
  
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    
    grunt.registerTask("default", ["uglify", "less"]);
    
};