import * as vscode from 'vscode';
import { sqlCompletionProvider } from './CompletionProvider/sql';

export function activate(context: vscode.ExtensionContext) {
    // Register the Hello World command
    const helloWorldCommand = vscode.commands.registerCommand('sqlsense.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from SQLSense!');
    });

    // SQL Formatter
    const sqlFormatterProvider = vscode.languages.registerDocumentFormattingEditProvider('sql', {
        provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
            const firstLine = document.lineAt(0);
            if (!firstLine.text.startsWith('-- Formatted SQL')) {
                return [vscode.TextEdit.insert(firstLine.range.start, '-- Formatted SQL\n')];
            }
            return [];
        }
    });

    context.subscriptions.push(helloWorldCommand, sqlCompletionProvider, sqlFormatterProvider);
}

export function deactivate() { }
