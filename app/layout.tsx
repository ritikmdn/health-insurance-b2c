import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";

export const metadata = {
  title: "Simple.life: Personalised AI Life Insurance Agent",
  description:
    "Compare life insurance policies and find the best one for you with Simple.life. Leverage AI to find various term insurance plans that are tailored to your requirements and needs",
  twitter: {
    card: "summary_large_image",
    title: "Simple.life: Personalised AI Life Insurance Agent",
    description:
      "Simple.life is your personal AI life insurance advisor that helps you find term insurance plans that are tailored to your requirements and needs.",
    creator: "@ritik_mdn11",
  },
  metadataBase: new URL("https://www.getsimple.life"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script>window.COFRAME_PAGE_ID="8e0d12c50b2c75fc3f81bcd4";</script>
        <script src='https://cdn.jsdelivr.net/npm/coframe-ai/dist/cf.min.js'></script>
      </head>
      <body className={cx(sfPro.variable, inter.variable)}>
        <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
        <Suspense fallback="...">
          <Nav />
        </Suspense>
        <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
          {children}
        </main>
        {/* <Footer /> */}
        <Analytics />
      </body>
    </html>
  );
}
