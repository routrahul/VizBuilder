(function () {'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var electron = require('electron');
var jetpack = _interopDefault(require('fs-jetpack'));

function createWindow (name, options) {

    var userDataDir = jetpack.cwd(electron.app.getPath('userData'));
    var stateStoreFile = 'window-state-' + name +'.json';
    var defaultSize = {
        width: options.width,
        height: options.height
    };
    var state = {};
    var win;

    var restore = function () {
        var restoredState = {};
        try {
            restoredState = userDataDir.read(stateStoreFile, 'json');
        } catch (err) {
            // For some reason json can't be read (might be corrupted).
            // No worries, we have defaults.
        }
        return Object.assign({}, defaultSize, restoredState);
    };

    var getCurrentPosition = function () {
        var position = win.getPosition();
        var size = win.getSize();
        return {
            x: position[0],
            y: position[1],
            width: size[0],
            height: size[1]
        };
    };

    var windowWithinBounds = function (windowState, bounds) {
        return windowState.x >= bounds.x &&
            windowState.y >= bounds.y &&
            windowState.x + windowState.width <= bounds.x + bounds.width &&
            windowState.y + windowState.height <= bounds.y + bounds.height;
    };

    var resetToDefaults = function (windowState) {
        var bounds = electron.screen.getPrimaryDisplay().bounds;
        return Object.assign({}, defaultSize, {
            x: (bounds.width - defaultSize.width) / 2,
            y: (bounds.height - defaultSize.height) / 2
        });
    };

    var ensureVisibleOnSomeDisplay = function (windowState) {
        var visible = electron.screen.getAllDisplays().some(function (display) {
            return windowWithinBounds(windowState, display.bounds);
        });
        if (!visible) {
            // Window is partially or fully not visible now.
            // Reset it to safe defaults.
            return resetToDefaults(windowState);
        }
        return windowState;
    };

    var saveState = function () {
        if (!win.isMinimized() && !win.isMaximized()) {
            Object.assign(state, getCurrentPosition());
        }
        userDataDir.write(stateStoreFile, state, { atomic: true });
    };

    state = ensureVisibleOnSomeDisplay(restore());

    win = new electron.BrowserWindow(Object.assign({}, options, state));

    win.on('close', saveState);

    return win;
}

var app$1;
if (process.type === 'renderer') {
    app$1 = require('electron').remote.app;
} else {
    app$1 = require('electron').app;
}
var appDir = jetpack.cwd(app$1.getAppPath());

var manifest = appDir.read('package.json', 'json');

var env = manifest.env;

var session;
electron.app.on('ready', function () {
    // setApplicationMenu();

    var mainWindow = createWindow('main', {
        width: 1800,
        height: 750
    });

    mainWindow.loadURL('file://' + __dirname + '/index.html');
    session = require('electron').session;
    // console.log(mainWindow.webContents.session);
    // var ses = session.fromPartition('persist:name');

    // var cookie = {url: 'http://www.analytics.walmart.com', name: 'first_time',
    //   value: 'true',expirationDate:1527678562,httpOnly:false
    // };
    //
    //
    // session.defaultSession.cookies.get({'http://www.analytics.walmart.com'}, function(error, cookies){
    //   if(cookies.length == 0){
    //     session.defaultSession.cookies.set(cookie, function(error) {
    //       if (error)
    //         console.error(error);
    //     });
    //
    //   }
    // });



    // ses.cookies.set({
    //   url:"http://analytics-blr.walmart.com",
    //   name:"VizCreator",
    //   value:"True"
    // }, function(data){
    //   console.log(data);
    // });

    if (env.name !== 'production') {
        mainWindow.openDevTools();
    }
});

electron.app.on('window-all-closed', function () {
    electron.app.quit();
});
}());
//# sourceMappingURL=background.js.map