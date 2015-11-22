var myWorker = new Worker("/afx/resource/js/webworker.js");
myWorker.onmessage = function (e) {

    var data = e.data;

    if (data.type == "log") {
        afx.log(data.message);
    } else {
        afx.completeWebWorker(data);
    }

};

myWorker.onerror = function (e) {
    afx.log(e);
};

myWorker.postMessage();

function getOption(options) {
    return Opal.hash(JSON.parse(options));
}

var fillOutAction = new BufferedAction();
function convertAsciidoc(taskId, content, options) {

    var message = {
        func: arguments.callee.name,
        taskId: taskId,
        content: content,
        options: options
    };

    console.log("Gitti ", message);
    myWorker.postMessage(message);
}

function convertOdf(content, options) {

    var doc = Opal.Asciidoctor.$load(content, getOption(options));

    return doc.$convert();
}

function convertHtml(content, options) {

    var doc = Opal.Asciidoctor.$load(content, getOption(options));

    return {
        rendered: doc.$render(),
        doctype: doc.doctype,
        backend: doc.$backend()
    };
}

function convertDocbook(content, options) {

    var doc = Opal.Asciidoctor.$load(content, getOption(options));

    return {
        rendered: doc.$render(),
        doctype: doc.doctype,
        backend: doc.$backend()
    };
}

function findRenderedSelection(content) {
    return Opal.Asciidoctor.$render(content);
}