import * as vscode from "vscode";
import { Subscriber } from "./Subscriber";
import { Event, EventType } from "./Event";
import EventManager from "./EventManager";

export default class Controller implements Subscriber {
  private context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    EventManager.subscribe(
      EventType.START_INITIALIZATION,
      this.notify.bind(this)
    );
  }

  public notify(event: Event): void {
    switch (event.type) {
      case EventType.START_INITIALIZATION:
        this.onStartInitialization(event.data);
    }
  }

  onStartInitialization(data: any) {
    console.log("Initialization Started!");
    EventManager.publish({ type: EventType.GENERIC, data: {} });
  }
}
