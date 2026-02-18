module.exports = function(grunt) {
    'use strict';

    // Third-party library files pulled from npm packages (2015-era versions)
    var vendorFiles = [
        'node_modules/three/three.js',
        'node_modules/signals/dist/signals.js',
        'node_modules/pixi.js/bin/pixi.js',
        'node_modules/mousetrap/mousetrap.js',
        'node_modules/stats.js/build/stats.min.js',
        'src/vendor/stats-global.js'
    ];

    // Project source file order
    var sourceFiles = [
        'src/vendor/pixi-patches.js',
        'src/vendor/three-box-geometry.js',
        'src/vendor/three-plane-geometry.js',
        'src/vendor/threex-window-resize.js',
        'src/core/namespace.js',
        'src/core/bind-helpers.js',
        'src/core/utils.js',
        'src/core/selectors.js',
        'src/loaders/atlas-loader.js',
        'src/geom/geom.js',
        'src/geom/shape-utils.js',
        'src/geom/mesh-utils.js',
        'src/scene/scene-assets.js',
        'src/models/treenode.js',
        'src/models/states.js',
        'src/models/rect.js',
        'src/models/item.js',
        'src/biped/biped-poses.js',
        'src/biped/biped-face.js',
        'src/biped/biped-item.js',
        'src/biped/biped.js',
        'src/models/image-map.js',
        'src/models/store.js',
        'src/models/game-store.js',
        'src/models/levels.js',
        'src/models/env-model.js',
        'src/models/model-history.js',
        'src/flow/flow-node.js',
        'src/flow/flow-store.js',
        'src/models/tag-model.js',
        'src/physics/game-physics.js',
        'src/rendering/simple-2d-gl.js',
        'src/rendering/light-map.js',
        'src/rendering/shader-light-map.js',
        'src/scene/scene-model.js',
        'src/camera/game-camera.js',
        'src/camera/game-camera-controls.js',
        'src/core/broadcaster.js',
        'src/scene/game-view.js',
        'src/game/game.js',
        'src/main.js'
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Concatenate vendor libraries (from npm) into vendor.js
        concat: {
            options: {
                separator: '\n',
                // Strip comment headers added during source split
                process: function(src, filepath) {
                    var lines = src.split('\n');
                    if (lines[0] && lines[0].indexOf('/*') === 0 && lines[0].indexOf('*/') !== -1) {
                        lines.shift();
                    }
                    while (lines.length > 0 && lines[lines.length - 1] === '') {
                        lines.pop();
                    }
                    return lines.join('\n') + '\n';
                }
            },
            vendor: {
                options: {
                    process: false
                },
                src: vendorFiles,
                dest: 'public/scripts/vendor.js'
            },
            dist: {
                src: sourceFiles,
                dest: 'public/scripts/main.js'
            }
        },

        // Minify main.js into main-minified.js
        uglify: {
            options: {
                mangle: {
                    toplevel: false
                },
                compress: {
                    sequences: true,
                    dead_code: true,
                    conditionals: true,
                    booleans: true,
                    unused: false,
                    if_return: true,
                    join_vars: true,
                    drop_console: false
                },
                output: {
                    max_line_len: Infinity
                }
            },
            dist: {
                files: {
                    'public/scripts/main-minified.js': ['public/scripts/main.js']
                }
            }
        },

        // Watch for changes in src/ and rebuild
        watch: {
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['build'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Build tasks
    grunt.registerTask('build', ['concat', 'uglify']);
    grunt.registerTask('vendor', ['concat:vendor']);
    grunt.registerTask('default', ['build']);
    grunt.registerTask('dev', ['build', 'watch']);
};
