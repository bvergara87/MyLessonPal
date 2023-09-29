import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div
      className=" flex items-center justify-center"
      style={{ height: "75vh" }}
    >
      <SignIn />
    </div>
  );
}
