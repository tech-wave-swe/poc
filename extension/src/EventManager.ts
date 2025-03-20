import { Event, EventType } from "./Event";

class EventManager {
  private static instance: EventManager;

  public static getInstance(): EventManager {
    if (!EventManager.instance) {
      EventManager.instance = new EventManager();
    }
    return EventManager.instance;
  }

  private listeners: { [type in EventType]?: Function[] } = {};

  public subscribe(event: EventType, listener: Function): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  public publish(event: Event): void {
    const listeners = this.listeners[event.type] || [];
    listeners.forEach((listener) => listener(event));
  }
}

export default EventManager.getInstance();
