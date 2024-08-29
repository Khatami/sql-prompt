import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // Register the Hello World command
    const helloWorldCommand = vscode.commands.registerCommand('sqlsense.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from SQLSense!');
    });

    // SQL Completion Provider
    const sqlCompletionProvider = vscode.languages.registerCompletionItemProvider(
        { language: 'sql', scheme: 'file' },
        {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
                const completionItems: vscode.CompletionItem[] = [];

                // Simple SQL keywords
                const keywords = ['SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE'];
                for (const keyword of keywords) {
                    completionItems.push(new vscode.CompletionItem(keyword, vscode.CompletionItemKind.Keyword));
                }

                return completionItems;
            }
        },
        ' ' // Trigger completion on space
    );

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

export function deactivate() {}
