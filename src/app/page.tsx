"use client";

import { useState } from "react";

// Asset
import SendIcon from "@/assets/icons/SendIcon";
import SpinIcon from "@/assets/icons/SpinIcon";

// Components
import Form from "@/components/Form";
import TextInput from "@/components/TextInput";
import ToggleButton from "@/components/ToggleButton";
import QuestionAnswer from "@/components/QuestionAnswer";

// Types
import { PROMPT_TYPE, PredictionType, QuestionAnsType } from "@/types/home";
import { PROMPT_TYPE_IMAGE, PROMPT_TYPE_TEXT } from "@/constants";

// Utils
import { sleep } from "@/utils";

export default function Home() {
  const [questionAns, setQuestionAns] = useState<QuestionAnsType[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [promptInputValue, setPromptInputValue] = useState<string>("");

  const [prediction, setPrediction] = useState<PredictionType>(null);
  const [error, setError] = useState(null);

  const addToList = (id: string, prompt: string, output?: string) => {
    if (output) {
      let obj = questionAns.find((o, i) => {
        if (o.id === id) {
          questionAns[i] = {
            ...questionAns[i],
            [isChecked ? "imgSrc" : "answer"]: output,
          };
          return true; // stop searching
        }
      });
    } else if (!questionAns.find((l) => l.id === id)) {
      questionAns.push({
        id: id,
        question: prompt,
        type: isChecked ? PROMPT_TYPE.IMAGE : PROMPT_TYPE.TEXT,
      });
    }
    setQuestionAns(questionAns);
  };

  const getQuestionAnswer = async (e: any) => {
    const prompt = e.target.search.value;
    if (prompt) {
      setIsGenerating(true);
      const response = await fetch("/api/question/post", {
        method: "POST",
        body: JSON.stringify({
          prompt: prompt,
          type: isChecked ? PROMPT_TYPE_IMAGE : PROMPT_TYPE_TEXT,
        }),
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
        await sleep(5000);
        const response = await fetch("/api/question/" + prediction.id);
        prediction = await response.json();
        if (response.status !== 200) {
          setError(prediction.detail);
          return;
        }
        if (prediction?.output) {
          addToList(
            prediction.id,
            prompt,
            isChecked ? prediction?.output?.[0] : prediction?.output?.join("")
          );

          setIsGenerating(false);
        }
        setPrediction(prediction);
      }
    }
  };

  const handleChange = (e: any) => {
    setPromptInputValue(e.target.value);
  };

  const handleToggleButtonChange = (e: any) => {
    setIsChecked(!isChecked);
  };

  return (
    <main className="bg-gray-100">
      <div className="fixed w-full bg-white shadow-md pt-3 pb-10 sm:pb-4 z-10">
        <h1 className=" text-center text-4xl font-bold">Imagine-bot</h1>
        <div className="absolute right-10 top-14 sm:top-5">
          <ToggleButton
            isChecked={isChecked}
            handleChange={handleToggleButtonChange}
            firstLabel={PROMPT_TYPE_TEXT}
            secondLabel={PROMPT_TYPE_IMAGE}
          />
        </div>
      </div>
      <div className="min-h-screen pt-20 pb-20">
        <div className="">
          {questionAns?.map((qa) => {
            return (
              <QuestionAnswer
                key={qa.id}
                prompt={qa.question}
                imgSrc={qa.imgSrc}
                resultText={qa.answer}
              />
            );
          })}
        </div>
      </div>
      <div className="fixed w-full p-4 inset-x-0 bottom-0">
        <Form onSubmit={getQuestionAnswer}>
          <TextInput
            labelName={
              isChecked
                ? "Imagine something... Eg: Husky dog playing football"
                : "Ask something... Eg: Expain how to play uno"
            }
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
              {isGenerating ? <SpinIcon size="1rem" /> : <SendIcon />}
            </button>
          </TextInput>
        </Form>
      </div>
    </main>
  );
}
