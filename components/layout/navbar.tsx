"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { Phone } from 'lucide-react';

export default function NavBar() {
  const scrolled = useScroll(50);

  return (
    <div
        className={`fixed top-0 w-full flex justify-center ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/logo.png"
              alt="Simple.health logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p>Simple.health</p>
          </Link>
          <div>
              <Link href="https://bit.ly/simpleinsure_healthinsurance" target="_blank">
              <button
                className="flex items-center rounded-lg border bg-white p-1.5 px-4 text-sm text-black transition-all hover:bg-blue-500 hover:text-white"
              >
                <Phone size={16} className="mr-2" aria-hidden="true" />
                Schedule a call
              </button>
              </Link>
          </div>
        </div>
      </div>
  );
}
