import { eventNames } from "process";
import { Event, EventType } from "../Event";
import EventManager from "../EventManager";
import Mediator from "./MediatorInterface";

export default class Test {
  constructor() {
    EventManager.subscribe(EventType.GENERIC, this.notify.bind(this));
  }

  public notify(event: Event): void {
    switch (event.type) {
      case EventType.GENERIC:
        this.onEventGeneric(event.data);
    }
  }

  public onEventGeneric(data: any) {
    console.log("From Config!");
  }
}
