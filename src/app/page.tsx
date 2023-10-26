"use client";

import { useState, SyntheticEvent } from "react";

// Asset
import SendIcon from "@/assets/icons/SendIcon";

// Components
import Form from "@/components/Form";
import TextInput from "@/components/TextInput";
import QuestionAnswer from "@/components/QuestionAnswer";

type PredictionType = {
  id: string;
  version: string;
  input: any;
  logs: string;
  error: string | null;
  status: string;
  created_at: string;
  urls: {
    cancel: string;
    get: string;
  };
  output?: string[];
  started_at?: string;
  completed_at?: string;
  metrics?: {
    predict_time?: number;
  };
} | null;

type QuestionAnsType = {
  id: string;
  question: string;
  answer?: string;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [questionAns, setQuestionAns] = useState<QuestionAnsType[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const [promptInputValue, setPromptInputValue] = useState<string>("");

  const [prediction, setPrediction] = useState<PredictionType>(null);
  const [error, setError] = useState(null);

  const addToList = (id: string, prompt: string, output?: string) => {
    console.log("addToList", { id: id, question: prompt });

    if (output) {
      let obj = questionAns.find((o, i) => {
        if (o.id === id) {
          questionAns[i] = { ...questionAns[i], answer: output };
          return true; // stop searching
        }
      });
    } else if (!questionAns.find((l) => l.id === id)) {
      questionAns.push({ id: id, question: prompt });
    }
    setQuestionAns(questionAns);
  };

  const getQuestionAnswer = async (e: any) => {
    const prompt = e.target.search.value;
    if (prompt) {
      setIsGenerating(true);
      const response = await fetch("/api/question/post", {
        method: "POST",
        body: JSON.stringify({ prompt: prompt }),
      });
      let prediction = await response.json();
      if (response.status !== 201) {
        setError(prediction.detail);
        return;
      }
      setPrediction(prediction);
      addToList(prediction.id, prompt);
      setPromptInputValue("");

      while (
        prediction.status !== "succeeded" &&
        prediction.status !== "failed"
      ) {
        await sleep(3000);
        const response = await fetch("/api/question/" + prediction.id);
        prediction = await response.json();
        if (response.status !== 200) {
          setError(prediction.detail);
          return;
        }
        if (prediction?.output?.[0]) {
          addToList(prediction.id, prompt, prediction?.output?.[0]);

          setIsGenerating(false);
        }
        setPrediction(prediction);
      }
    }
  };

  const handleChange = (e: any) => {
    setPromptInputValue(e.target.value);
  };

  return (
    <main className="bg-gray-100">
      <div className="fixed w-full bg-white shadow-md pt-3 pb-4">
        <h1 className=" text-center text-4xl font-bold">Imagine-bot</h1>
      </div>
      <div className="min-h-screen pt-20 pb-20">
        <div className="">
          {questionAns?.map((qa) => {
            return (
              <QuestionAnswer
                key={qa.id}
                prompt={qa.question}
                imgSrc={qa.answer}
              />
            );
          })}
        </div>
      </div>
      <div className="fixed w-full p-4 inset-x-0 bottom-0">
        <Form onSubmit={getQuestionAnswer}>
          <TextInput
            labelName="Send a message"
            name="search"
            value={promptInputValue}
            handleChange={handleChange}
            required
          >
            <button
              type="submit"
              disabled={isGenerating}
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <SendIcon />
            </button>
          </TextInput>
        </Form>
      </div>
    </main>
  );
}
