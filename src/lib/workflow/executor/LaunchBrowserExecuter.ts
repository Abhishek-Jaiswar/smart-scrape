import { waitFor } from "@/lib/helper/waitfor";
import { Environment, ExecutionEnvironment } from "@/types/executer";
import puppeteer from "puppeteer";
import { LaunchBrowser } from "../task/LaunchBrowser";

export async function LaunchBrowserExecuter(
  environment: ExecutionEnvironment<typeof LaunchBrowser>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website url");
    const browser = await puppeteer.launch({
      headless: false,
    });

    environment.setBrowser(browser)

    const page = await browser.newPage();
    await page.goto(websiteUrl)
    environment.setPage(page)

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
