import { currentUser } from "@clerk/nextjs";
import LandingPage from "@/components/LandingPage";
export default async function Home() {
  return <LandingPage />;
}
