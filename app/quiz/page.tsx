"use client";

import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldError, FieldValues, useForm } from "react-hook-form";
import { LuFileUp } from "react-icons/lu";
import { z } from "zod";

import DropDown from "@/components/DropDown/DropDown";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUserIdStore } from "@/providers/store";
import { quizSchema } from "@/schema/quiz_schema";
import { zodResolver } from "@hookform/resolvers/zod";

type quizSchema = z.infer<typeof quizSchema>;

const Quiz = () => {
  const {
    reset,
    watch,
    trigger,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<quizSchema>({
    resolver: zodResolver(quizSchema),
    mode: "onSubmit",
  });

  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);
  const [isCreatingQuizError, setIsCreatingQuizError] = useState(false);

  const createQuiz = useMutation(api.quiz.createQuiz);
  const { userId } = useUserIdStore();

  const router = useRouter();
  const format = watch("format", "mcq");
  const by = watch("by", "topic");

  useEffect(() => {
    if (by === "topic") {
      trigger("topic");
    } else if (by === "paragraph") {
      trigger("paragraph");
    } else if (by === "document") {
      trigger("document");
    }
  }, [by, trigger]);

  const onSubmit = async (data: FieldValues) => {
    setIsCreatingQuiz(true);
    let content = "";
    if (by === "topic") {
      content = "topic";
    } else if (by === "paragraph") {
      content = "paragraph";
    } else if (by === "document") {
      content = "document";
    }
    try {
      const quizId = await createQuiz({
        userId: userId as Id<"users">,
        questionNumber: data.questions,
        content: data?.[content],
        format: data.format,
        kind: data.by,
      });
      router.push(`/quiz/${quizId}`);
    } catch (errors) {
      console.log(errors);
      setIsCreatingQuizError(true);
      setIsCreatingQuiz(false);
    } finally {
      reset();
    }
  };

  const Topic = () => {
    return (
      <div className="flex flex-col gap-1">
        <label className="font-semibold text-[hsl(0_0%_50%)]" htmlFor="Topic">
          Topic
        </label>
        <input
          className="p-2 border rounded-md border-border shadow-input bg-secondary"
          type="text"
          id="Topic"
          placeholder="Enter topic"
          {...register("topic")}
        />
        {isSubmitted && by === "topic" && (
          <p className="mt-1 text-[0.95rem] text-error">
            {(errors as { topic?: FieldError }).topic?.message}
          </p>
        )}
      </div>
    );
  };

  const Paragraph = () => {
    return (
      <div className="flex flex-col gap-1">
        <label
          className="font-semibold text-[hsl(0_0%_50%)]"
          htmlFor="Paragraph"
        >
          Paragraph
        </label>
        <textarea
          className="p-2 border rounded-md border-border shadow-input bg-secondary"
          rows={8}
          id="Paragraph"
          placeholder="Enter text"
          {...register("paragraph")}
        />
        {isSubmitted && by === "paragraph" && (
          <p className="mt-1 text-[0.95rem] text-error">
            {(errors as { paragraph?: FieldError }).paragraph?.message}
          </p>
        )}
      </div>
    );
  };

  const Document = () => {
    return (
      <div className="flex flex-col gap-1">
        <div className="font-semibold text-[hsl(0_0%_50%)]">Document</div>
        <div className="p-2 w-full h-[150px] bg-input-background rounded-md shadow-[inset_0_0_6px_-2px_rgba(15,15,15,0.25)]">
          <div className="cursor-pointer relative bg-input rounded-md border-2 bg-light-gray border-dotted border-dark-gray w-full h-full flex items-center justify-center shadow-[inset_0_0_6px_-2px_rgba(15,15,15,0.25)]">
            <label
              className="flex items-center justify-center w-full h-full rounded-md"
              htmlFor="file"
            >
              <div className="flex items-center gap-2 p-2 px-3 text-sm border rounded-md border-border bg-muted shadow-light">
                <LuFileUp /> Upload PDFs
              </div>
            </label>
            <input
              type="file"
              id="file"
              className="absolute w-0 h-0 opacity-0 -z-10"
              {...register("document")}
            />
          </div>
        </div>
        {isSubmitted && by === "document" && (
          <p className="mt-2 text-[0.95rem] text-center text-error">
            {(errors as { document?: FieldError }).document?.message}
          </p>
        )}
      </div>
    );
  };

  const Questions = () => {
    return (
      <div className="flex flex-col gap-1">
        <label
          className="font-semibold text-[hsl(0_0%_50%)]"
          htmlFor="Questions"
        >
          Questions
        </label>
        <input
          className="p-2 border rounded-md border-border shadow-input bg-secondary"
          type="number"
          defaultValue={5}
          id="Questions"
          placeholder="Enter questions"
          {...register("questions", {
            valueAsNumber: true,
            onBlur: () => trigger("questions"),
          })}
        />
        {errors.questions && (
          <p className="mt-1 text-[0.95rem] text-error">
            {errors.questions?.message}
          </p>
        )}
      </div>
    );
  };

  const Format = () => {
    return (
      <div className="flex flex-col gap-1">
        <div className="font-semibold text-[hsl(0_0%_50%)]">Format</div>
        <div className="flex items-center w-full border rounded-md border-border">
          <button
            onClick={() => {
              setValue("format", "mcq");
            }}
            className={`p-2 transition-colors text-secondary-foreground rounded-l-md ${
              format === "mcq" ? "bg-secondary-hover" : "bg-secondary"
            } hover:bg-secondary-hover shadow-input grow`}
          >
            MCQ
          </button>
          <button
            onClick={() => {
              setValue("format", "name");
            }}
            className={`p-2 transition-colors text-secondary-foreground border-x ${
              format === "name" ? "bg-secondary-hover" : "bg-secondary"
            } hover:bg-secondary-hover shadow-input grow`}
          >
            Name the following
          </button>
          <button
            onClick={() => {
              setValue("format", "true_false");
            }}
            className={`p-2 transition-colors text-secondary-foreground rounded-r-md ${
              format === "true_false" ? "bg-secondary-hover" : "bg-secondary"
            } hover:bg-secondary-hover shadow-input grow`}
          >
            True/False
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex max-w-[500px] -my-12 mx-auto h-full items-center justify-center p-4 pt-20">
      {isCreatingQuiz ? (
        <LoadingSpinner />
      ) : (
        <form
          className="flex flex-col w-full gap-8"
          action={"/"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col items-start gap-4">
            <h1 className="text-4xl font-semibold">Quizify</h1>
            <DropDown
              reset={reset}
              value={"Topic"}
              lists={["topic", "paragraph", "document"]}
              setValue={setValue}
            />
          </div>
          {by === "topic" && <Topic />}
          {by === "paragraph" && <Paragraph />}
          {by === "document" && <Document />}
          <Questions />
          <Format />
          <button
            className="p-2 mt-6 font-semibold transition-colors rounded-md bg-primary text-primary-foreground hover:bg-primary-hover"
            type="submit"
          >
            Submit
          </button>
          {isCreatingQuizError && (
            <p className="text-center text-error">Validation Error</p>
          )}
        </form>
      )}
    </div>
  );
};

export default Quiz;
