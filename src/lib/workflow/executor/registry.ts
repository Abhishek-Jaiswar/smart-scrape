import { TaskType } from "@/types/task";
import { LaunchBrowserExecuter } from "./LaunchBrowserExecuter";
import { PageToHtmlExecuter } from "./PageToHtmlExecuter";
import { ExecutionEnvironment } from "@/types/executer";
import { WorkflowTask } from "@/types/workflow";
import { ExtractTextFromElementExecuter } from "./ExtractTextFromElementExecuter";

type ExecuterFn<T extends WorkflowTask> = (
  envirnment: ExecutionEnvironment<T>
) => Promise<boolean>;

type RegistryType = {
  [K in TaskType]: ExecuterFn<WorkflowTask & { type: K }>;
};

export const ExecutorRegistry: RegistryType = {
  LAUNCH_BROWSER: LaunchBrowserExecuter,
  PAGE_TO_HTML: PageToHtmlExecuter,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecuter,
};
