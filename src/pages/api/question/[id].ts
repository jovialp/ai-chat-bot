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
const sampleout = {
  id: "jbrpfz3bstllxyzvcvizm4m7ju",
  version: "2b017d9b67edd2ee1401238df49d75da53c523f36e363881e057f5dc3ed3c5b2",
  input: {},
  logs: "Using seed: 23661\ntxt2img mode\n  0%|          | 0/50 [00:00<?, ?it/s]\n  2%|▏         | 1/50 [00:00<00:09,  4.97it/s]\n  4%|▍         | 2/50 [00:00<00:09,  4.94it/s]\n  6%|▌         | 3/50 [00:00<00:09,  4.94it/s]\n  8%|▊         | 4/50 [00:00<00:09,  4.93it/s]\n 10%|█         | 5/50 [00:01<00:09,  4.91it/s]\n 12%|█▏        | 6/50 [00:01<00:08,  4.91it/s]\n 14%|█▍        | 7/50 [00:01<00:08,  4.91it/s]\n 16%|█▌        | 8/50 [00:01<00:08,  4.91it/s]\n 18%|█▊        | 9/50 [00:01<00:08,  4.91it/s]\n 20%|██        | 10/50 [00:02<00:08,  4.90it/s]\n 22%|██▏       | 11/50 [00:02<00:07,  4.90it/s]\n 24%|██▍       | 12/50 [00:02<00:07,  4.90it/s]\n 26%|██▌       | 13/50 [00:02<00:07,  4.90it/s]\n 28%|██▊       | 14/50 [00:02<00:07,  4.90it/s]\n 30%|███       | 15/50 [00:03<00:07,  4.90it/s]\n 32%|███▏      | 16/50 [00:03<00:06,  4.89it/s]\n 34%|███▍      | 17/50 [00:03<00:06,  4.90it/s]\n 36%|███▌      | 18/50 [00:03<00:06,  4.89it/s]\n 38%|███▊      | 19/50 [00:03<00:06,  4.90it/s]\n 40%|████      | 20/50 [00:04<00:06,  4.90it/s]\n 42%|████▏     | 21/50 [00:04<00:05,  4.90it/s]\n 44%|████▍     | 22/50 [00:04<00:05,  4.90it/s]\n 46%|████▌     | 23/50 [00:04<00:05,  4.90it/s]\n 48%|████▊     | 24/50 [00:04<00:05,  4.90it/s]\n 50%|█████     | 25/50 [00:05<00:05,  4.90it/s]\n 52%|█████▏    | 26/50 [00:05<00:04,  4.90it/s]\n 54%|█████▍    | 27/50 [00:05<00:04,  4.90it/s]\n 56%|█████▌    | 28/50 [00:05<00:04,  4.90it/s]\n 58%|█████▊    | 29/50 [00:05<00:04,  4.90it/s]\n 60%|██████    | 30/50 [00:06<00:04,  4.90it/s]\n 62%|██████▏   | 31/50 [00:06<00:03,  4.89it/s]\n 64%|██████▍   | 32/50 [00:06<00:03,  4.90it/s]\n 66%|██████▌   | 33/50 [00:06<00:03,  4.90it/s]\n 68%|██████▊   | 34/50 [00:06<00:03,  4.90it/s]\n 70%|███████   | 35/50 [00:07<00:03,  4.89it/s]\n 72%|███████▏  | 36/50 [00:07<00:02,  4.89it/s]\n 74%|███████▍  | 37/50 [00:07<00:02,  4.90it/s]\n 76%|███████▌  | 38/50 [00:07<00:02,  4.90it/s]\n 78%|███████▊  | 39/50 [00:07<00:02,  4.90it/s]\n 80%|████████  | 40/50 [00:08<00:02,  4.89it/s]\n 82%|████████▏ | 41/50 [00:08<00:01,  4.89it/s]\n 84%|████████▍ | 42/50 [00:08<00:01,  4.90it/s]\n 86%|████████▌ | 43/50 [00:08<00:01,  4.90it/s]\n 88%|████████▊ | 44/50 [00:08<00:01,  4.89it/s]\n 90%|█████████ | 45/50 [00:09<00:01,  4.89it/s]\n 92%|█████████▏| 46/50 [00:09<00:00,  4.89it/s]\n 94%|█████████▍| 47/50 [00:09<00:00,  4.89it/s]\n 96%|█████████▌| 48/50 [00:09<00:00,  4.89it/s]\n 98%|█████████▊| 49/50 [00:10<00:00,  4.89it/s]\n100%|██████████| 50/50 [00:10<00:00,  4.89it/s]\n100%|██████████| 50/50 [00:10<00:00,  4.90it/s]\n",
  output: [
    "https://pbxt.replicate.delivery/sy6NMvewnv0WYiczQBeKTREaypjN8iOlPALJRAbQE1gpT8xRA/out-0.png",
  ],
  error: null,
  status: "succeeded",
  created_at: "2023-10-26T07:18:30.735889Z",
  started_at: "2023-10-26T07:18:54.199255Z",
  completed_at: "2023-10-26T07:19:06.708603Z",
  metrics: {
    predict_time: 12.509348,
  },
  urls: {
    cancel:
      "https://api.replicate.com/v1/predictions/jbrpfz3bstllxyzvcvizm4m7ju/cancel",
    get: "https://api.replicate.com/v1/predictions/jbrpfz3bstllxyzvcvizm4m7ju",
  },
};
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
