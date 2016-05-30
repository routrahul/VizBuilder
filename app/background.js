// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import { app, Menu } from 'electron';
import { devMenuTemplate } from './helpers/dev_menu_template';
import { editMenuTemplate } from './helpers/edit_menu_template';
import createWindow from './helpers/window';

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from './env';

var mainWindow,session;

var setApplicationMenu = function () {
    var menus = [editMenuTemplate];
    if (env.name !== 'production') {
        menus.push(devMenuTemplate);
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

app.on('ready', function () {
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

app.on('window-all-closed', function () {
    app.quit();
});
