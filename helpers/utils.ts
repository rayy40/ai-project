import { QuizData, UserAnswers } from "@/types";
import { MCQformat, NameTheFollowingformat, TrueFalseformat } from "./format";
import { Infer } from "convex/values";
import { Response } from "@/convex/schema";

interface Props {
  format: string;
  questionNumber: number;
  content: string;
  kind: string;
}

export const createSystemPrompt = ({ format }: { format: string }) => {
  const formatJSON =
    format === "mcq"
      ? MCQformat
      : format === "name"
      ? NameTheFollowingformat
      : TrueFalseformat;

  let prompt = `I want you to act as a Quiz generator. Your task is to generate a quiz, including a title for the same and format the response as JSON in the shape of ${JSON.stringify(
    formatJSON
  )}.`;
  return prompt;
};

export const createUserPrompt = ({
  format,
  questionNumber,
  content,
  kind,
}: Props) => {
  let prompt = `Generate ${questionNumber} ${format} type questions, and provide a suitable title for the quiz,`;

  if (kind === "topic") {
    prompt += ` related to ${content}`;
  } else if (kind === "paragraph") {
    prompt += ` related to the below text:\n\nText:\n------\n${content}\n------`;
  }

  if (format === "mcq") {
    prompt += ` with three incorrect options and only one correct option`;
  } else if (format === "name") {
    prompt += ` with answers being maximum of 3 words`;
  }

  return prompt;
};

export const numToAlpha = (num: number) => {
  if (num < 1 || num > 26) {
    return "Invalid input. Number must be between 1 and 26.";
  }

  const base = "A".charCodeAt(0) - 1;

  return String.fromCharCode(base + num);
};

export const calculateScore = (
  quizData: QuizData[],
  userAnswers: UserAnswers
) => {
  const correctAnswers = quizData.filter(
    (question, index) => userAnswers[index + 1] === question.answer
  ).length;

  const score = (correctAnswers / quizData.length) * 100;

  return { score: Math.round(score), correctAnswer: correctAnswers };
};

export const isValidQuizId = (quizId: string): boolean => {
  return !!quizId && /^[a-z0-9]{32}$/.test(quizId);
};