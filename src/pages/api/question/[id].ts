import { NextApiRequest, NextApiResponse } from "next";

async function getQuestionAnswerById(id: string) {
  const response = await fetch(
    "https://api.replicate.com/v1/predictions/" + id,
    {
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  const prediction = await response.json();
  return prediction;
}

interface QuestionRequest extends NextApiRequest {
  query: {
    id: string;
  };
}

export default async function handler(
  req: QuestionRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const prediction = await getQuestionAnswerById(req.query.id);
      res.statusCode = 200;
      res.end(JSON.stringify(prediction));
    } catch (error) {
      console.log(`Error : ${error}`);
      throw error;
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
}
