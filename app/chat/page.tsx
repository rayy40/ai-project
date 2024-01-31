"use client";

import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

import DropDown from "@/components/DropDown/DropDown";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import UnAuthenticated from "@/components/UnAuthenticated/UnAuthenticated";
import Document from "@/components/Upload/Documents/Documents";
import Url from "@/components/Upload/Link/Url";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUserIdStore } from "@/providers/store";
import { chatSchema } from "@/schema/chat_schema";
import { useAuth } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { isValidUrl } from "@/helpers/utils";

type chatSchema = z.infer<typeof chatSchema>;

const Chat = () => {
  const {
    reset,
    watch,
    trigger,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<chatSchema>({
    resolver: zodResolver(chatSchema),
    mode: "onBlur",
  });
  const { isLoaded, isSignedIn } = useAuth();
  const { userId } = useUserIdStore();
  const router = useRouter();

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const createChatbook = useMutation(api.chatbook.createChatbook);

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const repo = watch("repo", "public");
  const by = watch("by", "document");

  useEffect(() => {
    if (by === "youtube") {
      trigger("youtube");
    } else if (by === "document") {
      trigger("document");
    } else if (by === "github") {
      trigger("github");
    }
  }, [by, trigger]);

  const uploadDocument = async (document: File) => {
    const uploadUrl: string = await generateUploadUrl();
    if (!isValidUrl(uploadUrl)) {
      throw new Error(uploadUrl);
    }
    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": document.type },
      body: document,
    });
    const { storageId } = await response.json();
    return storageId;
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      setIsUploading(true);
      let chatId: string | Id<"chatbook">;
      if (by === "document") {
        const storageId = await uploadDocument(data.document[0]);
        chatId = await createChatbook({
          userId: userId as Id<"users">,
          storageId,
        });
      } else {
        chatId = await createChatbook({
          userId: userId as Id<"users">,
          url: data?.[by],
        });
      }
      if (typeof chatId === "string") {
        throw new Error(chatId);
      }
      router.push(`/chat/${chatId}`);
    } catch (error) {
      setError((error as Error).message);
      setIsUploading(false);
      setValue("by", data.by);
    } finally {
      reset({
        by: data.by,
        repo: "public",
        [data.by]: data.by === "document" ? null : "",
      });
    }
  };

  if (!isLoaded && isSignedIn !== true) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isSignedIn) {
    return <UnAuthenticated />;
  }

  return (
    <div className="flex h-screen font-sans max-w-[500px] -my-12 mx-auto items-center justify-center p-4 pt-20">
      {isUploading ? (
        <LoadingSpinner />
      ) : (
        <form
          className="flex flex-col w-full gap-8"
          action={"/"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col items-start gap-4">
            <h1 className="text-4xl font-semibold font-dmSans">Chatbook</h1>
            <DropDown
              kind="chat"
              reset={reset}
              value={by}
              lists={["document", "youtube", "github"]}
              setError={setError}
              setValue={setValue}
            />
          </div>
          {by === "document" && (
            <Document
              kind="chat"
              format="document"
              errors={errors}
              register={register}
              isSubmitted={isSubmitted}
            />
          )}
          {["youtube", "github"].includes(by) && (
            <Url
              kind="chat"
              repo={repo}
              format={by}
              errors={errors}
              register={register}
              setValue={setValue}
              isSubmitted={isSubmitted}
            />
          )}
          <button
            className="p-2 font-semibold transition-colors rounded-md bg-primary text-primary-foreground hover:bg-primary-hover"
            type="submit"
          >
            Submit
          </button>
          {error && <p className="text-center text-error">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default Chat;
