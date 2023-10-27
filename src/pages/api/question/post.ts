// 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
// 733hesdbfowkfi6f7xb6fi3cma

import { NextApiRequest, NextApiResponse } from "next";

async function getQuestionAnswer(promptStr: string) {
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Pinned to a specific version of Stable Diffusion
      // See https://replicate.com/stability-ai/sdxl
      version:
        "2b017d9b67edd2ee1401238df49d75da53c523f36e363881e057f5dc3ed3c5b2",

      // This is the text prompt that will be submitted by a form on the frontend
      input: { prompt: promptStr },
    }),
  });

  const prediction = await response.json();
  console.log("pr->", prediction, promptStr);

  return prediction;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const prediction = await getQuestionAnswer(JSON.parse(req.body).prompt);
      res.statusCode = 201;
      res.end(JSON.stringify(prediction));
    } catch (error) {
      console.log(`Error : ${error}`);
      throw error;
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
}
