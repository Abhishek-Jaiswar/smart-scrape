import { Environment, ExecutionEnvironment } from "@/types/executer";
import puppeteer from "puppeteer";
import { PageToHtmlTask } from "../task/PageToHtml";

export async function PageToHtmlExecuter(
  environment: ExecutionEnvironment<typeof PageToHtmlTask>
): Promise<boolean> {
  try {
    const html = await environment.getPage()!.content();
    environment.setOutput("Html", html)

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
