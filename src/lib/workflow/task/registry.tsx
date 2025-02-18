import { ExtractTextFromElementTask } from "./ExtractTextFromEle";
import { LaunchBrowser } from "./LaunchBrowser";
import { PageToHtmlTask } from "./PageToHtml";


export const TaskRegistry = {
    LAUNCH_BROWSER: LaunchBrowser,
    PAGE_TO_HTML: PageToHtmlTask,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask
}