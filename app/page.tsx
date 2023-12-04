import { ChatHome } from '@/components/home/chat-home'

// export const runtime = 'edge'

import Card from "@/components/home/card";
import ComponentGrid from "@/components/home/component-grid";
import { Sparkle } from 'lucide-react';
import { FlaskConical } from 'lucide-react';
import SquigglyLines from "@/components/home/squiggly-lines"
import Link from 'next/link'

export default async function Home() {

  return (
    <>
      <div className="w-full max-w-2xl my-3">
        <h1 className="mx-auto max-w-4xl font-display text-5xl text-center font-bold tracking-normal animate-fade-up drop-shadow-sm [text-wrap:balance] md:text-6xl md:leading-[5rem]">
          Insurance{" "}
          <span className="relative whitespace-nowrap text-blue-600">
            <SquigglyLines />
            <span className="relative">Simplified</span>
          </span>{" "}
          Thanks to AI.
        </h1>
        <p
          className="mt-4 animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Get personalised guidance and not sales pitches. Discover your ideal policy and get contextualised answers, minus the unwanted calls.
        </p>
      </div>
      <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-10 px-5 md:grid-cols-3 xl:px-0">
        {/* <div className="my-10 grid w-50% max-w-screen-xl animate-fade-up grid-cols-1 gap-10 px-5 md:grid-cols-1 xl:px-0"> */}
        {features.map(({ title, description, demo }) => (
          <Card
            key={title}
            title={title}
            description={description}
            demo={
              title === "Beautiful, reusable components" ? (
                <ComponentGrid />
              ) : (
                demo
              )
            }
          />
        ))}
      </div>
      <ChatHome />
    </>
  );
}

const features = [

  {
    title: "Health Insurance 101",
    description:
      "**Understand health insurance with our AI advisor**: learn its importance, grasp key concepts, and see its role in financial planning.",
    demo: (
      //   <Link href="/ai-advisor">
      //   <button className="flex items-center rounded-lg border font-semibold bg-blue-500 p-3 px-4 text-sm text-white transition-all hover:bg-white hover:text-blue-500">
      //   <Sparkle size={16} className="mr-2" aria-hidden="true" />
      //   Launch AI Assistant
      // </button>
      // </Link>

      <Link href="https://docs.google.com/forms/d/e/1FAIpQLScfjSwjjFSfR19jYSPV4Jwusfl2AoNM2NHubEYIrLSuT3r_kQ/viewform?usp=sf_link" target="_blank">
        <button className="flex items-center rounded-lg border font-semibold hover:bg-blue-500 p-3 px-4 text-sm hover:text-white transition-all bg-white text-blue-500">
          <FlaskConical size={16} className="mr-2" aria-hidden="true" />
          Join Waitlist
        </button>
      </Link>
    ),
  },
  {
    title: "Discover your ideal policy",
    description:
      "**Find the top 3 policies that suit your requirements**: our AI advisor personalises its suggestions based on what's important to you.",
    demo: (
      <Link href="https://docs.google.com/forms/d/e/1FAIpQLScfjSwjjFSfR19jYSPV4Jwusfl2AoNM2NHubEYIrLSuT3r_kQ/viewform?usp=sf_link" target="_blank">
        <button className="flex items-center rounded-lg border font-semibold hover:bg-blue-500 p-3 px-4 text-sm hover:text-white transition-all bg-white text-blue-500">
          <FlaskConical size={16} className="mr-2" aria-hidden="true" />
          Join Waitlist
        </button>
      </Link>
    ),
  },
  {
    title: "Compare policies",
    description:
      "**With our AI's expertise, not only compare but question**: put policies head to head, ask questions, and unveil the nuances.",
    demo: (
      <Link href="https://docs.google.com/forms/d/e/1FAIpQLScfjSwjjFSfR19jYSPV4Jwusfl2AoNM2NHubEYIrLSuT3r_kQ/viewform?usp=sf_link" target="_blank">
        <button className="flex items-center rounded-lg border font-semibold hover:bg-blue-500 p-3 px-4 text-sm hover:text-white transition-all bg-white text-blue-500">
          <FlaskConical size={16} className="mr-2" aria-hidden="true" />
          Join Waitlist
        </button>
      </Link>
    ),
  },
];