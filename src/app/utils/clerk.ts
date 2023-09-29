import "dotenv/config";
import { currentUser } from "@clerk/nextjs";
import clerk from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";
export const checkClerk = async () => {
  const user = await currentUser();
  const clerkUserId = user?.id;
  const clerkUserName = user?.firstName;
  if (
    !clerkUserId ||
    !clerkUserName ||
    !!!(await clerk.users.getUser(clerkUserId))
  ) {
    console.log("user not authorized");
    return new NextResponse(
      JSON.stringify({ Message: "User not authorized" }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
export const getUserList = async () => {
  return clerk.users.getUserList();
};

export const getUser = async (userId: string) => {
  return clerk.users.getUser(userId);
};
