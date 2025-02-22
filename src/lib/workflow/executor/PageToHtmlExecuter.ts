import { ExecutionEnvironment } from "@/types/executer";
import { PageToHtmlTask } from "../task/PageToHtml";

export async function PageToHtmlExecuter(
  environment: ExecutionEnvironment<typeof PageToHtmlTask>
): Promise<boolean> {
  try {
    const html = await environment.getPage()!.content();
    environment.setOutput("Html", html);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
