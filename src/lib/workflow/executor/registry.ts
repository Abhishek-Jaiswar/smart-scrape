import { TaskType } from "@/types/task";
import { LaunchBrowserExecuter } from "./LaunchBrowserExecuter";
import { PageToHtmlExecuter } from "./PageToHtmlExecuter";
import { ExecutionEnvironment } from "@/types/executer";
import { WorkflowTask } from "@/types/workflow";
import { ExtractTextFromElementExecuter } from "./ExtractTextFromElementExecuter";
import { FillInputExecutor } from "./FillInputExecutor";
import { ClickElementExecutor } from "./ClickElementExecutor";
import { WaitForElementExecutor } from "./WaitForElementExecutor";
import { DeliverViaWebhookExecutor } from "./DeliverViaWebhookExecuter";
import { ExtractDataWithAiExecutor } from "./ExtractDataWithAiExecutor";

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
  FILL_INPUT: FillInputExecutor,
  CLICK_ELEMENT: ClickElementExecutor,
  WAIT_FOR_ELEMENT: WaitForElementExecutor,
  DELIVER_VIA_WEBHOOK: DeliverViaWebhookExecutor,
  EXTRACT_DATA_WITH_AI: ExtractDataWithAiExecutor
};
