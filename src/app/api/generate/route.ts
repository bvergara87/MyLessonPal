import { OpenAI } from "langchain/llms/openai";
import dotenv from "dotenv";
import { LLMChain } from "langchain/chains";
import { CallbackManager } from "langchain/callbacks";
import { PromptTemplate } from "langchain/prompts";
import { NextResponse } from "next/server";
import { generatePrompt, regeneratePrompt } from "@/app/utils/prompts";
import { LangChainStream } from "ai";
import RedisManager from "@/app/utils/redis";

export async function POST(req: Request) {
  const { promptInput, userId, userName } = await req.json();
  const {
    selectedTypes,
    subject,
    gradeLevel,
    topic,
    additionalNotes,
    context,
    selection,
    regen,
  } = promptInput;
  const redis = await new RedisManager();
  const { stream, handlers } = LangChainStream();
  const outputs: {
    type: string;
    text: string;
    subject: string;
    topic: string;
    gradeLevel: string;
    additionalNotes: string;
  }[] = [];
  let isTest = false;
  for (let i = 0; i < selectedTypes.length; ++i) {
    const type = selectedTypes[i];
    const chainPrompt = PromptTemplate.fromTemplate(
      regen
        ? regeneratePrompt(
            type,
            subject,
            gradeLevel,
            topic,
            additionalNotes,
            context,
            selection
          )
        : generatePrompt(
            type,
            subject,
            gradeLevel,
            topic,
            additionalNotes,
            context,
            selection
          )
    );
    const model = new OpenAI({
      // modelName: "gpt-4",
      modelName: type === "test" || regen ? "gpt-4" : "gpt-3.5-turbo-16k-0613",
      openAIApiKey: process.env.OPENAI_API_KEY,
      callbackManager: CallbackManager.fromHandlers(handlers),
    });
    console.log(chainPrompt);
    const chain = new LLMChain({
      llm: model,
      prompt: chainPrompt,
    });

    const result = await chain
      .call({
        type,
        subject,
        gradeLevel,
        topic,
        additionalNotes,
      })
      .catch(console.error);

    outputs.push({
      type,
      //@ts-ignore
      text: `<html><p style="white-space: 'pre';">${result.text.replace(
        /\n/g,
        "<br/>"
      )}</p></html>`,
      subject,
      topic,
      gradeLevel,
      additionalNotes,
    });
    //@ts-ignore
  }
  return redis.addGeneration(outputs).then(({ outputs, id }) => {
    return NextResponse.json({
      //@ts-ignore
      outputs,
      id,
    });
  });
}
