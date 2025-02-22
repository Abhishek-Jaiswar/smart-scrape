import { ExecutionEnvironment } from "@/types/executer";
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
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
