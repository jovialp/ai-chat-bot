import { NextApiRequest, NextApiResponse } from "next";

// Constants
import { PROMPT_TYPE_TEXT } from "@/constants";
import { sampleIn } from "../../../constants/sampleApiResponses";

type INPUT_TYPE = {
  prompt: string;
  temperature?: number;
  system_prompt?: string;
  max_new_tokens?: number;
  refine?: string;
  scheduler?: string;
  lora_scale?: number;
  num_outputs?: number;
  guidance_scale?: number;
  apply_watermark?: boolean;
  high_noise_frac?: number;
  prompt_strength?: number;
  num_inference_steps?: number;
};

async function getQuestionAnswer(promptStr: string, questionType: string) {
  let input: INPUT_TYPE = { prompt: promptStr };
  let version: string =
    "39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b";

  if (questionType === "TEXT") {
    version =
      "13c3cdee13ee059ab779f0291d29054dab00a47dad8261375654de5540165fb0";
    input = {
      ...input,
      temperature: 0.75,
      system_prompt:
        "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.\n\nIf a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.",
      max_new_tokens: 800,
    };
  } else {
    input = {
      ...input,
      refine: "expert_ensemble_refiner",
      scheduler: "K_EULER",
      lora_scale: 0.6,
      num_outputs: 1,
      guidance_scale: 7.5,
      apply_watermark: false,
      high_noise_frac: 0.8,
      prompt_strength: 0.8,
      num_inference_steps: 25,
    };
  }

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
      input: { ...input },
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
