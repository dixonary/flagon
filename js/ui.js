let loaded;
let files;
let codemirror;
let updateTimer;
window.activeDir = "";

const prompt = require('electron-prompt');
const {shell, ipcRenderer} = require('electron');

// Open links externally by default
$(document).on('click', 'a[href^="http"]', function(event) {
    event.preventDefault();
    shell.openExternal(this.href);
});

// On loaded:
$(function(){
    codemirror = CodeMirror.fromTextArea($(".editor").get(0), {mode:"gfm", lineWrapping:true});

    $(".CodeMirror").keyup(function(e) {
        if(updateTimer) clearTimeout(updateTimer);
        updateTimer = setTimeout(doSave,500);

        rerender();
    });

    // Load active directory from local storage
    activeDir = window.localStorage.getItem("activeDir");
    if(activeDir != undefined) {
        ipcRenderer.send("activeDir", activeDir);
    }

    // Capture pageup and pagedown
    $("body").keydown(function(e) {
        console.log(e.keyCode);
        // Page down
        if(e.keyCode == 34) {
            e.preventDefault();
            let tops = $(".page").map(function(){return $(this).offset().top});
            let i;
            for(i=0; i<tops.length;i++) {
                if(tops[i] > 0) break;
            }
            if(i>=tops.length-1) return;
    		$(".result-container").animate({scrollTop: $(`.page:eq(${i+1})`).position().top}, 200);
        }
        // Page up
        if(e.keyCode == 33) {
            e.preventDefault();
            let tops = $(".page").map(function(){return $(this).offset().top});
            let i;
            for(i=0; i<tops.length;i++) {
                if(tops[i] > 0) break;
            }
            if(i>=tops.length) return;
            if(i<=0) return;
    		$(".result-container").animate({scrollTop: $(`.page:eq(${i-1})`).position().top}, 200);
        }
    });

});

function doSave() {
    ipcRenderer.send("saveData", codemirror.getValue());
}

function rerender() {
    var data = codemirror.getValue();
    data = convert(data, window.activeDir);
    $(".book").html(data);
}

// Set hook for resizing the right pane!
$(function(){
    $(window).mousemove(scale);
    $( window ).resize(scale);


    setTimeout(function() {
        rerender();

        // Resize right pane so it shows front page only
        let ph = $(".page").outerHeight();
        let pw = $(".page").outerWidth();
        let rh = parseInt($(".result-container").height())+45;
        let aw = $(window).width();
        $(".CodeMirror").width(aw-(rh/ph*pw));

        scale();
    },30);

});

function scale() {

    let pw = $(".page").outerWidth();
    let ph = $(".page").outerHeight();
    let pages = $(".page").length;

    let rw = $(".result-container").width()-40;

    let newtrans = `scale(${rw/pw})`;

    var newPx = "-"+(ph*pages*(1-(rw/pw)))+"px";

    $(".book").css({"transform":newtrans, "margin-bottom":newPx});

}

function insertTable() {

    let table_w;
    let table_h;

    prompt({
        title:"How many columns?",
        label:'Columns:',
        value:2,
        inputAttrs: {type:'integer'}
    }).then(insertTableW);

    function insertTableW(w) {
        if(w == NaN || w == null || w < 1 || w > 20) return false;
        table_w = w;

        prompt({
            title:"How many rows? (not including header row)",
            label:'Rows:',
            value:10,
            inputAttrs: {type:'integer'}
        }).then(insertTableH);
    }

    function insertTableH(h) {
        if(h == NaN || h == null || h < 1 || h > 20) return false;
        table_h = h;

        let table = ``;
        let tableRows = [];
        for(var j=0; j<parseInt(table_h)+2; j++) { tableRows[j] = "|"; }

        for(var i=0; i<table_w; i++) {
            tableRows[0] += " Heading |";
            tableRows[1] += ":-------:|";
            for(var j=0; j<table_h; j++) {
            tableRows[j+2]+=" elem    |";
            }
        }

        table = `\n${tableRows.join("\n")}\n`;

        codemirror.replaceSelection(table);
        rerender();
    }
}

function insertRollTable() {

    let table_h;
    let table_h2;

    prompt({
        title:"What's the highest number?",
        label:'Highest number:',
        value:20,
        inputAttrs: {type:'integer'}
    }).then(insertRollTableH);

    function insertRollTableH(h) {
        if(isNaN(h) || h == null || h < 1 || h > 10000) h = 20;

        table_h = parseInt(h);

        prompt({
            title:"What's the starting number?",
            label:'Starting number:',
            value:1,
            inputAttrs: {type:'integer'}
        }).then(insertRollTableH2);
    }

    function insertRollTableH2(h2) {
        if(isNaN(h2) || h2 == null || h2 < 1 || h2 > 10000) h2 = 1;
        table_h2 = parseInt(h2);

        let table = ``;
        let tableRows = [
            `| d${table_h} | Result |`,
            `|:---:|:-------|`,
        ];

        var maxNumLen = (""+table_h).length;

        for(var j=table_h2; j<=table_h; j++) {
            var numLen = (""+j).length;
            var spaces = "";
            for(var i=0; i<(maxNumLen - numLen); i++) spaces += " ";
            tableRows.push(`| ${spaces}${j}  | Result`);
        }

        table = `\n${tableRows.join("\n")}\n`;

        codemirror.replaceSelection(table);
        rerender();
    }
}

function insertClassTable() {
    codemirror.replaceSelection(templates.classTable);
    rerender();
}

ipcRenderer.on('insertTemplate', function(e,arg) {
    switch(arg) {
        case 'table':insertTable(); break;
        case 'rollTable':insertRollTable(); break;
        case 'classTable':insertClassTable(); break;
        default:
            codemirror.replaceSelection(templates[arg]);
            rerender();
            break;
    }
});

ipcRenderer.on('activeDir', function(e,arg) {
    window.localStorage.setItem('activeDir', arg);

    console.log(`Setting active dir to ${arg}`)
});

ipcRenderer.on('loadData', function(e,data) {
    console.log(data);
    codemirror.setValue(data);
    rerender();
});

// TODO
ipcRenderer.on("requestHTML", function(e,arg) {
    console.log("HTML export requested");
    var data = codemirror.getValue();
    data = convert(data, "");
    ipcRenderer.send("responseHTML", data);
});
