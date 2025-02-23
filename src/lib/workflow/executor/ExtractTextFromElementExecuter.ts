import { ExecutionEnvironment } from "@/types/executer";
import { ExtractTextFromElementTask } from "../task/ExtractTextFromEle";
import * as cheerio from "cheerio";

export async function ExtractTextFromElementExecuter(
  environment: ExecutionEnvironment<typeof ExtractTextFromElementTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("Selector not defined");
      return false;
    }

    const html = environment.getInput("Html");
    if (!html) {
      environment.log.error("HTML not defined");
      return false;
    }

    const $ = cheerio.load(html);
    const element = $(selector);
    if (!element) {
      environment.log.error("Element not found");
      return false;
    }

    const extractText = $.text(element);
    if (!extractText) {
      environment.log.error("Element has no text");
      return false;
    }

    environment.setOutput("Extracted text", extractText);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
