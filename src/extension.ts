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
                // Get the current line text
                const lineText = document.lineAt(position).text;

                // Get the text up to the cursor position
                const textBeforeCursor = document
                    .getText(new vscode.Range(new vscode.Position(0, 0), position));

                // Optionally, get the entire document text
                const fullText = document.getText();

                // Use a regular expression to find the last word before the cursor
                const lastWordMatch = textBeforeCursor.match(/\b\w+\b(?=\W*$)/);
                var lastWord = lastWordMatch ? lastWordMatch[0] : '';
                lastWord = lastWord. toUpperCase().trim();

                // Split the text into words using a regular expression
                const wordsBeforeCursor = textBeforeCursor.match(/\b\w+\b/g) || [];

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

export function deactivate() { }
