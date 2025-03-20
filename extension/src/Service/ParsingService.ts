import { Requirement } from "../Mediator/RequirementsServiceMediator";

interface ParsingService {
  parseFile(file: string): Requirement[];
}

export class ParseCSVService implements ParsingService {
  parseFile(file: string): Requirement[] {
    return [];
  }
}

export class ParseREQIFService implements ParsingService {
  parseFile(file: string): Requirement[] {
    return [];
  }
}
