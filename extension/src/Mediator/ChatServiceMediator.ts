import * as vscode from "vscode";

export interface ChatMessage {
  sender: "user" | "model";
  text: string;
  timestamp: string;
}

class ChatServiceMediator {
  private static instance: ChatServiceMediator;
  private IChatMessage: ChatMessage[] = [];

  private constructor() {}

  public static getInstance(): ChatServiceMediator {
    if (!ChatServiceMediator.instance) {
      ChatServiceMediator.instance = new ChatServiceMediator();
    }

    return ChatServiceMediator.instance;
  }

  public Sync(context: vscode.ExtensionContext) {
    console.log("Sincronizzato!");
  }
}

export default ChatServiceMediator.getInstance();
