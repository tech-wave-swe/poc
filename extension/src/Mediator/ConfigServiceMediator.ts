import { eventNames } from "process";
import { Event, EventType } from "../Event";
import EventManager from "../EventManager";
import Mediator from "./MediatorInterface";

export default class ConfigServiceMediator extends Mediator {
  protected constructor() {
    super();

    EventManager.subscribe(EventType.GENERIC, this.notify.bind(this));
  }

  public static override getInstance(): ConfigServiceMediator {
    if (!ConfigServiceMediator.instance) {
      // Create a new instance of the concrete subclass
      ConfigServiceMediator.instance = new ConfigServiceMediator();
    }

    return ConfigServiceMediator.instance;
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
