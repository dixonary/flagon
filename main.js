const {app, BrowserWindow, Menu, ipcMain, dialog, shell} = require('electron')
const fs = require('fs');
const path = require('path');
const prompt = require('electron-prompt');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
var activeDir

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({width: 800, height: 600})

    // and load the index.html of the app.
    win.loadFile('index.html');

    // Emitted when the window is closed.
    win.on('closed', () => {
        win = null
    });

    ipcMain.on('activeDir', function(e, data) {
        console.log(`received "${data}" from ipc`);
        loadDir(win, data);
    });

    win.toggleDevTools();
    win.maximize();


    // Context menus?
    const selectionMenu = Menu.buildFromTemplate([
       {role: 'copy'},
       {type: 'separator'},
       {role: 'selectall'},
     ])

     const inputMenu = Menu.buildFromTemplate([
       {role: 'undo'},
       {role: 'redo'},
       {type: 'separator'},
       {role: 'cut'},
       {role: 'copy'},
       {role: 'paste'},
       {type: 'separator'},
       {role: 'selectall'},
     ])

     win.webContents.on('context-menu', (e, props) => {
       const { selectionText, isEditable } = props;
       if (isEditable) {
         inputMenu.popup(win);
       } else if (selectionText && selectionText.trim() !== '') {
         selectionMenu.popup(win);
       }
     })
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // Close on all but OSX
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // Open if there are no windows
    if (win === null) {
        createWindow()
    }
})

function open(win) {
    console.log("Open: Popping dialog");
    dialog.showOpenDialog(win,
    {
        title:'Open a Flagon',
        properties:['openDirectory'],
        filters:[{name:'Flagons',extensions:'flagon'}]
    }, function(dirname) {
        if(!dirname) {
            console.log("Open: No directory name - giving up");
            return;
        }

        console.log("Open: Opening flagon:");
        console.log(dirname[0]);

        // Check if the directory contains main.flagon
        if(!fs.existsSync(`${dirname[0]}/main.flagon`)) {
            console.log("Open: main.flagon doesn't exist");
            return;
        }

        // Load the folder, render, etc
        loadDir(win, dirname[0]);

    });
}

// Make sure this function is run on a valid directory!
function loadDir(win, dirname) {
    console.log(dirname);
    activeDir = dirname;

    flagonData = fs.readFileSync(`${activeDir}/main.flagon`, 'utf8');
    win.webContents.send("activeDir", activeDir);
    win.webContents.send("loadData", flagonData);

    win.setTitle(`${activeDir} - Flagon`);
}

function exportPDF(win) {
    win.webContents.printToPDF(
    {
        landscape:false,
        marginsType:1,
        printBackground:true,
        printSelectionOnly:false,
        pageSize:"A4"
    },
    function(err,data) {
        if(err) {
            //An error occurred with printing fam
            console.log("Print: An error occurred with rendering:");
            console.log(err);
            return;
        }

        try {
            dialog.showSaveDialog(win, {
                title:"Export as PDF",
                defaultPath:`${activeDir}/export.pdf`
            }, function(fn){
                if(!fn) {
                    console.log("PDF export: No file name - giving up");
                    return;
                }
                fs.writeFileSync(fn, data);
                shell.openItem(fn);
            });
        }
        catch (err) {
            console.log("PDF export: An error occurred with saving:");
            console.log(err);
        }
    });
}

function exportHTML(win) {
    win.webContents.send("requestHTML");
}

ipcMain.on("responseHTML", function(e, data) {
    try {
        dialog.showSaveDialog(win, {
            title:"Export as HTML",
            defaultPath:`${activeDir}/export.html`
        }, function(fn){
            if(!fn) {
                console.log("HTML export: No file name - giving up");
                return;
            }
            fs.writeFileSync(fn, data);
            shell.openItem(fn);
        });
    }
    catch (err) {
        console.log("HTML export: An error occurred with saving:");
        console.log(err);
    }
});

function newFlagon(win) {
    dialog.showOpenDialog(win,
    {
        title:'Choose Directory',
        properties:['openDirectory']
    },
    function(data) {
        if(data == "") return;


        function makeDir(dirName) {
            if(dirName == "") return;
            fs.mkdirSync(`${data}/${dirName}`);
            populate(`${data}/${dirName}`);
        }

        function populate(dir) {
            fs.writeFileSync(`${dir}/main.flagon`, "```title-page\n# Title\n## Subtitle\n```");
            loadDir(win, `${dir}`);
        }

        var files = fs.readdirSync(`${data}`);
        if(files.length == 0) {
            populate(`${data}`);
        }
        else {
            prompt({
                title:"What to call the new Flagon?",
                label:'Flagon name:',
                value:"",
            }).then(makeDir);
        }

    });
}

function save(data) {
    console.log("Saving...");
    if(!activeDir) {
        console.log("Save: no active directory is set!");
        return;
    }

    fs.writeFileSync(`${activeDir}/main.flagon`, data);
}

ipcMain.on('saveData', function(e, data) {
    save(data);
});


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const menuTemplate = [
    {
        label:'File',
        submenu: [
            {label:'New Flagon', accelerator:'CmdorCtrl+N', click () {newFlagon(win); } },
            {label:'Open Flagon...', accelerator:'CmdorCtrl+O', click () { open(win); } },
            {label:'Export', submenu:[
                {label:"to PDF...", accelerator:'CmdorCtrl+P', click () { exportPDF(win); } },
                // TODO {label:"to HTML...", accelerator:'CmdorCtrl+E', click () { exportHTML(win); } },
            ]},
            {label:'Close Window', role:'close'},
            {label:'Quit', role:'quit'}
        ]
    },
    {
        label:'Edit',
        submenu: [
            {label:'Undo', role:'undo'},
            {label:'Redo', role:'redo'}
        ]
    },
    {
        label:'Templates',
        submenu: [
            {label:'Generic Table...', click () { win.webContents.send('insertTemplate','table'); } },
            {label:'Dice Roll Table...', click () { win.webContents.send('insertTemplate','rollTable');  } } ,
            {label:'Class Table', click () { win.webContents.send('insertTemplate','classTable'); } },
            {type:'separator'},
            {label:'Spell', click () { win.webContents.send('insertTemplate','spell');} },
            {type:'separator'},
            {label:'Monster Stat Block', click () { win.webContents.send('insertTemplate','statBlock');} },
            {label:'Monster Stat Block (large)', click () { win.webContents.send('insertTemplate','statBlockLarge');} }
        ]
    },
    {
        label:'Snippets',
        submenu: [
            {label:'Disable dual page footers', click () { win.webContents.send('insertTemplate','noDualFooters'); } }
        ]
    }
]
const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);
