import { NextApiRequest, NextApiResponse } from "next";

// Constants
import { PROMPT_TYPE_TEXT } from "@/constants";
import { sampleIn } from "../../../constants/sampleApiResponses";

async function getQuestionAnswer(promptStr: string, questionType: string) {
  const version =
    questionType === "TEXT"
      ? "02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3"
      : "2b017d9b67edd2ee1401238df49d75da53c523f36e363881e057f5dc3ed3c5b2";

  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Pinned to a specific version of Stable Diffusion
      // See https://replicate.com/stability-ai/sdxl
      version: version,

      // This is the text prompt that will be submitted by a form on the frontend
      input: { prompt: promptStr },
    }),
  });

  const prediction = await response.json();

  return prediction;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { prompt = "", type = PROMPT_TYPE_TEXT } = JSON.parse(req.body);
      const prediction = await getQuestionAnswer(prompt, type);
      res.statusCode = 201;
      res.end(JSON.stringify(prediction)); // put sample Output here for testing
    } catch (error) {
      console.log(`Error : ${error}`);
      throw error;
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
}
