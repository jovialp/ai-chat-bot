import { PROMPT_TYPE_IMAGE, PROMPT_TYPE_TEXT } from "../constants";

export type PredictionType = {
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

export enum PROMPT_TYPE {
  IMAGE = PROMPT_TYPE_IMAGE,
  TEXT = PROMPT_TYPE_TEXT,
}

export type QuestionAnsType = {
  id: string;
  question: string;
  imgSrc?: string;
  answer?: string;
  type: PROMPT_TYPE;
};
