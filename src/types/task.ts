export enum TaskType {
  LAUNCH_BROWSER = "LAUNCH_BROWSER",
  PAGE_TO_HTML = "PAGE_TO_HTML",
  EXTRACT_TEXT_FROM_ELEMENT = "EXTRACT_TEXT_FROM_ELEMENT",
}

export enum TaskParamsType {
  STRING = "STRING",
  BROWSER_INSTANCE = "BROWSER_INSTANCE",
}

//Input types
export interface TaskParam {
  name: string;
  type: TaskParamsType;
  helperText?: string;
  required?: boolean;
  hideHandle?: boolean;
  value?: string;
  [key: string]: any;
}

//ValidationSooner
export type AppNodeMissingInputs = {
  nodeId: string;
  inputs: string[];
};
