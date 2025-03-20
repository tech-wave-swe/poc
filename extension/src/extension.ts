import * as vscode from "vscode";
import Controller from "./Controller";
import EventManager from "./EventManager";
import { EventType } from "./Event";
import ConfigServiceMediator from "./Mediator/ConfigServiceMediator";
import Test from "./Mediator/Test";

export function activate(context: vscode.ExtensionContext) {
  const controller = new Controller(context);
  const configServiceMediator = ConfigServiceMediator.getInstance();
  const test = new Test();

  EventManager.publish({ type: EventType.START_INITIALIZATION, data: {} });
}
