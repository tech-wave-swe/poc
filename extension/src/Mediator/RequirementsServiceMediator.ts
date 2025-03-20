import * as vscode from "vscode";

export interface Requirement {
  guid: string;
  name: string;
  nottes: string;
  type: "Requirement";
  version: string;
}

class RequirementsServiceMediator {
  private static instance: RequirementsServiceMediator;
  private requirements: Requirement[] = [];

  private constructor() {}

  public static getInstance(): RequirementsServiceMediator {
    if (!RequirementsServiceMediator.instance) {
      RequirementsServiceMediator.instance = new RequirementsServiceMediator();
    }

    return RequirementsServiceMediator.instance;
  }

  public Sync() {
    const response: Requirement[] = [];
    this.requirements = response;
  }
}

export default RequirementsServiceMediator.getInstance();
