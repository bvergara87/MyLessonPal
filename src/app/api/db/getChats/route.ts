import dotenv from "dotenv";
dotenv.config({
  path: process.env.NODE_ENV === "production" ? `.env.prod` : `.env.local`,
});
import RedisManager from "@/app/utils/redis";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const { id } = await req.json();
  const redis = await new RedisManager();
  return redis.getGeneration(id).then((arr) => {
    return NextResponse.json(arr);
  });
}
