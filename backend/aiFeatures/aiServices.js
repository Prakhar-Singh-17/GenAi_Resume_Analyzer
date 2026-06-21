import { GoogleGenAI } from "@google/genai";
import { zodToJsonSchema } from "zod-to-json-schema";
import {z} from "zod"

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidate's profile matches the job describe",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question can be asked in the interview"),
        intention: z
          .string()
          .describe("The intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc.",
          ),
      }),
    )
    .describe(
      "Technical questions that can be asked in the interview along with their intention and how to answer them",
    ),
  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question can be asked in the interview"),
        intention: z
          .string()
          .describe("The intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc.",
          ),
      }),
    )
    .describe(
      "Behavioral questions that can be asked in the interview along with their intention and how to answer them",
    ),
  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe(
            "The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances",
          ),
      }),
    )
    .describe(
      "List of skill gaps in the candidate's profile along with their severity",
    ),
  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day number in the preparation plan, starting from 1"),
        focus: z
          .string()
          .describe(
            "The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc.",
          ),
        tasks: z
          .array(z.string())
          .describe(
            "List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.",
          ),
      }),
    )
    .describe(
      "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively",
    ),
  title: z
    .string()
    .describe(
      "The title of the job for which the interview report is generated",
    ),
});

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
    const prompt = `
You are an expert technical recruiter and interview coach.

Analyze the candidate using:
1. Resume
2. Self Description
3. Job Description

Generate a structured interview report.

IMPORTANT RULES:
- Return ONLY valid JSON.
- Follow the schema exactly.
- Do not add extra keys.
- Do not rename fields.
- Do not return markdown.
- Do not return commentary outside JSON.

The JSON must contain exactly these top-level fields:
- title
- matchScore
- summary
- technicalQuestions
- behavioralQuestions
- skillGaps
- preparationPlan

Requirements for output:
1. title:
   - the job title based on the target role / job description

2. matchScore:
   - a number from 0 to 100 indicating how well the candidate matches the role

3. summary:
   - 4-6 lines summarizing strengths, weak areas, and overall fit explain this in a 3rd person perspective without using names

4. technicalQuestions:
   - generate exactly 6 technical interview questions
   - each item must contain:
     - question
     - intention
     - answer

5. behavioralQuestions:
   - generate exactly 4 behavioral interview questions
   - each item must contain:
     - question
     - intention
     - answer

6. skillGaps:
   - generate exactly 5 skill gaps
   - each item must contain:
     - skill
     - severity
   - severity must be one of: low, medium, high

7. preparationPlan:
   - generate a 7-day preparation plan
   - each item must contain:
     - day this should be a number like 1,2,3 and not Day 1 , Day 2
     - focus
     - tasks
   - tasks must be an array of 2-4 strings

Use the resume for actual experience and projects.
Use the self description (if it is not provided use the content from resume to find relevant details) for confidence, goals, and weak areas.
Use the job description for target expectations.

RESUME:
${resume}

SELF DESCRIPTION:
${selfDescription}

JOB DESCRIPTION:
${jobDescription}
`;

 const response = await ai.models.generateContent({
  model: "gemini-3.5-flash",
  contents: prompt,
  config: {
    responseFormat: {
      text: {
        mimeType: "application/json",
        schema: zodToJsonSchema(interviewReportSchema),
      },
    },
  },
});

  return JSON.parse(response.text);
}

export default generateInterviewReport;
