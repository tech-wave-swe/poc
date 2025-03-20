export class Event {
  public type: EventType;
  public data: any;

  constructor(eventType: EventType, data: any) {
    this.type = eventType;
    this.data = data;
  }
}

export enum EventType {
  START_INITIALIZATION,
  GENERIC,
}
