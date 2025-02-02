export enum TaskType {
    LAUNCH_BROWSER = "LAUNCH_BROWSER"
}

export enum TaskParamsType {
    STRING = "STRING"
}

export interface TaskParam {
    name: string;
    task: TaskParamsType;
    helperText: string;
    required?: boolean;
    hideHandle?: boolean;
    value?: string;
    [key: string]: any;
}