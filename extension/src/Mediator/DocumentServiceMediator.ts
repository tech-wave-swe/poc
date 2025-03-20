import * as vscode from "vscode";

class DocumentServiceMediator {
  // private static instance: DocumentServiceMediator;

  // private constructor() {}

  // public static getInstance(): DocumentServiceMediator {
  //   if (!DocumentServiceMediator.instance) {
  //     DocumentServiceMediator.instance = new DocumentServiceMediator();
  //   }

  //   return DocumentServiceMediator.instance;
  // }

  public Sync(context: vscode.ExtensionContext) {
    console.log("Sincronizzato!");
  }
}

// export default DocumentServiceMediator.getInstance();
export default DocumentServiceMediator;
