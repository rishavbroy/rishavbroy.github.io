import { defineCollection, z } from "astro:content";

const optionalUrl = z.union([z.string().url(), z.literal("")]).optional();

const projectLinksSchema = z
  .object({
    github: optionalUrl,
    paper: optionalUrl,
    slides: optionalUrl,
    poster: optionalUrl,
    code: optionalUrl,
    website: optionalUrl
  })
  .default({});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    status: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(999),
    topics: z.array(z.string()).default([]),
    skills: z.array(z.string()).default([]),
    question: z.string(),
    shortDescription: z.string(),
    links: projectLinksSchema
  })
});

const courses = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    semester: z.string(),
    termOrder: z.number(),
    grade: z.string().optional(),
    achievements: z.array(z.string()).default([]),
    types: z.array(z.string()).default([]),
    skills: z.array(z.string()).default([]),
    syllabusUrl: optionalUrl,
    featured: z.boolean().default(false),
    order: z.number().default(999)
  })
});

export const collections = { projects, courses };
