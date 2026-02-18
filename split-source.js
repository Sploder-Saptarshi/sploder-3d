#!/usr/bin/env node
/**
 * Script to split main.js into individual source files in src/
 * Run with: node split-source.js
 */

var fs = require('fs');
var path = require('path');

var mainJs = fs.readFileSync(path.join(__dirname, 'public/scripts/main.js'), 'utf8');
var lines = mainJs.split('\n');

// Extract lines (1-indexed, inclusive)
function extract(startLine, endLine) {
    return lines.slice(startLine - 1, endLine).join('\n');
}

var srcDir = path.join(__dirname, 'src');

var files = [
    // 1. Vendor extensions / patches
    { file: 'vendor/pixi-patches.js', start: 1, end: 19, header: '/* PIXI RenderTexture patches */\n' },
    { file: 'vendor/three-box-geometry.js', start: 20, end: 87, header: '/* Custom THREE.BoxGeometry with flip and taper parameters */\n' },
    { file: 'vendor/three-plane-geometry.js', start: 89, end: 117, header: '/* Custom THREE.PlaneBufferGeometry and THREE.PlaneGeometry with flip parameter */\n' },
    { file: 'vendor/threex-window-resize.js', start: 118, end: 131, header: '/* THREEx.WindowResize helper */\n' },

    // 2. SPLODER namespace init + constants + helpers
    { file: 'core/namespace.js', start: 132, end: 161, header: '/* SPLODER namespace initialization and action constants */\n' },
    { file: 'core/bind-helpers.js', start: 162, end: 248, header: '/* SPLODER bind, button, and DOM utility functions */\n' },
    { file: 'core/utils.js', start: 249, end: 342, header: '/* SPLODER utility functions: attribs, easing, math, etc. */\n' },
    { file: 'core/selectors.js', start: 343, end: 347, header: '/* $$ and $$$ DOM selector shortcuts */\n' },

    // 3. Loaders
    { file: 'loaders/atlas-loader.js', start: 348, end: 376, header: '/* SPLODER.AtlasLoader - JSON atlas loader extending THREE.Loader */\n' },

    // 4. Geometry utilities
    { file: 'geom/geom.js', start: 377, end: 502, header: '/* SPLODER.Geom - 2D geometry utility functions */\n' },
    { file: 'geom/shape-utils.js', start: 503, end: 768, header: '/* SPLODER.ShapeUtils - Shape building, grid filling, triangulation */\n' },
    { file: 'geom/mesh-utils.js', start: 769, end: 868, header: '/* SPLODER.MeshUtils - Mesh geometry and UV utilities */\n' },

    // 5. Scene assets
    { file: 'scene/scene-assets.js', start: 869, end: 1022, header: '/* SPLODER.SceneAssets - Asset loading, materials, textures */\n' },

    // 6. Core model classes
    { file: 'models/treenode.js', start: 1023, end: 1066, header: '/* SPLODER.Treenode - Tree node base class */\n' },
    { file: 'models/states.js', start: 1067, end: 1113, header: '/* SPLODER.States - Multi-state value storage */\n' },
    { file: 'models/rect.js', start: 1114, end: 1137, header: '/* SPLODER.Rect - Rectangle base class */\n' },
    { file: 'models/item.js', start: 1138, end: 1329, header: '/* SPLODER.Item - Main game item class with properties and states */\n' },

    // 7. Biped classes
    { file: 'biped/biped-poses.js', start: 1330, end: 1690, header: '/* SPLODER.BipedPoses - Biped animation and pose system */\n' },
    { file: 'biped/biped-face.js', start: 1691, end: 2066, header: '/* SPLODER.BipedFace - Biped face mesh and emotion system */\n' },
    { file: 'biped/biped-item.js', start: 2067, end: 2092, header: '/* SPLODER.BipedItem - Held item for bipeds */\n' },
    { file: 'biped/biped.js', start: 2093, end: 2631, header: '/* SPLODER.Biped - Full biped mesh builder with constants and defaults */\n' },

    // 8. Data/Store classes
    { file: 'models/image-map.js', start: 2632, end: 2689, header: '/* SPLODER.ImageMap - Canvas-based image/light data map */\n' },
    { file: 'models/store.js', start: 2690, end: 2851, header: '/* SPLODER.Store - Base store class for items, selection, undo, serialize */\n' },
    { file: 'models/game-store.js', start: 2852, end: 2874, header: '/* SPLODER.GameStore - Game-specific item store extending Store */\n' },
    { file: 'models/levels.js', start: 2875, end: 2973, header: '/* SPLODER.Levels - Multi-level management */\n' },
    { file: 'models/env-model.js', start: 2974, end: 3042, header: '/* SPLODER.EnvModel - Environment model (sky color, etc.) */\n' },
    { file: 'models/model-history.js', start: 3043, end: 3173, header: '/* SPLODER.ModelHistory - Undo/redo history, clipboard, import/export */\n' },

    // 9. Flow system
    { file: 'flow/flow-node.js', start: 3174, end: 3418, header: '/* SPLODER.FlowNode - Flow/logic node with constants and defaults */\n' },
    { file: 'flow/flow-store.js', start: 3419, end: 3600, header: '/* SPLODER.FlowStore - Flow node store extending Store */\n' },

    // 10. Tag model
    { file: 'models/tag-model.js', start: 3601, end: 3661, header: '/* SPLODER.TagModel - Tag assignment model */\n' },

    // 11. Physics
    { file: 'physics/game-physics.js', start: 3662, end: 3885, header: '/* SPLODER.GamePhysics - Raycasting, collision, elevation, gravity */\n' },

    // 12. Rendering support
    { file: 'rendering/simple-2d-gl.js', start: 3886, end: 3968, header: '/* SPLODER.Simple2dGL - WebGL 2D renderer for lightmaps */\n' },
    { file: 'rendering/light-map.js', start: 3969, end: 4052, header: '/* SPLODER.LightMap - CPU-based light map */\n' },
    { file: 'rendering/shader-light-map.js', start: 4053, end: 4126, header: '/* SPLODER.ShaderLightMap - GPU-accelerated shader light map */\n' },

    // 13. Scene model
    { file: 'scene/scene-model.js', start: 4127, end: 4659, header: '/* SPLODER.SceneModel - 3D scene model with mesh building and management */\n' },

    // 14. Stats
    { file: 'vendor/stats.js', start: 4661, end: 4737, header: '/* Stats.js - FPS/MS performance monitor */\n' },

    // 15. Camera
    { file: 'camera/game-camera.js', start: 4739, end: 4841, header: '/* SPLODER.GameCamera - Perspective camera with easing and targeting */\n' },
    { file: 'camera/game-camera-controls.js', start: 4843, end: 5167, header: '/* SPLODER.GameCameraControls - First-person camera controls */\n' },

    // 16. Broadcaster
    { file: 'core/broadcaster.js', start: 5168, end: 5227, header: '/* SPLODER.Broadcaster - Event broadcasting mixin */\n' },

    // 17. Game view
    { file: 'scene/game-view.js', start: 5228, end: 5418, header: '/* SPLODER.GameView - 3D game view with rendering and interaction */\n' },

    // 18. Game controller
    { file: 'game/game.js', start: 5420, end: 5596, header: '/* SPLODER.Game - Top-level game controller */\n' },

    // 19. Entry point
    { file: 'main.js', start: 5597, end: 5614, header: '/* Main entry point - creates game and starts on document load */\n' }
];

// Create directories
var dirs = new Set();
files.forEach(function(f) {
    var dir = path.join(srcDir, path.dirname(f.file));
    dirs.add(dir);
});
dirs.forEach(function(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Write files
files.forEach(function(f) {
    var content = extract(f.start, f.end);
    var filePath = path.join(srcDir, f.file);
    fs.writeFileSync(filePath, f.header + content + '\n');
    console.log('Created: ' + f.file + ' (lines ' + f.start + '-' + f.end + ')');
});

// Create the file order manifest for the build
var order = files.map(function(f) { return 'src/' + f.file; });
fs.writeFileSync(path.join(__dirname, 'src', 'file-order.json'), JSON.stringify(order, null, 2));
console.log('\nCreated file-order.json');
console.log('Done! ' + files.length + ' files created.');
