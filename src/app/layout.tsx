import "./globals.css";
import { Roboto } from "next/font/google";
import { ClerkProvider, RedirectToSignIn, SignedOut } from "@clerk/nextjs";
import { Providers } from "./Providers";
import Navbar from "@/components/Navbar";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
});

export const metadata = {
  title: "MyLessonPal",
  description: "Create classroom resources in seconds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body className={roboto.className}>
          <Providers>
            <main className="flex min-h-screen flex-col items-center justify-between">
              <Navbar />
              <div className="w-full min-h-screen relative isolate overflow-hidden bg-white px-6 pt-16  sm:px-24 xl:pt-16">
                {children}
              </div>
            </main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
