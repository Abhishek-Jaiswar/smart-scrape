import { LaunchBrowserExecuter } from "./LaunchBrowserExecuter";

export const ExecutorRegistry = {
  LAUNCH_BROWSER: LaunchBrowserExecuter,
  PAGE_TO_HTML: () => Promise.resolve(true),
  EXTRACT_TEXT_FROM_ELEMENT: () => Promise.resolve(true),
};
