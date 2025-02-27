import { ExecutionEnvironment } from "@/types/executer";
import { ClickElementTask } from "../task/ClickElement";
import { ExtractDataWithAiTask } from "../task/ExtractDataWithAi";
import prisma from "@/lib/prisma";
import { symmetricDecript } from "@/lib/encryption";

/* eslint-disable */
export async function ExtractDataWithAiExecutor(
  environment: ExecutionEnvironment<typeof ExtractDataWithAiTask>
): Promise<boolean> {
  try {
    const credentials = environment.getInput("Credentials");
    if (!credentials) {
      environment.log.error("input->credentials not defined");
    }

    const prompt = environment.getInput("Prompt");
    if (!prompt) {
      environment.log.error("input->prompt credential not defined");
    }

    const contnet = environment.getInput("Content");
    if (!contnet) {
      environment.log.error("input->contnet credential not defined");
    }

    // Get cred from db

    const credential = await prisma.credential.findUnique({
      where: {
        id: credentials,
      },
    });

    if (!credential) {
      environment.log.error("Credential not found");
      return false;
    }

    const plainCredentialValue = symmetricDecript(credential.value);
    if (!plainCredentialValue) {
      environment.log.error("Cannot decrypt credential");
      return false;
    }

    const mockExtractedData = {
      usernameSelector: "#username",
      passwordSelector: "#password",
      loginSelector: "body > div > form > input.btn.btn-primary",
    };
    environment.setOutput("Extracted data", JSON.stringify(mockExtractedData));

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
