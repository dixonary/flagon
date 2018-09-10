// The heavy lifting function.

// Helper functions
const NEWPAGE = `<div class="page">`;
const ENDPAGE = `</div>`;
const mods    = `((?:(?:noindent|wide|wider|spell-slots|table-title|section-start|front-page) ?)*)`
const moddable = `(div|p|table|h1|h2|h3|h4|h5|h6|img|em|strong|li)`

// A list of replacements which repeat until they no longer need doing.
const iter_replacements = [

    // Remove surrounding paragraph tags
    { before: [`<p>`,`<(.*)>`,`</p>`], after: `<$1>` },

    { before: [`<${mods}>`,`<${moddable}(?: class="([^\"]*)")?`], after: `<$2 class="$1 $3"` },
    { before: [`<${moddable}(?: class="([^\"]*)")?( [^>]*)?>`,`<${mods}>`], after: `<$1 class="$2 $4" $3>` },

    { before: [`<h2 (.*)>(.*)<\/h2>`,`<table`], after: `<p class="table-title" $1>$2</p><table` },

];

function convert(data, percentages) {

    data = converter.makeHtml(data);
    //data = md.render(data);

    data = `<div class="page first"> ${data} ${ENDPAGE}`

    data = data.replaceAllGaps([`<li>([^…]*)…([0-9]*)<`], `<li><p>$1<span style="toc-number">$2</span></p><`);

    data = data.replaceAll(`src="%`, `src="${percentages}/`);
    data = data.replaceAll(`url\\("%`, `url("${percentages}/`);


    var counter = 0;
    var oldData;
    do {
        //console.log("ITER " + counter);
        console.log(data);
        counter++;
        oldData = data;
        for(var repl of iter_replacements) {
            data = data.replaceAllGaps(repl.before, repl.after);
        }
    } while(oldData != data && counter < 5);

    console.log(data);

   return data;
}

showdown.setFlavor('github');
showdown.setOption('openLinksInNewWindow', true);
showdown.setOption('simpleLineBreaks', false);
var converter = new showdown.Converter({ extensions: [flagonExts] });

// Extensions to the default behaviour of showdown.
function flagonExts () {
    let exts = [
        { // Encode page breaks
            type:'output',
            regex:/<p>\s*<pagebreak>\s*<\/p>/g,
            replace:`${ENDPAGE}${NEWPAGE}`
        },{ // Encode column breaks
            type:'output',
            regex:/<p>\s*<columnbreak>\s*<\/p>/g,
            replace:`<div class="columnbreak"></div>`
        },{ // Replace code blocks with divs
            type:'output',
            regex:/<pre/g,
            replace:`<div`
        },{ // Replace code blocks with divs
            type:'output',
            regex:/<\/pre/g,
            replace:`</div`
        },{ // Replace code blocks with divs
            type:'lang',
            regex:/```(.*)([^\`]*)```/g,
            replace:`<div class="$1" markdown="1">$2</div>`
        },{ // Replace code blocks with divs
            type:'lang',
            regex:/~(.*)/g,
            replace:`<p class="outdent" markdown="1">$1</p>`
        }
    ];

    return exts;
}

// Replace instances, allowing for any number of spaces in between segments.
String.prototype.replaceAllGaps = function(searches, replacement) {
    var target = this;
    let search = searches.join(`[\\s]*`);
    return target.replaceAll(new RegExp(search, 'g'), replacement);
};

// Replace all instances.
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
