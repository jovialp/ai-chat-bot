// 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

import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: "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",
// });

async function getQuestionAnswer() {
  //   const completion = await openai.chat.completions.create({
  //     messages: [{ role: "system", content: "You are a helpful assistant." }],
  //     model: "gpt-3.5-turbo",
  //   });

  //   console.log(completion.choices[0]);
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer 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",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo-instruct",
      prompt: "Say this is a test",
      max_tokens: 7,
      temperature: 0,
    }),
  });
  console.log("response", await (await response).json());

  return "completion.choices[0]";
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("completion.choices[0]");
  if (req.method === "GET") {
    try {
      console.log("completion.choices[0]");
      const questions = await getQuestionAnswer();
      res.status(200).json(questions);
    } catch (error) {
      console.log(`Error : ${error}`);
      throw error;
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
}
