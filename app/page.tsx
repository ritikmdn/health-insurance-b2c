import Card from "@/components/home/card";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import { Sparkle } from 'lucide-react';
import SquigglyLines from "@/components/home/squiggly-lines"

export default async function Home() {


  return (
    <>
      <div className="z-10 w-full max-w-2xl my-3">
        {/* <a
          href="https://twitter.com/steventey/status/1613928948915920896"
          target="_blank"
          rel="noreferrer"
          className="mx-auto mb-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
        >
          <Twitter className="h-5 w-5 text-[#1d9bf0]" />
          <p className="text-sm font-semibold text-[#1d9bf0]">
            Introducing Precedent
          </p>
        </a> */}
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
    </>
  );
}

const features = [

  {
    title: "Life Insurance 101",
    description:
      "**Understand term insurance with our AI advisor**: learn its importance, grasp key concepts, and see its role in financial planning.",
      demo: (
        <button className="flex items-center rounded-lg border font-semibold bg-blue-500 p-3 px-4 text-sm text-white transition-all hover:bg-white hover:text-black">
        <Sparkle size={16} className="mr-2" aria-hidden="true" />
        Launch AI assistant
      </button>
      ),
  },
  {
    title: "Discover your ideal policy",
    description:
      "**Find the top 3 policies that suit your requirements**: our AI advisor personalises its suggestions based on what's important to you..",
      demo: (
        <button className="flex items-center rounded-lg border font-semibold bg-blue-500 p-3 px-4 text-sm text-white transition-all hover:bg-white hover:text-black">
        <Sparkle size={16} className="mr-2" aria-hidden="true" />
        Launch AI assistant
      </button>
      ),
  },
  {
    title: "Compare policies",
    description:
      "**With our AI's expertise, not only compare but question**: put policies head to head, ask questions, and unveil the nuances.",
      demo: (
        <button className="flex items-center rounded-lg border font-semibold bg-blue-500 p-3 px-4 text-sm text-white transition-all hover:bg-white hover:text-black">
        <Sparkle size={16} className="mr-2" aria-hidden="true" />
        Launch AI assistant
      </button>
      ),
  },
];
