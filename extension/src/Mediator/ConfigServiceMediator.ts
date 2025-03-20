import * as vscode from "vscode";

export interface Config {
  endpoint: string;
  model: string;
  embeddingModel: string;
  temperature: number;
  // bearerToken: string;
}

class ConfigServiceMediator {
  private static instance: ConfigServiceMediator;
  private config: Config | null = null;

  private constructor() {}

  public static getInstance(): ConfigServiceMediator {
    if (!ConfigServiceMediator.instance) {
      ConfigServiceMediator.instance = new ConfigServiceMediator();
    }

    return ConfigServiceMediator.instance;
  }

  public Sync() {
    const globalConfig = vscode.workspace.getConfiguration("reqTracker");
    const projectConfig: Config | null = null; // Legge un file di configurazione

    this.config = {
      endpoint: projectConfig
        ? projectConfig["endpoint"]
        : globalConfig["endpoint"],
      model: projectConfig ? projectConfig["model"] : globalConfig["model"],
      embeddingModel: projectConfig
        ? projectConfig["embeddingModel"]
        : globalConfig["embeddingModel"],
      temperature: projectConfig
        ? projectConfig["temperature"]
        : globalConfig["temperature"],
    };
  }
}

export default ConfigServiceMediator.getInstance();
