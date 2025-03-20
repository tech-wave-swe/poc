import type { Event } from "./Event";

export interface Subscriber {
  notify(event: Event): void;
}
