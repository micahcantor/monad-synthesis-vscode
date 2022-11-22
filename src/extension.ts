// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { runSynthesis } from './synthesis';

// This method is called when your extension is activated
// Extension is activated when a Haskell file is opened
export function activate(context: vscode.ExtensionContext) {
	console.log('activating');
	context.subscriptions.push(
		vscode.languages.registerCodeActionsProvider('haskell', new Synthesizer(), {
			providedCodeActionKinds: Synthesizer.providedCodeActionKinds
		}));
}

export class Synthesizer implements vscode.CodeActionProvider {
	public static readonly providedCodeActionKinds = [
		vscode.CodeActionKind.QuickFix
	];

	public provideCodeActions(document: vscode.TextDocument, range: vscode.Range): vscode.CodeAction[] | undefined {
		const functionName = document.getText(range);
		if (!functionName.startsWith("run")) {
			return;
		} else {
			const synthesizeDefinition = this.createFix(document, range, functionName);
			return [synthesizeDefinition];
		}
	}

	private createFix(document: vscode.TextDocument, range: vscode.Range, functionName: string): vscode.CodeAction {
		const fix = new vscode.CodeAction('Generate definition...', vscode.CodeActionKind.QuickFix);
		const synthesisResult = runSynthesis(document.fileName, functionName);
		console.log("result: " + synthesisResult);
		fix.edit = new vscode.WorkspaceEdit();
		fix.edit.insert(document.uri, range.end.translate(0, 4), synthesisResult);
		return fix;
	}
}

// This method is called when your extension is deactivated
export function deactivate() {}
