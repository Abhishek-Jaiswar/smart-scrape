import { ExecutionEnvironment } from "@/types/executer";
import puppeteer from "puppeteer";
import { LaunchBrowser } from "../task/LaunchBrowser";

export async function LaunchBrowserExecuter(
  environment: ExecutionEnvironment<typeof LaunchBrowser>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website url");
    const browser = await puppeteer.launch({
      headless: true,
    });

    environment.setBrowser(browser);
    environment.log.info("Browser started successfully");
    const page = await browser.newPage();
    await page.goto(websiteUrl);
    environment.setPage(page);
    environment.log.info(`Opened page at: ${websiteUrl}`);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
