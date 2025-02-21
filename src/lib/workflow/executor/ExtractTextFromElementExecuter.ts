import { Environment, ExecutionEnvironment } from "@/types/executer";
import { ExtractTextFromElementTask } from "../task/ExtractTextFromEle";
import * as cheerio from "cheerio";

export async function ExtractTextFromElementExecuter(
  environment: ExecutionEnvironment<typeof ExtractTextFromElementTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      console.error("Selector not defined");
      return false;
    }

    const html = environment.getInput("Html");
    if (!html) {
      console.error("Html not defined");
      return false;
    }

    const $ = cheerio.load(html);
    const element = $(selector);
    if (!element) {
      console.error("Element not found");
      return false;
    }

    const extractText = $.text(element);
    if (!extractText) {
      console.error("Element has no text");
      return false;
    }

    environment.setOutput("Extracted text", extractText);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
