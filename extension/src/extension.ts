import * as vscode from "vscode";
import ConfigServiceMediator from "./Mediator/ConfigServiceMediator";

export function activate(context: vscode.ExtensionContext) {
  vscode.workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration("reqTracker")) {
      ConfigServiceMediator.Sync();
    }
  });
}
