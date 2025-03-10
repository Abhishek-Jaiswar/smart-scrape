import { ExecutionEnvironment } from "@/types/executer";
import { ClickElementTask } from "../task/ClickElement";
import { WaitForElementTask } from "../task/WaitForElement";

/* eslint-disable */
export async function WaitForElementExecutor(
  environment: ExecutionEnvironment<typeof WaitForElementTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("input->selector not defined");
    }

    const visibility = environment.getInput("Visibility");
    if (!visibility) {
      environment.log.error("input->visibility not defined");
    }

    await environment.getPage()!.waitForSelector(selector, {
      visible: visibility === "visible",
      hidden: visibility === "hidden",
    });

    environment.log.info(`Element ${selector} became: ${visibility}`);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
