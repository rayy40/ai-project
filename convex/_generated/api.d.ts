/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.12.0.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as ai_embedding from "../ai/embedding.js";
import type * as ai_gemini from "../ai/gemini.js";
import type * as ai_openai from "../ai/openai.js";
import type * as auth_auth from "../auth/auth.js";
import type * as auth_users from "../auth/users.js";
import type * as chatbook_chat from "../chatbook/chat.js";
import type * as chatbook_chunks from "../chatbook/chunks.js";
import type * as chatbook_conversations from "../chatbook/conversations.js";
import type * as chatbook_documentation from "../chatbook/documentation.js";
import type * as chatbook_files from "../chatbook/files.js";
import type * as chatbook_github from "../chatbook/github.js";
import type * as chatbook_search from "../chatbook/search.js";
import type * as chatbook_youtube from "../chatbook/youtube.js";
import type * as http from "../http.js";
import type * as langchain_db from "../langchain/db.js";
import type * as lib_adapter from "../lib/adapter.js";
import type * as lib_files from "../lib/files.js";
import type * as lib_utils from "../lib/utils.js";
import type * as quizify_quiz from "../quizify/quiz.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "ai/embedding": typeof ai_embedding;
  "ai/gemini": typeof ai_gemini;
  "ai/openai": typeof ai_openai;
  "auth/auth": typeof auth_auth;
  "auth/users": typeof auth_users;
  "chatbook/chat": typeof chatbook_chat;
  "chatbook/chunks": typeof chatbook_chunks;
  "chatbook/conversations": typeof chatbook_conversations;
  "chatbook/documentation": typeof chatbook_documentation;
  "chatbook/files": typeof chatbook_files;
  "chatbook/github": typeof chatbook_github;
  "chatbook/search": typeof chatbook_search;
  "chatbook/youtube": typeof chatbook_youtube;
  http: typeof http;
  "langchain/db": typeof langchain_db;
  "lib/adapter": typeof lib_adapter;
  "lib/files": typeof lib_files;
  "lib/utils": typeof lib_utils;
  "quizify/quiz": typeof quizify_quiz;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
