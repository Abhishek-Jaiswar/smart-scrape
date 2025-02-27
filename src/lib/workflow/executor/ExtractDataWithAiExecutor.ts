import { ExecutionEnvironment } from "@/types/executer";
import { ExtractDataWithAiTask } from "../task/ExtractDataWithAi";
import prisma from "@/lib/prisma";
import { symmetricDecript } from "@/lib/encryption";
import { GoogleGenerativeAI } from "@google/generative-ai";

/* eslint-disable */
export async function ExtractDataWithAiExecutor(
  environment: ExecutionEnvironment<typeof ExtractDataWithAiTask>
): Promise<boolean> {
  try {
    const credentials = environment.getInput("Credentials");
    if (!credentials) {
      environment.log.error("input->credentials not defined");
      return false;
    }

    const prompt = environment.getInput("Prompt");
    if (!prompt) {
      environment.log.error("input->prompt not defined");
      return false;
    }

    const content = environment.getInput("Content");
    if (!content) {
      environment.log.error("input->content not defined");
      return false;
    }

    const credential = await prisma.credential.findUnique({
      where: { id: credentials },
    });

    if (!credential) {
      environment.log.error("Credential not found");
      return false;
    }

    const apiKey = symmetricDecript(credential.value);
    if (!apiKey) {
      environment.log.error("Cannot decrypt credential");
      return false;
    }

    // Initialize Google Gemini API client
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
    });

    // Call Gemini API for data extraction
    const response = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are a web scraper assistant that extracts structured data from HTML or text. You will receive input content along with extraction instructions. Always return extracted data as a JSON array or object without any additional explanation. If no data is found, return an empty array.\n\nContent: ${content}\n\nExtraction Instructions: ${prompt}`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      },
    });

    environment.log.info(
      `Prompt tokens: ${response.response.usageMetadata?.promptTokenCount}`
    );
    environment.log.info(
      `Completion tokens: ${response.response.usageMetadata?.totalTokenCount}`
    );

    // Extract and store the generated data
    const extractedData = response.response.text();
    if (!extractedData) {
      environment.log.error("Empty response from AI");
    }
    environment.setOutput("Extracted data", extractedData);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
