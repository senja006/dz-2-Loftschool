module.exports = function(grunt) {

    // 1. Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        svg2string: {
            symbols: {
                options: {
                    symbols: 'symbols'
                },
                files: {
                    'js/local/src/symbols.js': 'images/design/sprite-svg/*.svg'
                }
            }
        },

        concat: {
            js: {
                src: [
                    // 'js/vendor/*.js', // Все JS в папке vendor
                    'js/vendor/src/jquery-1.11.0.min.js',
                    'js/vendor/src/jquery.h5validate.js',
                    'js/vendor/src/jquery.inputmask.js',
                ],
                dest: 'js/vendor/dest/vendor.js',
            },
            cssVendor: {
                src: [
                    // 'css/vendor/src/.css', // Все css в папке vendor
                ],
                dest: 'css/vendor/dest/vendor.css',
            },
            cssLocal: {
                src: [
                    // 'css/vendor/.css', // Все css в папке vendor
                    'css/local/src/*css',
                ],
                dest: 'css/local/dest/local.css',
            },
        },

        cssmin: {
            cssVendor: {
                files: [{
                    expand: true,
                    cwd: 'css/vendor/dest',
                    src: 'vendor.css',
                    dest: 'css/vendor/dest/',
                    ext: '.min.css'
                }]
            },
            cssLocal: {
                files: [{
                    expand: true,
                    cwd: 'css/local/dest',
                    src: 'local.css',
                    dest: 'css/local/dest/',
                    ext: '.min.css'
                }]
            }
        },

        uglify: {
            js: {
                src: 'js/vendor/dest/vendor.js',
                dest: 'js/vendor/dest/vendor.min.js'
            }
        }

    });

    // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
    grunt.loadNpmTasks('grunt-svg2string');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', ['concat', 'cssmin', 'uglify']);

};