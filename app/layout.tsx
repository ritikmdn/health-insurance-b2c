import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";

export const metadata = {
  title: "Simple.health: Personalised AI Health Insurance Agent",
  description:
    "Compare health insurance policies and find the best one for you with Simple.health. Leverage AI to find various health insurance plans that are tailored to your requirements and needs",
  twitter: {
    card: "summary_large_image",
    title: "Simple.health: Personalised AI Health Insurance Agent",
    description:
      "Simple.health is your personal AI health insurance advisor that helps you find health insurance plans that are tailored to your requirements and needs.",
    creator: "@ritik_mdn11",
  },
  metadataBase: new URL("https://www.getsimple.health"),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cx(sfPro.variable, inter.variable)}>
        <div className="fixed -z-10 h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
        <Suspense fallback="...">
          <Nav />
        </Suspense>
        <main className="flex min-h-screen w-full flex-col items-center justify-center pt-[10vh] md:pt-[3vh]">
          {children}
        </main>
        {/* <Footer /> */}
        <Analytics />
      </body>
    </html>
  );
}
