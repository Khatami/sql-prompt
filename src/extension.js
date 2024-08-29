"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
function activate(context) {
    // Register the Hello World command
    const helloWorldCommand = vscode.commands.registerCommand('sqlsense.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from SQLSense!');
    });
    // SQL Completion Provider
    const sqlCompletionProvider = vscode.languages.registerCompletionItemProvider({ language: 'sql', scheme: 'file' }, {
        provideCompletionItems(document, position) {
            const completionItems = [];
            // Simple SQL keywords
            const keywords = ['SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE'];
            for (const keyword of keywords) {
                completionItems.push(new vscode.CompletionItem(keyword, vscode.CompletionItemKind.Keyword));
            }
            return completionItems;
        }
    }, ' ' // Trigger completion on space
    );
    // SQL Formatter
    const sqlFormatterProvider = vscode.languages.registerDocumentFormattingEditProvider('sql', {
        provideDocumentFormattingEdits(document) {
            const firstLine = document.lineAt(0);
            if (!firstLine.text.startsWith('-- Formatted SQL')) {
                return [vscode.TextEdit.insert(firstLine.range.start, '-- Formatted SQL\n')];
            }
            return [];
        }
    });
    context.subscriptions.push(helloWorldCommand, sqlCompletionProvider, sqlFormatterProvider);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map