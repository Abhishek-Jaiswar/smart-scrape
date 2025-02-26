import { ExecutionEnvironment } from "@/types/executer";
import { FillInputTask } from "../task/FillInput";

/* eslint-disable */
export async function FillInputExecutor(
  environment: ExecutionEnvironment<typeof FillInputTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("input->selector not defined");
    }

    const value = environment.getInput("value");
    if (!value) {
      environment.log.error("input->selector not defined");
    }

    await environment.getPage()!.type(selector, value);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
