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

export type QuestionAnsType = {
  id: string;
  question: string;
  answer?: string;
};
