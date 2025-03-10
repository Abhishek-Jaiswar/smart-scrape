import { TaskType } from "@/types/task";
import { ExtractTextFromElementTask } from "./ExtractTextFromEle";
import { LaunchBrowser } from "./LaunchBrowser";
import { PageToHtmlTask } from "./PageToHtml";
import { WorkflowTask } from "@/types/workflow";
import { FillInputTask } from "./FillInput";
import { ClickElementTask } from "./ClickElement";
import { WaitForElementTask } from "./WaitForElement";
import { DeliverViaWebhookTask } from "./DeliverViaWebhook";
import { ExtractDataWithAiTask } from "./ExtractDataWithAi";
import { ReadPropertyFromJsonTask } from "./ReadPropertyFromJson";
import { AddPropertyToJsonTask } from "./AddPropertyToJson";
import { NavigateUrlTask } from "./NavigateUrl";
import { ScrollToElementTask } from "./ScrollToElement";


type Registry = {
    [K in TaskType]: WorkflowTask & { type: K };
}

export const TaskRegistry: Registry = {
    LAUNCH_BROWSER: LaunchBrowser,
    PAGE_TO_HTML: PageToHtmlTask,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
    FILL_INPUT: FillInputTask,
    CLICK_ELEMENT: ClickElementTask,
    WAIT_FOR_ELEMENT: WaitForElementTask,
    DELIVER_VIA_WEBHOOK: DeliverViaWebhookTask,
    EXTRACT_DATA_WITH_AI: ExtractDataWithAiTask,
    READ_PROPERTY_FROM_JSON: ReadPropertyFromJsonTask,
    ADD_PROPERTY_TO_JSON: AddPropertyToJsonTask,
    NAVIGATE_URL: NavigateUrlTask,
    SCROLL_TO_ELEMENT: ScrollToElementTask
}