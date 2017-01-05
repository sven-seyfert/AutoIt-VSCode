var vsls = require('vscode-languageserver');
// var IPCMessageReader = vsls.IPCMessageReader;
// var IPCMessageWriter = vsls.IPCMessageWriter;
// var createConnection = vsls.createConnection;
// var IConnection = vsls.IConnection;
// var TextDocumentSyncKind = vsls.TextDocumentSyncKind;
// var TextDocuments = vsls.TextDocuments;
// var TextDocument = vsls.TextDocument;
// var Diagnostic = vsls.Diagnostic;
// var DiagnosticSeverity = vsls.DiagnosticSeverity;
// var InitializeParams = vsls.InitializeParams;
// var InitializeResult = vsls.InitializeResult;
// var TextDocumentPositionParams = vsls.TextDocumentPositionParams;
// var CompletionItem = vsls.CompletionItem;
// var CompletionItemKind = vsls.CompletionItemKind;

// Create a connection for the server. The connection uses Node's IPC as a transport
var connection = vsls.createConnection(new vsls.IPCMessageReader(process), new vsls.IPCMessageWriter(process));

// Create AutoIt document manager
var documents = new vsls.TextDocuments();
// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// After the server has started the client sends an initilize request. The server receives
// in the passed params the rootPath of the workspace plus the client capabilites. 
var workspaceRoot;
connection.onInitialize(function (params) {
    workspaceRoot = params.rootPath;
    return {
        capabilities: {
			// Tell the client that the server works in FULL text document sync mode
			textDocumentSync: documents.syncKind,
			// Tell the client that the server support code complete
			completionProvider: {
				resolveProvider: true
			}
		}
    }
});

connection.onDidChangeWatchedFiles(function (change) {
    // Monitored files have change in VSCode
    connection.console.log('We received a file change event');
});

connection.onCompletion(function (textDocumentPosition){
    // The pass parameter contains the position of the text document in 
    // which code complete got requested. For the example we ignore this
    // info and always provide the same completion items.
    return [
        {
            label: 'ClipGet',
            kind: vsls.CompletionItemKind.Function,
            data: 1
        }
    ];
});

// This handler resolve additional information for the item selected in
// the completion list.
connection.onCompletionResolve( function (item) {
	if (item.data === 1) {
		item.detail = 'AutoIt Function',
		item.documentation = 'Retrieves text from the clipboard.'
	}
	return item;
});

connection.listen();