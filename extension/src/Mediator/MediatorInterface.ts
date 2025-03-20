import { extensions } from "vscode";
import { Subscriber } from "../Subscriber";
import { Event } from "../Event";

export default class Mediator implements Subscriber {
  protected static instance: Mediator;
  public static getInstance(): Mediator;

  public notify(event: Event): void {}
}
