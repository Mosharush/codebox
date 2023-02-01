import { FastifySchema } from "fastify";
import { FromSchema } from "json-schema-to-ts";

// Params Schema
const paramsSchema = {
  type: "string",
  require: ["lang"],
  properties: {
    lang: { type: "string" },
  },
  additionalProperties: false,
} as const;

export type Params = FromSchema<typeof paramsSchema>;

// Body Schema
export const bodySchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    title: { type: "string" },
    published: { type: "boolean" },
    content: { type: "string" },
    tags: { type: "array", items: { type: "string" } },
    deleted: { type: "boolean" },
  },
  required: ["title", "published", "content", "tags", "deleted"],
} as const;

export type Body = FromSchema<typeof bodySchema>;

// Reply Schema
const replySchema = {
  type: "object",
  properties: {
    // Return array of "post" object
    posts: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "number" },
          title: { type: "string" },
          published: { type: "boolean" },
          content: { type: "string" },
          tags: { type: "array", items: { type: "string" } },
          deleted: { type: "boolean" },
        },
        required: ["title", "published", "content", "tags", "deleted"],
      },
    },
  },
  additionalProperties: false,
} as const;

export type Reply = FromSchema<typeof replySchema>;

// ReplyNotFound Schema
export const postNotFoundSchema = {
  type: "object",
  required: ["error"],
  properties: {
    error: { type: "string" },
  },
  additionalProperties: false,
} as const;

export type ReplyNotFound = FromSchema<typeof postNotFoundSchema>;
