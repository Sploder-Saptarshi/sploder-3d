/* ============================================================
   Sploder 3D Creator – Main editor script
   Builds atop the existing SPLODER engine (Game, GameView,
   Store, SceneModel, FlowStore, etc.)
   ============================================================ */

(function () {
    'use strict';

    /* ----------------------------------------------------------
       0. GLOBALS / STATE
    ---------------------------------------------------------- */
    var game, mapEditor, flowEditor;
    var currentTool = 'draw';            // draw | select | place
    var currentLevel = 0;
    var drawStartCell = null;
    var selectedSurface = 'floor';       // floor | bottomwalls | bottomedges | ceiling | topwalls | topedges
    var selectedTextureIndex = 0;
    var selectedPlaceType = SPLODER.Item.TYPE_WALL; // type of item to place
    var selectedPlaceSubIndex = 0;       // sub-index within type (e.g. which biped skin)
    var activePaintColor = '#ffffff';
    var clipboard = null;
    var openMenu = null;

    // Map editor state
    var MAP = {
        offsetX: 0, offsetY: 0,
        zoom: 1,
        gridSize: 16,           // each map cell = 1 unit
        tilePixels: 16,         // pixels per tile in the atlas
        dragging: false,
        dragStart: null,
        dragButton: -1,
        drawPreview: null,
        hoverCell: null,
    };

    // Texture atlas cache
    var TEXTURES = {
        tiles: null,       // Image
        tilesAtlas: null,  // {frames:[]}
        items: null,
        itemsAtlas: null,
        bipeds: null,
        bipedsAtlas: null,
        liquids: null,
        liquidsAtlas: null,
    };

    /* ----------------------------------------------------------
       1. INITIALIZATION
    ---------------------------------------------------------- */
    // Override the default main.js onload (which auto-starts the game viewer)
    // We take control of initialization in creator mode
    window.SPLODER_CREATOR_MODE = true;

    // The main.js will set document.body.onload — we need to override it after main.js loads
    // Since creator.js loads AFTER main.js, our onload wins
    document.body.onload = function () {
        console.log('CREATOR: Document loaded (creator mode)');

        function boot() {
            initGame();
            loadTextureAtlases();
            initMenuSystem();
            initMapEditor();
            initBottomPanel();
            initPanelDivider();
            initPropertiesPanel();
            initFlowEditor();
            initItemPicker();
            initKeyboardShortcuts();
            window.addEventListener('resize', onResize, false);
            onResize();
        }

        // Wait for shaders to load from index.html before starting the engine
        if (window.SHADERS_LOADED) {
            boot();
        } else {
            window._onShadersLoaded = boot;
            // Fallback: if shaders don't load within 5 seconds, boot anyway
            setTimeout(function () {
                if (!window.SHADERS_LOADED) {
                    console.warn('CREATOR: Shaders not loaded, booting anyway');
                    boot();
                }
            }, 5000);
        }
    };

    /* ----------------------------------------------------------
       2. GAME ENGINE INIT (reuses SPLODER.Game)
    ---------------------------------------------------------- */
    function initGame() {
        game = new SPLODER.Game();
        var pr = window.screen.width >= 1280 ? 1 : 0.5;
        game.initWithSize(16, pr);

        // We build into our custom gameview div in the preview panel
        buildPreview();
        game.start();

        game.dispatcher.addOnce(function (e) {
            if (e === 'loadComplete') {
                console.log('CREATOR: Engine assets loaded');

                // Load a default starter room
                loadStarterLevel();

                populateTextureGrids();
                redrawMap();
            }
        });
    }

    function loadStarterLevel() {
        // Create a simple starter room: one main room with floor + ceiling
        var startLevel = '1,0,-10,-10,20,20,[[@,68,83,@,@,@,@,@,@,@,@,160]]~';
        game.model.unserialize(startLevel);
        redrawMap();
    }

    function buildPreview() {
        var previewPanel = document.getElementById('preview-panel');
        var gv = document.getElementById('gameview');
        var w = previewPanel.clientWidth;
        var h = previewPanel.clientHeight;

        game.width = w;
        game.height = h;

        game.clock = new THREE.Clock();
        var renderer = game.renderer3d = new THREE.WebGLRenderer({
            premultipliedAlpha: false, antialias: false, alpha: false, overdraw: 1
        });
        renderer.premultipliedAlpha = true;
        renderer.sortObjects = false;
        renderer.setPixelRatio(game.pixelRatio);
        renderer.setSize(w, h);
        renderer.setClearColor(0x000000, 1);

        game.stage3d = renderer.domElement;
        gv.style.cursor = 'cell';
        gv.appendChild(game.stage3d);

        game.gameView.loadComplete.addOnce(game.onLoadComplete, game);
        game.gameView.build(game.stage3d, renderer);

        renderer.domElement.addEventListener('mouseup', SPLODER.bind(game.gameView, game.gameView.onMouseUp), false);
        renderer.domElement.addEventListener('mousedown', SPLODER.bind(game.gameView, game.gameView.onMouseDown), false);
    }

    function onResize() {
        var previewPanel = document.getElementById('preview-panel');
        if (previewPanel && game && game.renderer3d) {
            var w = previewPanel.clientWidth;
            var h = previewPanel.clientHeight;
            game.width = w;
            game.height = h;
            game.renderer3d.setSize(w, h);
            if (game.gameView && game.gameView.camera) {
                game.gameView.setSize(w, h);
            }
        }
        resizeMapCanvas();
    }

    /* ----------------------------------------------------------
       3. TEXTURE ATLAS LOADING
    ---------------------------------------------------------- */
    function loadTextureAtlases() {
        // Load tile atlas
        loadAtlas('images/textures-tiles.json', 'images/textures-tiles.png', function (atlas, img) {
            TEXTURES.tilesAtlas = atlas;
            TEXTURES.tiles = img;
        });
        loadAtlas('images/textures-items.json', 'images/textures-items.png', function (atlas, img) {
            TEXTURES.itemsAtlas = atlas;
            TEXTURES.items = img;
        });
        loadAtlas('images/textures-bipeds.json', 'images/textures-bipeds.png', function (atlas, img) {
            TEXTURES.bipedsAtlas = atlas;
            TEXTURES.bipeds = img;
        });
        loadAtlas('images/textures-liquids.json', 'images/textures-liquids.png', function (atlas, img) {
            TEXTURES.liquidsAtlas = atlas;
            TEXTURES.liquids = img;
        });
    }

    function loadAtlas(jsonUrl, imgUrl, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', jsonUrl, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                try {
                    var atlas = JSON.parse(xhr.responseText);
                    var img = new Image();
                    img.onload = function () { callback(atlas, img); };
                    img.src = imgUrl;
                } catch (e) {
                    console.warn('Failed to parse atlas:', jsonUrl, e);
                }
            }
        };
        xhr.send();
    }

    /* ----------------------------------------------------------
       4. MENU SYSTEM
    ---------------------------------------------------------- */
    function initMenuSystem() {
        var menuBtns = document.querySelectorAll('.menu-btn');
        menuBtns.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                var menuName = btn.getAttribute('data-menu');
                toggleMenu(menuName, btn);
            });
        });

        document.addEventListener('click', function () { closeAllMenus(); });

        // Dropdown actions
        document.querySelectorAll('.dropdown-menu button').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var action = btn.getAttribute('data-action');
                handleMenuAction(action);
                closeAllMenus();
            });
        });

        // Undo / Redo
        document.getElementById('btn-undo').addEventListener('click', function () { handleMenuAction('undo'); });
        document.getElementById('btn-redo').addEventListener('click', function () { handleMenuAction('redo'); });
        document.getElementById('btn-fullscreen').addEventListener('click', function () { handleMenuAction('fullscreen'); });
    }

    function toggleMenu(name, btn) {
        closeAllMenus();
        var dd = document.getElementById('dropdown-' + name);
        if (dd) {
            dd.style.display = 'block';
            var rect = btn.getBoundingClientRect();
            dd.style.left = rect.left + 'px';
            openMenu = name;
        }
    }

    function closeAllMenus() {
        document.querySelectorAll('.dropdown-menu').forEach(function (m) { m.style.display = 'none'; });
        openMenu = null;
    }

    function handleMenuAction(action) {
        console.log('Menu action:', action);
        switch (action) {
            case 'undo':
                if (game && game.history) game.history.restoreUndo();
                break;
            case 'redo':
                if (game && game.history) game.history.redo();
                break;
            case 'delete':
                if (game && game.model && game.model.hasSelection()) {
                    game.model.saveUndo();
                    var sel = game.model.selection.slice();
                    game.model.deleteSelection();
                    game.model.changed.dispatch(SPLODER.ACTION_SELECTION_DELETE, sel);
                    updateSelectionInfo();
                }
                break;
            case 'duplicate':
                if (game && game.model) {
                    game.dispatcher.dispatch(SPLODER.ACTION_SELECTION_DUPLICATE);
                }
                break;
            case 'selectall':
                if (game && game.model) {
                    game.model.selection = game.model.items.slice();
                    game.model.changed.dispatch(SPLODER.ACTION_SELECT_ALL, game.model.selection);
                    updateSelectionInfo();
                }
                break;
            case 'deselect':
                if (game && game.model) {
                    game.model.selection = [];
                    game.model.changed.dispatch(SPLODER.ACTION_DESELECT);
                    updateSelectionInfo();
                }
                break;
            case 'copy':
                if (game && game.model) clipboard = game.model.copySelectionAsClipboard();
                break;
            case 'paste':
                if (game && game.model && clipboard) game.model.pasteSelectionFromClipboard(clipboard);
                break;
            case 'new':
                if (confirm('Create a new project? Unsaved changes will be lost.')) {
                    game.model.items = [];
                    game.model.selection = [];
                    game.model.nextItemId = 1;
                    game.model.updateBounds();
                    game.model.changed.dispatch(SPLODER.ACTION_CONTEXT_CHANGE);
                    updateSelectionInfo();
                }
                break;
            case 'export':
                exportProject();
                break;
            case 'import':
                importProject();
                break;
            case 'fullscreen':
                toggleFullscreen();
                break;
            case 'test-level':
                testLevel();
                break;
            case 'help-keyboard':
                alert(
                    'Keyboard Shortcuts:\n\n' +
                    'Ctrl+Z — Undo\n' +
                    'Ctrl+Y — Redo\n' +
                    'Ctrl+C — Copy\n' +
                    'Ctrl+V — Paste\n' +
                    'Ctrl+A — Select All\n' +
                    'Delete — Delete Selection\n' +
                    'D — Draw Tool\n' +
                    'S — Select Tool\n' +
                    'P — Place Tool\n' +
                    'F — Open Flow/Logic Editor\n' +
                    'Esc — Deselect / Close dialogs\n' +
                    '+/- — Zoom map in/out'
                );
                break;
            case 'help-about':
                alert('Sploder 3D Creator\nA DOOM-inspired 3D level editor\nBuilt on the Sploder World Engine');
                break;
        }
        redrawMap();
    }

    function exportProject() {
        var data = {
            model: game.model.serialize(),
            env: game.envModel.serialize(),
            levels: game.levels.serialize(),
            flow: game.flowModel.serialize(),
            tags: game.tagModel ? game.tagModel.serialize() : ''
        };
        var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'sploder3d-project.json';
        a.click();
    }

    function importProject() {
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = function (e) {
            var file = e.target.files[0];
            if (!file) return;
            var reader = new FileReader();
            reader.onload = function (ev) {
                try {
                    var data = JSON.parse(ev.target.result);
                    if (data.model) game.model.unserialize(data.model);
                    if (data.env) game.envModel.initWithData ? game.envModel.initWithData(data.env) : null;
                    redrawMap();
                    updateSelectionInfo();
                    console.log('Project imported successfully');
                } catch (err) {
                    alert('Failed to import project: ' + err.message);
                }
            };
            reader.readAsText(file);
        };
        input.click();
    }

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.body.requestFullscreen ? document.body.requestFullscreen() :
                document.body.webkitRequestFullscreen ? document.body.webkitRequestFullscreen() : null;
        } else {
            document.exitFullscreen ? document.exitFullscreen() :
                document.webkitExitFullscreen ? document.webkitExitFullscreen() : null;
        }
    }

    function testLevel() {
        // Open the original game page in a new tab with current level data
        var data = game.model.serialize();
        var w = window.open('index.html', '_blank');
        // After a delay, inject the level data
        setTimeout(function () {
            try {
                if (w && w.game) {
                    w.game.model.unserialize(data);
                }
            } catch (e) { console.warn('Could not inject level data into test window'); }
        }, 3000);
    }

    /* ----------------------------------------------------------
       5. MAP EDITOR (2D Top-Down Grid)
    ---------------------------------------------------------- */
    function initMapEditor() {
        var canvas = document.getElementById('map-canvas');
        var viewport = document.getElementById('map-viewport');

        canvas.addEventListener('mousedown', onMapMouseDown);
        canvas.addEventListener('mousemove', onMapMouseMove);
        canvas.addEventListener('mouseup', onMapMouseUp);
        canvas.addEventListener('mouseleave', onMapMouseLeave);
        canvas.addEventListener('wheel', onMapWheel);
        canvas.addEventListener('contextmenu', function (e) { e.preventDefault(); });

        // Tool buttons
        document.querySelectorAll('.tool-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                document.querySelectorAll('.tool-btn').forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                currentTool = btn.getAttribute('data-tool');
                if (currentTool === 'place') showItemPicker();
            });
        });

        resizeMapCanvas();
    }

    function resizeMapCanvas() {
        var viewport = document.getElementById('map-viewport');
        var canvas = document.getElementById('map-canvas');
        if (viewport && canvas) {
            canvas.width = viewport.clientWidth;
            canvas.height = viewport.clientHeight;
            redrawMap();
        }
    }

    function cellToPixel(cx, cy) {
        var canvas = document.getElementById('map-canvas');
        var cw = canvas.width, ch = canvas.height;
        var px = (cx * MAP.gridSize * MAP.zoom) + MAP.offsetX + cw * 0.5;
        var py = (cy * MAP.gridSize * MAP.zoom) + MAP.offsetY + ch * 0.5;
        return { x: px, y: py };
    }

    function pixelToCell(px, py) {
        var canvas = document.getElementById('map-canvas');
        var cw = canvas.width, ch = canvas.height;
        var cx = (px - MAP.offsetX - cw * 0.5) / (MAP.gridSize * MAP.zoom);
        var cy = (py - MAP.offsetY - ch * 0.5) / (MAP.gridSize * MAP.zoom);
        return { x: Math.floor(cx), y: Math.floor(cy) };
    }

    function redrawMap() {
        var canvas = document.getElementById('map-canvas');
        if (!canvas) return;
        var ctx = canvas.getContext('2d');
        var w = canvas.width, h = canvas.height;
        var gs = MAP.gridSize * MAP.zoom;

        ctx.clearRect(0, 0, w, h);

        // Background
        ctx.fillStyle = '#16213e';
        ctx.fillRect(0, 0, w, h);

        // Grid
        ctx.strokeStyle = 'rgba(100,140,200,0.12)';
        ctx.lineWidth = 1;

        var startCell = pixelToCell(0, 0);
        var endCell = pixelToCell(w, h);

        for (var x = startCell.x - 1; x <= endCell.x + 1; x++) {
            var p = cellToPixel(x, 0);
            ctx.beginPath();
            ctx.moveTo(Math.floor(p.x) + 0.5, 0);
            ctx.lineTo(Math.floor(p.x) + 0.5, h);
            ctx.stroke();
        }
        for (var y = startCell.y - 1; y <= endCell.y + 1; y++) {
            var p = cellToPixel(0, y);
            ctx.beginPath();
            ctx.moveTo(0, Math.floor(p.y) + 0.5);
            ctx.lineTo(w, Math.floor(p.y) + 0.5);
            ctx.stroke();
        }

        // Origin axes
        var origin = cellToPixel(0, 0);
        ctx.strokeStyle = 'rgba(100,180,255,0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(origin.x, 0); ctx.lineTo(origin.x, h);
        ctx.moveTo(0, origin.y); ctx.lineTo(w, origin.y);
        ctx.stroke();

        // Draw items from the model
        if (game && game.model && game.model.items) {
            var items = game.model.items;
            var sel = game.model.selection;

            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var tl = cellToPixel(item.baseX, item.baseY);
                var rw = item.width * gs;
                var rh = item.height * gs;

                // Determine color by type
                var fillColor, strokeColor;
                switch (item.type) {
                    case SPLODER.Item.TYPE_WALL:
                        fillColor = 'rgba(200,160,100,0.35)';
                        strokeColor = '#c8a064';
                        break;
                    case SPLODER.Item.TYPE_PLATFORM:
                        fillColor = 'rgba(100,200,100,0.25)';
                        strokeColor = '#6c6';
                        break;
                    case SPLODER.Item.TYPE_LIQUID:
                        fillColor = 'rgba(60,120,220,0.3)';
                        strokeColor = '#48f';
                        break;
                    case SPLODER.Item.TYPE_PANEL:
                        fillColor = 'rgba(220,140,60,0.3)';
                        strokeColor = '#da6';
                        break;
                    case SPLODER.Item.TYPE_ITEM:
                        fillColor = 'rgba(255,220,60,0.4)';
                        strokeColor = '#fe0';
                        break;
                    case SPLODER.Item.TYPE_BIPED:
                        fillColor = 'rgba(200,60,200,0.35)';
                        strokeColor = '#e0e';
                        break;
                    case SPLODER.Item.TYPE_LIGHT:
                        fillColor = 'rgba(255,255,200,0.25)';
                        strokeColor = '#ff8';
                        break;
                    default:
                        fillColor = 'rgba(150,150,150,0.2)';
                        strokeColor = '#888';
                }

                var isSelected = sel.indexOf(item) >= 0;

                // Fill
                ctx.fillStyle = fillColor;
                ctx.fillRect(tl.x, tl.y, rw, rh);

                // Stroke
                ctx.strokeStyle = isSelected ? '#e040a0' : strokeColor;
                ctx.lineWidth = isSelected ? 2.5 : 1;
                ctx.strokeRect(tl.x, tl.y, rw, rh);

                // Label
                if (gs > 4) {
                    ctx.fillStyle = isSelected ? '#fff' : strokeColor;
                    ctx.font = Math.max(8, Math.min(11, gs * 0.7)) + 'px sans-serif';
                    var label = SPLODER.Item.typeStrings[item.type] || '?';
                    ctx.fillText(label, tl.x + 3, tl.y + Math.max(10, gs * 0.8));
                }

                // Selection handles
                if (isSelected) {
                    drawHandle(ctx, tl.x, tl.y);
                    drawHandle(ctx, tl.x + rw, tl.y);
                    drawHandle(ctx, tl.x + rw, tl.y + rh);
                    drawHandle(ctx, tl.x, tl.y + rh);
                }

                // For items/bipeds, draw a small icon
                if (item.type === SPLODER.Item.TYPE_ITEM || item.type === SPLODER.Item.TYPE_BIPED) {
                    var cx = tl.x + rw * 0.5;
                    var cy = tl.y + rh * 0.5;
                    ctx.beginPath();
                    ctx.arc(cx, cy, Math.max(3, gs * 0.3), 0, Math.PI * 2);
                    ctx.fillStyle = strokeColor;
                    ctx.fill();
                }

                // For lights, draw a radial glow
                if (item.type === SPLODER.Item.TYPE_LIGHT) {
                    var cx = tl.x + rw * 0.5;
                    var cy = tl.y + rh * 0.5;
                    var grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, gs * 2);
                    grad.addColorStop(0, 'rgba(255,255,160,0.3)');
                    grad.addColorStop(1, 'rgba(255,255,160,0)');
                    ctx.fillStyle = grad;
                    ctx.fillRect(cx - gs * 2, cy - gs * 2, gs * 4, gs * 4);
                }
            }
        }

        // Draw preview (while drawing)
        if (MAP.drawPreview) {
            var dp = MAP.drawPreview;
            var dtl = cellToPixel(dp.x, dp.y);
            // Color the preview by what's being placed
            var previewColor = '#e040a0';
            var previewFill = 'rgba(224,64,160,0.15)';
            if (currentTool === 'place') {
                switch (selectedPlaceType) {
                    case SPLODER.Item.TYPE_WALL: previewColor = '#c8a064'; previewFill = 'rgba(200,160,100,0.2)'; break;
                    case SPLODER.Item.TYPE_PLATFORM: previewColor = '#6c6'; previewFill = 'rgba(100,200,100,0.2)'; break;
                    case SPLODER.Item.TYPE_LIQUID: previewColor = '#48f'; previewFill = 'rgba(60,120,220,0.2)'; break;
                    case SPLODER.Item.TYPE_PANEL: previewColor = '#da6'; previewFill = 'rgba(220,140,60,0.2)'; break;
                    case SPLODER.Item.TYPE_ITEM: previewColor = '#fe0'; previewFill = 'rgba(255,220,60,0.25)'; break;
                    case SPLODER.Item.TYPE_BIPED: previewColor = '#e0e'; previewFill = 'rgba(200,60,200,0.2)'; break;
                    case SPLODER.Item.TYPE_LIGHT: previewColor = '#ff8'; previewFill = 'rgba(255,255,200,0.25)'; break;
                }
            }
            ctx.fillStyle = previewFill;
            ctx.fillRect(dtl.x, dtl.y, dp.w * gs, dp.h * gs);
            ctx.strokeStyle = previewColor;
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 4]);
            ctx.strokeRect(dtl.x, dtl.y, dp.w * gs, dp.h * gs);
            ctx.setLineDash([]);

            // Show size label
            if (dp.w > 1 || dp.h > 1) {
                ctx.fillStyle = previewColor;
                ctx.font = '10px sans-serif';
                ctx.fillText(dp.w + 'x' + dp.h, dtl.x + 3, dtl.y - 4);
            }
        }

        // Crosshair at hover
        if (MAP.hoverCell) {
            var hc = cellToPixel(MAP.hoverCell.x, MAP.hoverCell.y);
            var chH = document.getElementById('map-crosshair-h');
            var chV = document.getElementById('map-crosshair-v');
            if (chH) chH.style.top = hc.y + 'px';
            if (chV) chV.style.left = hc.x + 'px';

            // Show hover cell highlight for place tool
            if (currentTool === 'place' && !MAP.drawPreview) {
                var hlp = cellToPixel(MAP.hoverCell.x, MAP.hoverCell.y);
                ctx.strokeStyle = 'rgba(224,64,160,0.6)';
                ctx.lineWidth = 2;
                ctx.strokeRect(hlp.x, hlp.y, gs, gs);
                // Show type label at cursor
                ctx.fillStyle = '#e040a0';
                ctx.font = '10px sans-serif';
                var placeLabel = SPLODER.Item.typeStrings[selectedPlaceType] || '?';
                ctx.fillText(placeLabel, hlp.x + 2, hlp.y - 4);
            }
        }

        // Tool status indicator (top-left of map canvas)
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(4, 4, 130, 20);
        ctx.fillStyle = '#e040a0';
        ctx.font = 'bold 11px sans-serif';
        var toolLabel = currentTool.toUpperCase();
        if (currentTool === 'place') {
            toolLabel += ': ' + (SPLODER.Item.typeStrings[selectedPlaceType] || '?').toUpperCase();
        }
        ctx.fillText(toolLabel, 10, 18);
    }

    function drawHandle(ctx, x, y) {
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#e040a0';
        ctx.lineWidth = 1.5;
        ctx.fillRect(x - 4, y - 4, 8, 8);
        ctx.strokeRect(x - 4, y - 4, 8, 8);
    }

    function onMapMouseDown(e) {
        var cell = pixelToCell(e.offsetX, e.offsetY);
        MAP.dragButton = e.button;
        MAP.dragStart = { px: e.offsetX, py: e.offsetY, ox: MAP.offsetX, oy: MAP.offsetY };
        MAP.dragging = true;

        if (e.button === 2 || e.button === 1) {
            // Right/middle click: pan
            return;
        }

        if (currentTool === 'draw') {
            drawStartCell = cell;
            MAP.drawPreview = { x: cell.x, y: cell.y, w: 1, h: 1 };
        } else if (currentTool === 'place') {
            drawStartCell = cell;
            // Items/bipeds/lights are point-placed (1x1), walls/liquids/platforms are rect-drawn
            if (selectedPlaceType === SPLODER.Item.TYPE_ITEM ||
                selectedPlaceType === SPLODER.Item.TYPE_BIPED ||
                selectedPlaceType === SPLODER.Item.TYPE_LIGHT) {
                MAP.drawPreview = { x: cell.x, y: cell.y, w: 1, h: 1 };
            } else {
                MAP.drawPreview = { x: cell.x, y: cell.y, w: 1, h: 1 };
            }
        } else if (currentTool === 'select') {
            // Check if clicking on an existing item
            if (game && game.model) {
                var hit = game.model.getItemUnderPoint(cell.x, cell.y, 0);
                if (hit) {
                    if (e.shiftKey) {
                        var idx = game.model.selection.indexOf(hit);
                        if (idx >= 0) {
                            game.model.selection.splice(idx, 1);
                        } else {
                            game.model.selection.push(hit);
                        }
                    } else {
                        game.model.selection = [hit];
                    }
                    game.model.changed.dispatch(SPLODER.ACTION_SELECT_ITEM, game.model.selection);
                    showPropertiesForSelection();
                } else {
                    game.model.selection = [];
                    game.model.changed.dispatch(SPLODER.ACTION_DESELECT);
                    hidePropertiesPanel();
                }
                updateSelectionInfo();
            }
            drawStartCell = cell; // for box selection
        }
        redrawMap();
    }

    function onMapMouseMove(e) {
        var cell = pixelToCell(e.offsetX, e.offsetY);
        MAP.hoverCell = cell;

        if (MAP.dragging) {
            if (MAP.dragButton === 2 || MAP.dragButton === 1) {
                // Panning
                MAP.offsetX = MAP.dragStart.ox + (e.offsetX - MAP.dragStart.px);
                MAP.offsetY = MAP.dragStart.oy + (e.offsetY - MAP.dragStart.py);
            } else if (currentTool === 'draw' && drawStartCell) {
                var minX = Math.min(drawStartCell.x, cell.x);
                var minY = Math.min(drawStartCell.y, cell.y);
                var maxX = Math.max(drawStartCell.x, cell.x);
                var maxY = Math.max(drawStartCell.y, cell.y);
                MAP.drawPreview = {
                    x: minX, y: minY,
                    w: maxX - minX + 1, h: maxY - minY + 1
                };
            } else if (currentTool === 'place' && drawStartCell) {
                // For point-type items, keep preview at 1x1
                if (selectedPlaceType === SPLODER.Item.TYPE_ITEM ||
                    selectedPlaceType === SPLODER.Item.TYPE_BIPED ||
                    selectedPlaceType === SPLODER.Item.TYPE_LIGHT) {
                    MAP.drawPreview = { x: cell.x, y: cell.y, w: 1, h: 1 };
                } else {
                    var minX = Math.min(drawStartCell.x, cell.x);
                    var minY = Math.min(drawStartCell.y, cell.y);
                    var maxX = Math.max(drawStartCell.x, cell.x);
                    var maxY = Math.max(drawStartCell.y, cell.y);
                    MAP.drawPreview = {
                        x: minX, y: minY,
                        w: maxX - minX + 1, h: maxY - minY + 1
                    };
                }
            } else if (currentTool === 'select' && drawStartCell) {
                // Selection box
                var minX = Math.min(drawStartCell.x, cell.x);
                var minY = Math.min(drawStartCell.y, cell.y);
                var maxX = Math.max(drawStartCell.x, cell.x);
                var maxY = Math.max(drawStartCell.y, cell.y);
                MAP.drawPreview = {
                    x: minX, y: minY,
                    w: maxX - minX + 1, h: maxY - minY + 1
                };
            }
        }
        redrawMap();
    }

    function onMapMouseUp(e) {
        if (!MAP.dragging) return;
        MAP.dragging = false;

        var cell = pixelToCell(e.offsetX, e.offsetY);

        if (MAP.dragButton === 0 && currentTool === 'draw' && drawStartCell && game && game.model) {
            // Create a wall
            var minX = Math.min(drawStartCell.x, cell.x);
            var minY = Math.min(drawStartCell.y, cell.y);
            var w = Math.max(drawStartCell.x, cell.x) - minX + 1;
            var h = Math.max(drawStartCell.y, cell.y) - minY + 1;

            if (w > 0 && h > 0) {
                game.model.saveUndo();
                var newItem = game.model.addItem(SPLODER.Item.TYPE_WALL, minX, minY, w, h);

                // Set default textures
                newItem.setAttrib(SPLODER.Item.PROPERTY_FLOORTEXTURE, selectedTextureIndex);
                newItem.setAttrib(SPLODER.Item.PROPERTY_BOTTOMWALLTEXTURE, selectedTextureIndex);
                newItem.setAttrib(SPLODER.Item.PROPERTY_LIGHTLEVEL, 160);

                game.model.selection = [newItem];
                game.model.changed.dispatch(SPLODER.ACTION_CREATE, newItem);
                updateSelectionInfo();
                showPropertiesForSelection();
                console.log('CREATOR: Drew wall at', minX, minY, w, 'x', h, 'texture:', selectedTextureIndex);
            }
        } else if (MAP.dragButton === 0 && currentTool === 'place' && drawStartCell && game && game.model) {
            // Place an item of the selected type
            var placeType = selectedPlaceType;
            var minX, minY, w, h;

            if (placeType === SPLODER.Item.TYPE_ITEM ||
                placeType === SPLODER.Item.TYPE_BIPED ||
                placeType === SPLODER.Item.TYPE_LIGHT) {
                // Point items: place at single cell
                minX = cell.x;
                minY = cell.y;
                w = 1;
                h = 1;
            } else {
                // Rect items: walls, platforms, liquids, panels
                minX = Math.min(drawStartCell.x, cell.x);
                minY = Math.min(drawStartCell.y, cell.y);
                w = Math.max(drawStartCell.x, cell.x) - minX + 1;
                h = Math.max(drawStartCell.y, cell.y) - minY + 1;
            }

            if (w > 0 && h > 0) {
                game.model.saveUndo();
                var newItem = game.model.addItem(placeType, minX, minY, w, h);

                // Set default texture based on type
                if (placeType === SPLODER.Item.TYPE_WALL) {
                    newItem.setAttrib(SPLODER.Item.PROPERTY_FLOORTEXTURE, selectedTextureIndex);
                    newItem.setAttrib(SPLODER.Item.PROPERTY_BOTTOMWALLTEXTURE, selectedTextureIndex);
                } else if (placeType === SPLODER.Item.TYPE_LIQUID) {
                    // Engine uses PROPERTY_LIQUIDTYPE for the liquid texture
                    newItem.setAttrib(SPLODER.Item.PROPERTY_LIQUIDTYPE, selectedPlaceSubIndex);
                } else if (placeType === SPLODER.Item.TYPE_PLATFORM) {
                    newItem.setAttrib(SPLODER.Item.PROPERTY_FLOORTEXTURE, selectedTextureIndex);
                } else if (placeType === SPLODER.Item.TYPE_PANEL) {
                    newItem.setAttrib(SPLODER.Item.PROPERTY_TEXTURE1, selectedPlaceSubIndex);
                } else if (placeType === SPLODER.Item.TYPE_ITEM) {
                    newItem.setAttrib(SPLODER.Item.PROPERTY_TEXTURE1, selectedPlaceSubIndex);
                } else if (placeType === SPLODER.Item.TYPE_BIPED) {
                    newItem.setAttrib(SPLODER.Item.PROPERTY_TEXTURE1, selectedPlaceSubIndex);
                } else if (placeType === SPLODER.Item.TYPE_LIGHT) {
                    newItem.setAttrib(SPLODER.Item.PROPERTY_COLOR, selectedPlaceSubIndex);
                    newItem.setAttrib(SPLODER.Item.PROPERTY_POWER, 20);
                }

                game.model.selection = [newItem];
                game.model.changed.dispatch(SPLODER.ACTION_CREATE, newItem);
                updateSelectionInfo();
                showPropertiesForSelection();
                console.log('CREATOR: Placed', SPLODER.Item.typeStrings[placeType], 'at', minX, minY, w, 'x', h);
            }
        } else if (MAP.dragButton === 0 && currentTool === 'select' && drawStartCell && game && game.model) {
            // Box selection
            var minX = Math.min(drawStartCell.x, cell.x);
            var minY = Math.min(drawStartCell.y, cell.y);
            var w = Math.max(drawStartCell.x, cell.x) - minX + 1;
            var h = Math.max(drawStartCell.y, cell.y) - minY + 1;

            if (w > 1 || h > 1) {
                var hits = game.model.getItemsWithinRect(minX, minY, w, h);
                if (e.shiftKey) {
                    for (var i = 0; i < hits.length; i++) {
                        if (game.model.selection.indexOf(hits[i]) < 0) {
                            game.model.selection.push(hits[i]);
                        }
                    }
                } else {
                    game.model.selection = hits;
                }
                game.model.changed.dispatch(SPLODER.ACTION_SELECT_WINDOW, game.model.selection);
                updateSelectionInfo();
                if (game.model.selection.length === 1) showPropertiesForSelection();
            }
        }

        drawStartCell = null;
        MAP.drawPreview = null;
        MAP.dragButton = -1;
        redrawMap();
    }

    function onMapMouseLeave(e) {
        MAP.hoverCell = null;
        if (MAP.dragging && (MAP.dragButton === 2 || MAP.dragButton === 1)) {
            // Allow panning to continue
        } else {
            MAP.dragging = false;
            drawStartCell = null;
            MAP.drawPreview = null;
        }
        redrawMap();
    }

    function onMapWheel(e) {
        e.preventDefault();
        var delta = e.deltaY > 0 ? -0.1 : 0.1;
        MAP.zoom = Math.max(0.2, Math.min(4, MAP.zoom + delta));
        redrawMap();
    }

    /* ----------------------------------------------------------
       6. BOTTOM PANEL & TABS
    ---------------------------------------------------------- */
    function initBottomPanel() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var tab = btn.getAttribute('data-tab');
                document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                document.querySelectorAll('.tab-content').forEach(function (c) {
                    c.classList.remove('active');
                    c.style.display = 'none';
                });
                var content = document.querySelector('.tab-content[data-tab="' + tab + '"]');
                if (content) {
                    content.classList.add('active');
                    content.style.display = 'flex';
                }
            });
        });

        // Surface category switching
        document.querySelectorAll('.surface-cat').forEach(function (cat) {
            cat.addEventListener('click', function () {
                document.querySelectorAll('.surface-cat').forEach(function (c) { c.classList.remove('active'); });
                cat.classList.add('active');
                selectedSurface = cat.getAttribute('data-surface');
            });
        });

        // Selection action buttons
        document.getElementById('btn-sel-delete').addEventListener('click', function () { handleMenuAction('delete'); });
        document.getElementById('btn-sel-duplicate').addEventListener('click', function () { handleMenuAction('duplicate'); });
        document.getElementById('btn-sel-copy').addEventListener('click', function () { handleMenuAction('copy'); });
        document.getElementById('btn-sel-paste').addEventListener('click', function () { handleMenuAction('paste'); });

        // Biped sliders
        document.querySelectorAll('#biped-sliders input[type="range"]').forEach(function (slider) {
            slider.addEventListener('input', function () {
                var val = Math.round(slider.value / 2.55);
                slider.parentNode.querySelector('.slider-val').textContent = val;
                updateBipedFromSliders();
            });
        });

        // Color palette
        buildColorPalette();
    }

    function populateTextureGrids() {
        if (!TEXTURES.tiles || !TEXTURES.tilesAtlas) {
            // Try again later
            setTimeout(populateTextureGrids, 500);
            return;
        }

        var textureGrid = document.getElementById('texture-grid');
        var surfaceGrid = document.getElementById('surface-texture-grid');

        // Tile textures for the "all textures" tab
        var frames = TEXTURES.tilesAtlas.frames;
        for (var i = 0; i < frames.length; i++) {
            addTextureTile(textureGrid, TEXTURES.tiles, frames[i], i, 'tile');
        }

        // The surface grid is populated dynamically based on selected item type
        refreshSurfaceGrid();
    }

    function refreshSurfaceGrid() {
        var surfaceGrid = document.getElementById('surface-texture-grid');
        if (!surfaceGrid) return;
        surfaceGrid.innerHTML = '';

        // Determine which atlas to show based on currently selected item
        var atlasImg = TEXTURES.tiles;
        var atlasData = TEXTURES.tilesAtlas;
        var selectedItemIsLiquid = false;
        var activeIdx = selectedTextureIndex; // default highlight index

        if (game && game.model && game.model.hasSelection(1)) {
            var selItem = game.model.selection[0];
            if (selItem.type === SPLODER.Item.TYPE_LIQUID && TEXTURES.liquids && TEXTURES.liquidsAtlas) {
                atlasImg = TEXTURES.liquids;
                atlasData = TEXTURES.liquidsAtlas;
                selectedItemIsLiquid = true;
                // Read the current liquid type to highlight the right tile
                var lt = selItem.getAttrib(SPLODER.Item.PROPERTY_LIQUIDTYPE);
                activeIdx = (lt >= 0) ? lt : 0;
            }
        }

        if (!atlasImg || !atlasData) return;

        var frames = atlasData.frames;
        for (var i = 0; i < frames.length; i++) {
            addSurfaceTile(surfaceGrid, atlasImg, frames[i], i, activeIdx, selectedItemIsLiquid);
        }

        // Update the surface categories visibility — liquids only have floor
        var cats = document.querySelectorAll('.surface-cat');
        cats.forEach(function (cat) {
            var surf = cat.getAttribute('data-surface');
            if (selectedItemIsLiquid) {
                cat.style.display = (surf === 'floor') ? '' : 'none';
            } else {
                cat.style.display = '';
            }
        });
    }

    function addTextureTile(container, img, frame, index, group) {
        var tile = document.createElement('div');
        tile.className = 'asset-tile';
        if (index === selectedTextureIndex && group === 'surface') tile.className += ' selected';

        var c = document.createElement('canvas');
        c.width = frame[2];
        c.height = frame[3];
        var cx = c.getContext('2d');
        cx.drawImage(img, frame[0], frame[1], frame[2], frame[3], 0, 0, frame[2], frame[3]);
        tile.appendChild(c);

        tile.addEventListener('click', function () {
            selectedTextureIndex = index;
            // Update selection highlight
            container.querySelectorAll('.asset-tile').forEach(function (t) { t.classList.remove('selected'); });
            tile.classList.add('selected');

            // Apply to selected items
            applyTextureToSelection(index);

            // Update surface preview
            updateSurfacePreview(index);
        });

        container.appendChild(tile);
    }

    // Surface-grid specific tile — uses an explicit activeIdx for highlighting instead of
    // the global selectedTextureIndex (which is a tile-atlas index, irrelevant for liquids).
    function addSurfaceTile(container, img, frame, index, activeIdx, isLiquid) {
        var tile = document.createElement('div');
        tile.className = 'asset-tile';
        if (index === activeIdx) tile.className += ' selected';

        var c = document.createElement('canvas');
        c.width = frame[2];
        c.height = frame[3];
        var cx = c.getContext('2d');
        cx.drawImage(img, frame[0], frame[1], frame[2], frame[3], 0, 0, frame[2], frame[3]);
        tile.appendChild(c);

        tile.addEventListener('click', function () {
            // Update highlight in this grid
            container.querySelectorAll('.asset-tile').forEach(function (t) { t.classList.remove('selected'); });
            tile.classList.add('selected');

            if (isLiquid) {
                // For liquids, only PROPERTY_LIQUIDTYPE matters for rendering
                applyTextureToSelection(index);
            } else {
                selectedTextureIndex = index;
                applyTextureToSelection(index);
                updateSurfacePreview(index);
            }
        });

        container.appendChild(tile);
    }

    function applyTextureToSelection(textureIdx) {
        if (!game || !game.model || !game.model.hasSelection()) return;

        var sel = game.model.selection;
        game.model.saveUndo();
        var changed = false;

        for (var i = 0; i < sel.length; i++) {
            var item = sel[i];
            if (item.type === SPLODER.Item.TYPE_LIQUID) {
                // Engine reads PROPERTY_LIQUIDTYPE for the liquid texture atlas frame
                item.setAttrib(SPLODER.Item.PROPERTY_LIQUIDTYPE, textureIdx);
                changed = true;
            } else {
                // Wall/platform/panel surface property map
                var propMap = {
                    'floor':      SPLODER.Item.PROPERTY_FLOORTEXTURE,
                    'bottomwalls': SPLODER.Item.PROPERTY_BOTTOMWALLTEXTURE,
                    'bottomedges': SPLODER.Item.PROPERTY_BOTTOMWALLCORNICETEXTURE,
                    'ceiling':    SPLODER.Item.PROPERTY_CEILTEXTURE,
                    'topwalls':   SPLODER.Item.PROPERTY_TOPWALLTEXTURE,
                    'topedges':   SPLODER.Item.PROPERTY_TOPWALLCORNICETEXTURE,
                };
                var prop = propMap[selectedSurface];
                if (prop !== undefined) {
                    item.setAttrib(prop, textureIdx);
                    changed = true;
                }
            }
        }
        if (changed) {
            game.model.changed.dispatch(SPLODER.ACTION_CHANGE, sel);
        }
    }

    function updateSurfacePreview(idx) {
        var canvas = document.getElementById('surface-preview-canvas');
        if (!canvas) return;
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Determine which atlas to use based on selected item
        var atlasImg = TEXTURES.tiles;
        var atlasData = TEXTURES.tilesAtlas;
        if (game && game.model && game.model.hasSelection(1)) {
            var selItem = game.model.selection[0];
            if (selItem.type === SPLODER.Item.TYPE_LIQUID && TEXTURES.liquids && TEXTURES.liquidsAtlas) {
                atlasImg = TEXTURES.liquids;
                atlasData = TEXTURES.liquidsAtlas;
            }
        }

        if (!atlasImg || !atlasData) return;
        var frame = atlasData.frames[idx];
        if (frame) {
            var tileW = 32, tileH = 32;
            var cols = Math.ceil(canvas.width / tileW);
            var rows = Math.ceil(canvas.height / tileH);
            for (var row = 0; row < rows; row++) {
                for (var col = 0; col < cols; col++) {
                    ctx.drawImage(atlasImg, frame[0], frame[1], frame[2], frame[3],
                        col * tileW, row * tileH, tileW, tileH);
                }
            }
        }
    }

    function buildColorPalette() {
        var palette = document.getElementById('color-palette');
        if (!palette) return;

        // Build a 16x16 color grid similar to the screenshot
        var hues = [0, 15, 30, 45, 60, 75, 90, 120, 150, 180, 195, 210, 240, 270, 300, 330];
        var sats = [0, 30, 60, 100];
        var lights = [10, 25, 40, 55, 70, 85, 95];

        // Grayscale row
        for (var g = 0; g <= 15; g++) {
            var l = Math.round(g * 100 / 15);
            addColorSwatch(palette, 'hsl(0,0%,' + l + '%)');
        }

        // Color rows
        for (var s = sats.length - 1; s >= 1; s--) {
            for (var h = 0; h < hues.length; h++) {
                var lightness = 30 + s * 12;
                addColorSwatch(palette, 'hsl(' + hues[h] + ',' + sats[s] + '%,' + lightness + '%)');
            }
        }

        // Bright saturated row
        for (var h = 0; h < 16; h++) {
            addColorSwatch(palette, 'hsl(' + (h * 22.5) + ',100%,50%)');
        }

        // Pastel row
        for (var h = 0; h < 16; h++) {
            addColorSwatch(palette, 'hsl(' + (h * 22.5) + ',80%,75%)');
        }
    }

    function addColorSwatch(container, color) {
        var swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = color;
        swatch.addEventListener('click', function () {
            container.querySelectorAll('.color-swatch').forEach(function (s) { s.classList.remove('selected'); });
            swatch.classList.add('selected');
            activePaintColor = color;
        });
        container.appendChild(swatch);
    }

    /* ----------------------------------------------------------
       7. PANEL DIVIDER (Resizable split)
    ---------------------------------------------------------- */
    function initPanelDivider() {
        var divider = document.getElementById('panel-divider');
        var mapPanel = document.getElementById('map-panel');
        var dragging = false;
        var startX, startW;

        divider.addEventListener('mousedown', function (e) {
            dragging = true;
            startX = e.clientX;
            startW = mapPanel.offsetWidth;
            e.preventDefault();
        });

        document.addEventListener('mousemove', function (e) {
            if (!dragging) return;
            var newW = startW + (e.clientX - startX);
            newW = Math.max(200, Math.min(window.innerWidth - 200, newW));
            mapPanel.style.width = newW + 'px';
            onResize();
        });

        document.addEventListener('mouseup', function () {
            dragging = false;
        });
    }

    /* ----------------------------------------------------------
       8. PROPERTIES PANEL
    ---------------------------------------------------------- */
    function initPropertiesPanel() {
        document.getElementById('props-close').addEventListener('click', hidePropertiesPanel);

        // Open flow editor from properties
        document.getElementById('btn-open-flow').addEventListener('click', function () {
            document.getElementById('flow-overlay').style.display = 'flex';
        });

        // Wire up property inputs
        var propInputs = {
            'prop-x': function (v, item) { game.model.saveUndo(); item.x = parseInt(v); },
            'prop-y': function (v, item) { game.model.saveUndo(); item.y = parseInt(v); },
            'prop-w': function (v, item) { game.model.saveUndo(); item.width = Math.max(1, parseInt(v)); },
            'prop-h': function (v, item) { game.model.saveUndo(); item.height = Math.max(1, parseInt(v)); },
            'prop-floordepth': function (v, item) { game.model.saveUndo(); item.setAttrib(SPLODER.Item.PROPERTY_FLOORDEPTH, parseInt(v)); },
            'prop-ceildepth': function (v, item) { game.model.saveUndo(); item.setAttrib(SPLODER.Item.PROPERTY_CEILDEPTH, parseInt(v)); },
            'prop-lightlevel': function (v, item) { game.model.saveUndo(); item.setAttrib(SPLODER.Item.PROPERTY_LIGHTLEVEL, parseInt(v)); },
            'prop-health': function (v, item) { game.model.saveUndo(); item.setAttrib(SPLODER.Item.PROPERTY_HEALTH, parseInt(v)); },
            'prop-strength': function (v, item) { game.model.saveUndo(); item.setAttrib(SPLODER.Item.PROPERTY_STRENGTH, parseInt(v)); },
            'prop-speed': function (v, item) { game.model.saveUndo(); item.setAttrib(SPLODER.Item.PROPERTY_SPEED, parseInt(v)); },
        };

        Object.keys(propInputs).forEach(function (id) {
            var el = document.getElementById(id);
            if (el) {
                el.addEventListener('change', function () {
                    if (game && game.model && game.model.hasSelection(1)) {
                        var item = game.model.selection[0];
                        propInputs[id](el.value, item);
                        game.model.changed.dispatch(SPLODER.ACTION_CHANGE, [item]);
                        redrawMap();
                    }
                });
                // Update slider labels
                if (el.type === 'range') {
                    el.addEventListener('input', function () {
                        var label = el.parentNode.querySelector('.slider-val');
                        if (label) label.textContent = el.value;
                    });
                }
            }
        });
    }

    function showPropertiesForSelection() {
        if (!game || !game.model || !game.model.hasSelection(1)) {
            hidePropertiesPanel();
            hideBipedTab();
            return;
        }

        var item = game.model.selection[0];
        document.getElementById('props-panel').style.display = 'block';
        document.getElementById('prop-type').textContent = SPLODER.Item.typeStrings[item.type] || 'unknown';
        document.getElementById('prop-x').value = item.baseX;
        document.getElementById('prop-y').value = item.baseY;
        document.getElementById('prop-w').value = item.width;
        document.getElementById('prop-h').value = item.height;

        var fd = item.getAttrib(SPLODER.Item.PROPERTY_FLOORDEPTH);
        var cd = item.getAttrib(SPLODER.Item.PROPERTY_CEILDEPTH);
        var ll = item.getAttrib(SPLODER.Item.PROPERTY_LIGHTLEVEL);
        var hp = item.getAttrib(SPLODER.Item.PROPERTY_HEALTH);
        var st = item.getAttrib(SPLODER.Item.PROPERTY_STRENGTH);
        var sp = item.getAttrib(SPLODER.Item.PROPERTY_SPEED);

        document.getElementById('prop-floordepth').value = fd;
        document.getElementById('prop-ceildepth').value = cd;
        document.getElementById('prop-lightlevel').value = ll;
        document.getElementById('prop-health').value = hp;
        document.getElementById('prop-strength').value = st;
        document.getElementById('prop-speed').value = sp;

        // Update slider labels
        document.querySelectorAll('#props-content input[type="range"]').forEach(function (el) {
            var label = el.parentNode.querySelector('.slider-val');
            if (label) label.textContent = el.value;
        });

        // Refresh the surface texture grid to match this item's type (liquid vs wall etc.)
        refreshSurfaceGrid();

        // If it's a biped, auto-switch to the biped tab and populate sliders from the item
        if (item.type === SPLODER.Item.TYPE_BIPED) {
            showBipedTabForItem(item);
        } else {
            hideBipedTab();
        }
    }

    function hidePropertiesPanel() {
        document.getElementById('props-panel').style.display = 'none';
        hideBipedTab();
        refreshSurfaceGrid(); // Reset surface grid to default (tiles) when deselecting
    }

    /* ----------------------------------------------------------
       9. FLOW / LOGIC EDITOR
    ---------------------------------------------------------- */
    function initFlowEditor() {
        var overlay = document.getElementById('flow-overlay');
        var closeBtn = document.getElementById('flow-close');
        var canvas = document.getElementById('flow-canvas');

        closeBtn.addEventListener('click', function () {
            overlay.style.display = 'none';
        });

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) overlay.style.display = 'none';
        });

        // Node creation from palette
        document.querySelectorAll('.flow-node-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var type = btn.getAttribute('data-nodetype');
                createFlowNode(type);
            });
        });

        // Initialize flow canvas
        initFlowCanvas(canvas);

        // Trigger picker
        document.querySelectorAll('#trigger-picker button').forEach(function (btn) {
            btn.addEventListener('click', function () {
                document.getElementById('trigger-picker').style.display = 'none';
            });
        });
    }

    var flowNodes = [];
    var flowConnections = [];
    var flowDragNode = null;
    var flowDragOffset = { x: 0, y: 0 };

    function createFlowNode(type) {
        var typeMap = {
            'trigger': SPLODER.FlowNode.TYPE_TRIGGER,
            'condition': SPLODER.FlowNode.TYPE_CONDITION,
            'action': SPLODER.FlowNode.TYPE_ACTION,
            'context': SPLODER.FlowNode.TYPE_CONTEXT,
            'delay': SPLODER.FlowNode.TYPE_DELAY,
            'loop': SPLODER.FlowNode.TYPE_LOOP,
        };

        var nodeType = typeMap[type] || SPLODER.FlowNode.TYPE_ACTION;
        var node = {
            type: nodeType,
            typeName: type,
            x: 100 + Math.random() * 200,
            y: 80 + Math.random() * 150,
            width: 160,
            height: 48,
            label: type.toUpperCase(),
            subtype: SPLODER.FlowNode.defaultsByType[nodeType] ?
                SPLODER.FlowNode.defaultsByType[nodeType][SPLODER.FlowNode.PROPERTY_SUBTYPE] : 1,
            children: [],
        };

        // Set label based on subtype
        if (nodeType === SPLODER.FlowNode.TYPE_TRIGGER) {
            var st = SPLODER.FlowNode.subtypeStrings[1];
            node.label = 'ON ' + (st[node.subtype] || 'start').toUpperCase();
            node.color = '#c03030';
        } else if (nodeType === SPLODER.FlowNode.TYPE_CONDITION) {
            node.label = 'IF ' + (SPLODER.FlowNode.subtypeStrings[2][node.subtype] || 'condition');
            node.color = '#d08020';
        } else if (nodeType === SPLODER.FlowNode.TYPE_ACTION) {
            node.label = 'DO ' + (SPLODER.FlowNode.subtypeStrings[3][node.subtype] || 'action');
            node.color = '#d0a060';
        } else if (nodeType === SPLODER.FlowNode.TYPE_CONTEXT) {
            node.label = 'TELL';
            node.color = '#4080c0';
        } else if (nodeType === SPLODER.FlowNode.TYPE_DELAY) {
            node.label = 'WAIT';
            node.color = '#606080';
        } else if (nodeType === SPLODER.FlowNode.TYPE_LOOP) {
            node.label = 'REPEAT';
            node.color = '#408060';
        }

        flowNodes.push(node);
        redrawFlowCanvas();
        updateFlowReadout();
    }

    function initFlowCanvas(canvas) {
        var container = document.getElementById('flow-canvas-container');
        canvas.width = container.clientWidth || 800;
        canvas.height = container.clientHeight || 400;

        canvas.addEventListener('mousedown', function (e) {
            var rect = canvas.getBoundingClientRect();
            var mx = e.clientX - rect.left;
            var my = e.clientY - rect.top;

            // Check if clicking a node
            for (var i = flowNodes.length - 1; i >= 0; i--) {
                var n = flowNodes[i];
                if (mx >= n.x && mx <= n.x + n.width && my >= n.y && my <= n.y + n.height) {
                    flowDragNode = n;
                    flowDragOffset = { x: mx - n.x, y: my - n.y };

                    if (e.detail === 2) {
                        // Double-click: show picker for this node type
                        if (n.type === SPLODER.FlowNode.TYPE_TRIGGER) {
                            document.getElementById('trigger-picker').style.display = 'block';
                        }
                    }
                    return;
                }
            }
        });

        canvas.addEventListener('mousemove', function (e) {
            if (!flowDragNode) return;
            var rect = canvas.getBoundingClientRect();
            flowDragNode.x = e.clientX - rect.left - flowDragOffset.x;
            flowDragNode.y = e.clientY - rect.top - flowDragOffset.y;
            redrawFlowCanvas();
        });

        canvas.addEventListener('mouseup', function () {
            flowDragNode = null;
        });

        redrawFlowCanvas();
    }

    function redrawFlowCanvas() {
        var canvas = document.getElementById('flow-canvas');
        if (!canvas) return;
        var ctx = canvas.getContext('2d');
        var w = canvas.width, h = canvas.height;

        ctx.clearRect(0, 0, w, h);

        // Background grid
        ctx.strokeStyle = 'rgba(50,80,120,0.15)';
        ctx.lineWidth = 1;
        for (var x = 0; x < w; x += 40) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
        }
        for (var y = 0; y < h; y += 40) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
        }

        // Draw connections
        ctx.strokeStyle = '#4488cc';
        ctx.lineWidth = 3;
        for (var i = 0; i < flowConnections.length; i++) {
            var conn = flowConnections[i];
            var fromNode = conn.from;
            var toNode = conn.to;
            ctx.beginPath();
            ctx.moveTo(fromNode.x + fromNode.width, fromNode.y + fromNode.height * 0.5);
            ctx.bezierCurveTo(
                fromNode.x + fromNode.width + 60, fromNode.y + fromNode.height * 0.5,
                toNode.x - 60, toNode.y + toNode.height * 0.5,
                toNode.x, toNode.y + toNode.height * 0.5
            );
            ctx.stroke();

            // Arrow head
            ctx.fillStyle = '#4488cc';
            ctx.beginPath();
            ctx.moveTo(toNode.x, toNode.y + toNode.height * 0.5);
            ctx.lineTo(toNode.x - 8, toNode.y + toNode.height * 0.5 - 5);
            ctx.lineTo(toNode.x - 8, toNode.y + toNode.height * 0.5 + 5);
            ctx.fill();
        }

        // Draw nodes
        for (var i = 0; i < flowNodes.length; i++) {
            drawFlowNode(ctx, flowNodes[i]);
        }
    }

    function drawFlowNode(ctx, node) {
        var x = node.x, y = node.y, w = node.width, h = node.height;
        var r = 24; // corner radius
        var color = node.color || '#c03030';

        // Node shape (pill/chevron)
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.fill();

        // Shadow
        ctx.shadowColor = 'rgba(0,0,0,0.4)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 2;
        ctx.fill();
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;

        // Icon
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';

        var icon = '⚑';
        if (node.type === SPLODER.FlowNode.TYPE_CONDITION) icon = 'IF';
        else if (node.type === SPLODER.FlowNode.TYPE_ACTION) icon = '⚡';
        else if (node.type === SPLODER.FlowNode.TYPE_CONTEXT) icon = '👤';
        else if (node.type === SPLODER.FlowNode.TYPE_DELAY) icon = '⏱';
        else if (node.type === SPLODER.FlowNode.TYPE_LOOP) icon = '↺';

        ctx.fillText(icon, x + 12, y + h * 0.5);

        // Label
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(node.label, x + 36, y + h * 0.5);

        // Connection ports (right side)
        ctx.fillStyle = '#68aadd';
        ctx.beginPath();
        ctx.arc(x + w, y + h * 0.35, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('A', x + w, y + h * 0.35 + 1);

        if (node.type === SPLODER.FlowNode.TYPE_TRIGGER || node.type === SPLODER.FlowNode.TYPE_CONDITION) {
            ctx.fillStyle = '#68aadd';
            ctx.beginPath();
            ctx.arc(x + w, y + h * 0.65, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#fff';
            ctx.fillText('B', x + w, y + h * 0.65 + 1);
        }

        ctx.textAlign = 'left';
    }

    function updateFlowReadout() {
        var readout = document.getElementById('flow-text');
        if (!readout) return;

        // Build a simple text representation of the flow
        var parts = [];
        for (var i = 0; i < flowNodes.length; i++) {
            var n = flowNodes[i];
            if (n.type === SPLODER.FlowNode.TYPE_TRIGGER) {
                parts.push('<span style="color:#ff4444">ON</span> <span style="color:#44ff44">' +
                    (SPLODER.FlowNode.subtypeStrings[1][n.subtype] || 'start') + '</span>');
            } else if (n.type === SPLODER.FlowNode.TYPE_CONDITION) {
                parts.push('<span style="color:#ffaa00">IF</span> <span style="color:#44ff44">' +
                    (SPLODER.FlowNode.subtypeStrings[2][n.subtype] || 'condition') + '</span>');
            } else if (n.type === SPLODER.FlowNode.TYPE_ACTION) {
                parts.push('<span style="color:#ffaa00">THEN</span> <span style="color:#00aaff">DO</span> <span style="color:#44ff44">' +
                    (SPLODER.FlowNode.subtypeStrings[3][n.subtype] || 'action') + '</span>');
            }
        }
        readout.innerHTML = parts.join(' ') || '<span style="color:#555">Add nodes to build logic</span>';
    }

    /* ----------------------------------------------------------
      10. ITEM PICKER
    ---------------------------------------------------------- */
    function initItemPicker() {
        document.getElementById('item-picker-close').addEventListener('click', hideItemPicker);

        document.querySelectorAll('.ip-tab').forEach(function (tab) {
            tab.addEventListener('click', function () {
                document.querySelectorAll('.ip-tab').forEach(function (t) { t.classList.remove('active'); });
                tab.classList.add('active');
                populateItemPickerGrid(tab.getAttribute('data-itemtype'));
            });
        });
    }

    function showItemPicker() {
        var picker = document.getElementById('item-picker');
        picker.style.display = 'block';
        // Default to the first tab
        var activeTab = picker.querySelector('.ip-tab.active');
        var type = activeTab ? activeTab.getAttribute('data-itemtype') : 'wall';
        populateItemPickerGrid(type);
    }

    function hideItemPicker() {
        document.getElementById('item-picker').style.display = 'none';
    }

    function populateItemPickerGrid(itemType) {
        var grid = document.getElementById('item-picker-grid');
        grid.innerHTML = '';

        // Map item picker tab names to SPLODER.Item types
        var typeMap = {
            'wall': SPLODER.Item.TYPE_WALL,
            'platform': SPLODER.Item.TYPE_PLATFORM,
            'liquid': SPLODER.Item.TYPE_LIQUID,
            'panel': SPLODER.Item.TYPE_PANEL,
            'item': SPLODER.Item.TYPE_ITEM,
            'biped': SPLODER.Item.TYPE_BIPED,
            'light': SPLODER.Item.TYPE_LIGHT
        };
        selectedPlaceType = typeMap[itemType] !== undefined ? typeMap[itemType] : SPLODER.Item.TYPE_WALL;

        // Show/hide size controls based on type
        var propsPanel = document.getElementById('item-picker-props');
        if (propsPanel) {
            var isPointType = (selectedPlaceType === SPLODER.Item.TYPE_ITEM ||
                               selectedPlaceType === SPLODER.Item.TYPE_BIPED ||
                               selectedPlaceType === SPLODER.Item.TYPE_LIGHT);
            propsPanel.style.display = isPointType ? 'none' : 'block';
        }

        if (itemType === 'wall' || itemType === 'platform') {
            // Show tile textures for walls/platforms
            if (TEXTURES.tiles && TEXTURES.tilesAtlas) {
                var frames = TEXTURES.tilesAtlas.frames;
                for (var i = 0; i < frames.length; i++) {
                    (function (idx) {
                        var tile = document.createElement('div');
                        tile.className = 'asset-tile';
                        if (idx === selectedTextureIndex) tile.classList.add('selected');
                        var c = document.createElement('canvas');
                        c.width = frames[idx][2]; c.height = frames[idx][3];
                        var cx = c.getContext('2d');
                        cx.drawImage(TEXTURES.tiles, frames[idx][0], frames[idx][1], frames[idx][2], frames[idx][3], 0, 0, frames[idx][2], frames[idx][3]);
                        tile.appendChild(c);
                        tile.addEventListener('click', function () {
                            selectedTextureIndex = idx;
                            selectedPlaceSubIndex = idx;
                            grid.querySelectorAll('.asset-tile').forEach(function (t) { t.classList.remove('selected'); });
                            tile.classList.add('selected');
                        });
                        grid.appendChild(tile);
                    })(i);
                }
            }
        } else if (itemType === 'liquid') {
            // Show LIQUID textures (not tile textures!)
            if (TEXTURES.liquids && TEXTURES.liquidsAtlas) {
                var frames = TEXTURES.liquidsAtlas.frames;
                for (var i = 0; i < frames.length; i++) {
                    (function (idx) {
                        var tile = document.createElement('div');
                        tile.className = 'asset-tile';
                        if (idx === 0) tile.classList.add('selected');
                        var c = document.createElement('canvas');
                        c.width = 48; c.height = 48;
                        var cx = c.getContext('2d');
                        cx.drawImage(TEXTURES.liquids, frames[idx][0], frames[idx][1], frames[idx][2], frames[idx][3], 0, 0, 48, 48);
                        tile.appendChild(c);
                        tile.addEventListener('click', function () {
                            selectedPlaceSubIndex = idx;
                            grid.querySelectorAll('.asset-tile').forEach(function (t) { t.classList.remove('selected'); });
                            tile.classList.add('selected');
                        });
                        grid.appendChild(tile);
                    })(i);
                }
            } else {
                // Liquid atlas not loaded yet — retry
                setTimeout(function () { populateItemPickerGrid('liquid'); }, 500);
            }
        } else if (itemType === 'item' || itemType === 'panel') {
            // Show item textures
            if (TEXTURES.items && TEXTURES.itemsAtlas) {
                var frames = TEXTURES.itemsAtlas.frames;
                for (var i = 0; i < frames.length; i++) {
                    (function (idx) {
                        var tile = document.createElement('div');
                        tile.className = 'asset-tile';
                        if (idx === 0) tile.classList.add('selected');
                        var c = document.createElement('canvas');
                        var fw = frames[idx][2], fh = frames[idx][3];
                        var maxD = Math.max(fw, fh);
                        c.width = 40; c.height = 40;
                        var cx = c.getContext('2d');
                        var scale = 36 / maxD;
                        var dw = fw * scale, dh = fh * scale;
                        cx.drawImage(TEXTURES.items, frames[idx][0], frames[idx][1], fw, fh,
                                     (40 - dw) / 2, (40 - dh) / 2, dw, dh);
                        tile.appendChild(c);
                        tile.addEventListener('click', function () {
                            selectedPlaceSubIndex = idx;
                            grid.querySelectorAll('.asset-tile').forEach(function (t) { t.classList.remove('selected'); });
                            tile.classList.add('selected');
                        });
                        grid.appendChild(tile);
                    })(i);
                }
            }
        } else if (itemType === 'biped') {
            // Show biped skins
            if (TEXTURES.bipeds && TEXTURES.bipedsAtlas) {
                var frames = TEXTURES.bipedsAtlas.frames;
                for (var i = 0; i < frames.length; i++) {
                    (function (idx) {
                        var tile = document.createElement('div');
                        tile.className = 'asset-tile';
                        if (idx === 0) tile.classList.add('selected');
                        var c = document.createElement('canvas');
                        c.width = 48; c.height = 32;
                        var cx = c.getContext('2d');
                        cx.drawImage(TEXTURES.bipeds, frames[idx][0], frames[idx][1], frames[idx][2], frames[idx][3], 0, 0, 48, 32);
                        tile.appendChild(c);
                        tile.addEventListener('click', function () {
                            selectedPlaceSubIndex = idx;
                            grid.querySelectorAll('.asset-tile').forEach(function (t) { t.classList.remove('selected'); });
                            tile.classList.add('selected');
                        });
                        grid.appendChild(tile);
                    })(i);
                }
            }
        } else if (itemType === 'light') {
            // Light colors
            var colors = SPLODER.Store.LIGHT_COLOR_CHOICES || [0xffffff, 0xffcc33, 0xff6600, 0xff0000, 0xff00ff, 0x9933ff, 0x0033ff, 0x00ccff, 0x00ff00];
            for (var i = 0; i < colors.length; i++) {
                (function (idx) {
                    var tile = document.createElement('div');
                    tile.className = 'asset-tile';
                    if (idx === 0) tile.classList.add('selected');
                    tile.style.backgroundColor = '#' + ('000000' + colors[idx].toString(16)).slice(-6);
                    tile.style.width = '40px';
                    tile.style.height = '40px';
                    tile.style.borderRadius = '50%';
                    tile.style.margin = '4px';
                    tile.style.boxShadow = '0 0 12px ' + '#' + ('000000' + colors[idx].toString(16)).slice(-6);
                    tile.addEventListener('click', function () {
                        selectedPlaceSubIndex = idx;
                        grid.querySelectorAll('.asset-tile').forEach(function (t) { t.classList.remove('selected'); });
                        tile.classList.add('selected');
                    });
                    grid.appendChild(tile);
                })(i);
            }
        }
    }

    /* ----------------------------------------------------------
      11. BIPED EDITOR
    ---------------------------------------------------------- */

    // Map slider data-prop names to SPLODER.Biped.PROPERTY_ constants
    var bipedPropMap = {
        'weight':     function () { return SPLODER.Biped.PROPERTY_WEIGHT; },
        'gender':     function () { return SPLODER.Biped.PROPERTY_GENDER; },
        'headheight': function () { return SPLODER.Biped.PROPERTY_HEADSIZE; },
        'height':     function () { return SPLODER.Biped.PROPERTY_HEIGHT; },
        'strength':   function () { return SPLODER.Biped.PROPERTY_STRENGTH; },
        'beastly':    function () { return SPLODER.Biped.PROPERTY_BEASTLY; },
    };

    function showBipedTabForItem(item) {
        // Auto-switch the bottom panel to the biped tab
        document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
        var bipedTabBtn = document.querySelector('.tab-btn[data-tab="biped"]');
        if (bipedTabBtn) bipedTabBtn.classList.add('active');
        document.querySelectorAll('.tab-content').forEach(function (c) {
            c.classList.remove('active');
            c.style.display = 'none';
        });
        var bipedContent = document.querySelector('.tab-content[data-tab="biped"]');
        if (bipedContent) {
            bipedContent.classList.add('active');
            bipedContent.style.display = 'flex';
        }

        // Read the biped's current properties into the sliders
        populateBipedSlidersFromItem(item);
    }

    function hideBipedTab() {
        // Don't force-hide — just leave whatever tab is active. The biped sliders
        // will show a "no biped selected" message if the tab is opened manually.
        updateBipedNoSelection();
    }

    function populateBipedSlidersFromItem(item) {
        if (!item || item.type !== SPLODER.Item.TYPE_BIPED) return;

        Object.keys(bipedPropMap).forEach(function (key) {
            var slider = document.querySelector('#biped-sliders [data-prop="' + key + '"]');
            if (slider) {
                var propId = bipedPropMap[key]();
                var val = item.getAttrib(propId);
                if (val < 0) val = 128; // default
                slider.value = val;
                var label = slider.parentNode.querySelector('.slider-val');
                if (label) label.textContent = Math.round(val / 2.55);
            }
        });

        // Show the sliders, hide "no biped" message
        var slidersEl = document.getElementById('biped-sliders');
        var noSelMsg = document.getElementById('biped-no-selection');
        if (slidersEl) slidersEl.style.display = '';
        if (noSelMsg) noSelMsg.style.display = 'none';

        // Update preview
        updateBipedPreview();
    }

    function updateBipedNoSelection() {
        var noSelMsg = document.getElementById('biped-no-selection');
        var hasBiped = game && game.model && game.model.hasSelection(1) &&
                       game.model.selection[0].type === SPLODER.Item.TYPE_BIPED;
        if (noSelMsg) noSelMsg.style.display = hasBiped ? 'none' : '';
        var slidersEl = document.getElementById('biped-sliders');
        if (slidersEl) slidersEl.style.opacity = hasBiped ? '1' : '0.4';
    }

    function updateBipedFromSliders() {
        // Write slider values back to the selected biped item
        if (!game || !game.model || !game.model.hasSelection(1)) return;
        var item = game.model.selection[0];
        if (item.type !== SPLODER.Item.TYPE_BIPED) return;

        game.model.saveUndo();
        Object.keys(bipedPropMap).forEach(function (key) {
            var slider = document.querySelector('#biped-sliders [data-prop="' + key + '"]');
            if (slider) {
                var propId = bipedPropMap[key]();
                item.setAttrib(propId, parseInt(slider.value));
            }
        });
        game.model.changed.dispatch(SPLODER.ACTION_CHANGE, [item]);

        // Update preview
        updateBipedPreview();
    }

    function updateBipedPreview() {
        var canvas = document.getElementById('biped-preview-canvas');
        if (!canvas) return;
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 200, 200);

        var weightSlider = document.querySelector('[data-prop="weight"]');
        var genderSlider = document.querySelector('[data-prop="gender"]');
        var headHSlider = document.querySelector('[data-prop="headheight"]');
        var heightSlider = document.querySelector('[data-prop="height"]');
        var strengthSlider = document.querySelector('[data-prop="strength"]');
        var beastlySlider = document.querySelector('[data-prop="beastly"]');

        var weight = weightSlider ? parseInt(weightSlider.value) / 255 : 0.5;
        var gender = genderSlider ? parseInt(genderSlider.value) / 255 : 0.5;
        var headH = headHSlider ? parseInt(headHSlider.value) / 255 : 0.5;
        var height = heightSlider ? parseInt(heightSlider.value) / 255 : 0.5;
        var strength = strengthSlider ? parseInt(strengthSlider.value) / 255 : 0.5;
        var beastly = beastlySlider ? parseInt(beastlySlider.value) / 255 : 0;

        // Simple voxel-style character preview
        var cx = 100, cy = 180;
        var bodyW = 30 + weight * 30;
        var bodyH = 50 + height * 30;
        var headSize = 20 + headH * 15;
        var armW = 10 + strength * 10;
        var beastFactor = beastly;

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.beginPath();
        ctx.ellipse(cx, cy, bodyW * 0.6, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Skin tone varies with gender slider (just for visual variety)
        var skinR = Math.round(180 + gender * 40);
        var skinG = Math.round(140 + gender * 30);
        var skinB = Math.round(100 + gender * 20);
        var skinColor = 'rgb(' + skinR + ',' + skinG + ',' + skinB + ')';

        // Legs
        ctx.fillStyle = '#6644aa';
        ctx.fillRect(cx - bodyW * 0.3, cy - bodyH * 0.45, armW * 0.8, bodyH * 0.45);
        ctx.fillRect(cx + bodyW * 0.1, cy - bodyH * 0.45, armW * 0.8, bodyH * 0.45);

        // Body
        var bodyColor = beastFactor > 0.3 ? '#558844' : '#44aa66';
        ctx.fillStyle = bodyColor;
        ctx.fillRect(cx - bodyW * 0.5, cy - bodyH, bodyW, bodyH * 0.55);

        // Arms
        ctx.fillStyle = skinColor;
        ctx.fillRect(cx - bodyW * 0.5 - armW, cy - bodyH * 0.95, armW, bodyH * 0.5);
        ctx.fillRect(cx + bodyW * 0.5, cy - bodyH * 0.95, armW, bodyH * 0.5);

        // Neck
        ctx.fillStyle = skinColor;
        ctx.fillRect(cx - 6, cy - bodyH - 10, 12, 14);

        // Head
        ctx.fillStyle = skinColor;
        var headW = headSize * (1 + beastFactor * 0.3);
        ctx.fillRect(cx - headW * 0.5, cy - bodyH - headSize - 5, headW, headSize);

        // Eyes
        ctx.fillStyle = '#fff';
        ctx.fillRect(cx - headW * 0.3, cy - bodyH - headSize + headSize * 0.3, headSize * 0.2, headSize * 0.2);
        ctx.fillRect(cx + headW * 0.1, cy - bodyH - headSize + headSize * 0.3, headSize * 0.2, headSize * 0.2);
        ctx.fillStyle = beastFactor > 0.5 ? '#ff2200' : '#000';
        ctx.fillRect(cx - headW * 0.25, cy - bodyH - headSize + headSize * 0.35, headSize * 0.1, headSize * 0.1);
        ctx.fillRect(cx + headW * 0.15, cy - bodyH - headSize + headSize * 0.35, headSize * 0.1, headSize * 0.1);

        // Hair / horns for beastly
        if (beastFactor > 0.4) {
            ctx.fillStyle = '#884400';
            ctx.beginPath();
            ctx.moveTo(cx - headW * 0.4, cy - bodyH - headSize - 5);
            ctx.lineTo(cx - headW * 0.2, cy - bodyH - headSize - 20);
            ctx.lineTo(cx, cy - bodyH - headSize - 5);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(cx, cy - bodyH - headSize - 5);
            ctx.lineTo(cx + headW * 0.2, cy - bodyH - headSize - 20);
            ctx.lineTo(cx + headW * 0.4, cy - bodyH - headSize - 5);
            ctx.fill();
        } else {
            ctx.fillStyle = '#aa5500';
            ctx.fillRect(cx - headW * 0.55, cy - bodyH - headSize - 5, headW * 1.1, headSize * 0.25);
        }
    }

    /* ----------------------------------------------------------
      12. SELECTION INFO
    ---------------------------------------------------------- */
    function updateSelectionInfo() {
        var count = game && game.model ? game.model.selection.length : 0;
        document.getElementById('sel-count').textContent = count;

        if (count === 0) {
            document.getElementById('sel-type').textContent = 'items';
        } else if (count === 1) {
            var item = game.model.selection[0];
            var type = SPLODER.Item.typeStrings[item.type] || 'item';
            document.getElementById('sel-type').textContent = type;
        } else {
            document.getElementById('sel-type').textContent = 'items';
        }
    }

    /* ----------------------------------------------------------
      13. KEYBOARD SHORTCUTS
    ---------------------------------------------------------- */
    function initKeyboardShortcuts() {
        document.addEventListener('keydown', function (e) {
            // Don't capture when focused on inputs
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            if (e.ctrlKey || e.metaKey) {
                switch (e.key.toLowerCase()) {
                    case 'z': e.preventDefault(); handleMenuAction('undo'); break;
                    case 'y': e.preventDefault(); handleMenuAction('redo'); break;
                    case 'c': e.preventDefault(); handleMenuAction('copy'); break;
                    case 'v': e.preventDefault(); handleMenuAction('paste'); break;
                    case 'a': e.preventDefault(); handleMenuAction('selectall'); break;
                    case 'x': e.preventDefault(); handleMenuAction('copy'); handleMenuAction('delete'); break;
                }
                return;
            }

            switch (e.key) {
                case 'Delete':
                case 'Backspace':
                    handleMenuAction('delete');
                    break;
                case 'Escape':
                    handleMenuAction('deselect');
                    closeAllMenus();
                    hideItemPicker();
                    document.getElementById('flow-overlay').style.display = 'none';
                    document.getElementById('trigger-picker').style.display = 'none';
                    hidePropertiesPanel();
                    break;
                case 'd':
                    setTool('draw');
                    break;
                case 's':
                    setTool('select');
                    break;
                case 'p':
                    setTool('place');
                    break;
                case 'f':
                    document.getElementById('flow-overlay').style.display = 'flex';
                    break;
                case '+':
                case '=':
                    MAP.zoom = Math.min(4, MAP.zoom + 0.2);
                    redrawMap();
                    break;
                case '-':
                    MAP.zoom = Math.max(0.2, MAP.zoom - 0.2);
                    redrawMap();
                    break;
            }
        });
    }

    function setTool(tool) {
        currentTool = tool;
        document.querySelectorAll('.tool-btn').forEach(function (b) { b.classList.remove('active'); });
        var btn = document.querySelector('.tool-btn[data-tool="' + tool + '"]');
        if (btn) btn.classList.add('active');
        if (tool === 'place') showItemPicker();
        else hideItemPicker();
    }

    /* ----------------------------------------------------------
      14. PAINT CANVAS (Simple 2D pixel editor)
    ---------------------------------------------------------- */
    var paintState = { drawing: false, color: '#ffffff', tool: 'pencil', lastX: -1, lastY: -1 };
    var PAINT_GRID = 16; // 16x16 pixel canvas

    setTimeout(function () {
        updateBipedPreview();
        updateSurfacePreview(0);
        initPaintCanvas();
    }, 1000);

    function initPaintCanvas() {
        var canvas = document.getElementById('paint-canvas');
        if (!canvas) return;

        var ctx = canvas.getContext('2d');
        var pixelSize = Math.floor(canvas.width / PAINT_GRID);

        // Initialize with transparency check pattern
        drawPaintGrid(ctx, canvas.width, canvas.height, pixelSize);

        canvas.addEventListener('mousedown', function (e) {
            paintState.drawing = true;
            paintAtPixel(e, ctx, canvas, pixelSize);
        });
        canvas.addEventListener('mousemove', function (e) {
            if (paintState.drawing) paintAtPixel(e, ctx, canvas, pixelSize);
        });
        canvas.addEventListener('mouseup', function () { paintState.drawing = false; });
        canvas.addEventListener('mouseleave', function () { paintState.drawing = false; });

        // Paint tool selection
        document.querySelectorAll('.paint-tool').forEach(function (btn) {
            btn.addEventListener('click', function () {
                document.querySelectorAll('.paint-tool').forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                paintState.tool = btn.getAttribute('data-paint');
            });
        });
    }

    function drawPaintGrid(ctx, w, h, ps) {
        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#2a2a3a';
        for (var y = 0; y < PAINT_GRID; y++) {
            for (var x = 0; x < PAINT_GRID; x++) {
                if ((x + y) % 2 === 0) {
                    ctx.fillRect(x * ps, y * ps, ps, ps);
                }
            }
        }
    }

    function paintAtPixel(e, ctx, canvas, pixelSize) {
        var rect = canvas.getBoundingClientRect();
        var mx = e.clientX - rect.left;
        var my = e.clientY - rect.top;
        var gx = Math.floor(mx / pixelSize);
        var gy = Math.floor(my / pixelSize);

        if (gx < 0 || gy < 0 || gx >= PAINT_GRID || gy >= PAINT_GRID) return;

        if (paintState.tool === 'pencil') {
            ctx.fillStyle = activePaintColor;
            ctx.fillRect(gx * pixelSize, gy * pixelSize, pixelSize, pixelSize);
        } else if (paintState.tool === 'eraser') {
            ctx.clearRect(gx * pixelSize, gy * pixelSize, pixelSize, pixelSize);
            // Redraw checker for this cell
            ctx.fillStyle = (gx + gy) % 2 === 0 ? '#2a2a3a' : '#222';
            ctx.fillRect(gx * pixelSize, gy * pixelSize, pixelSize, pixelSize);
        }
    }

    /* ----------------------------------------------------------
      15. LEVEL SELECTOR
    ---------------------------------------------------------- */
    (function () {
        var badge = document.getElementById('level-badge');
        if (badge) {
            badge.addEventListener('click', function () {
                var maxLevels = 10;
                currentLevel = (currentLevel + 1) % maxLevels;
                badge.textContent = currentLevel + 1;

                // Switch level context if levels model supports it
                if (game && game.levels) {
                    game.levels.currentLevel = currentLevel;
                } else if (game && game.envModel) {
                    game.envModel.currentLevel = currentLevel;
                }
                redrawMap();
            });
        }
    })();

    /* ----------------------------------------------------------
      16. AUTO-CAMERA TOGGLE
    ---------------------------------------------------------- */
    (function () {
        var btn = document.getElementById('btn-auto-camera');
        if (btn) {
            btn.addEventListener('click', function () {
                btn.classList.toggle('active');
                if (game && game.gameView) {
                    game.gameView.autoCamera = btn.classList.contains('active');
                }
            });
        }
    })();

})();

