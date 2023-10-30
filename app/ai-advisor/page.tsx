import React from 'react';
import UserForm from '@/components/ai-advisor/user-form';
import SquigglyLines from "@/components/home/squiggly-lines"

export const runtime = 'edge';

export default function AIAdvisor() {
  return (
    <>
      <h1 className="mx-auto max-w-4xl font-display text-4xl text-center font-bold tracking-normal animate-fade-up drop-shadow-sm md:text-4xl md:leading-[5rem]">
        Let&apos;s{" "}
        <span className="relative whitespace-nowrap text-blue-600">
          <SquigglyLines />
          <span className="relative">personalise</span>
        </span>{" "}
        health insurance for you!
      </h1>
      <div className="z-10 w-full max-w-2xl animate-fade-up items-center p-5 py-5">
        <UserForm />
      </div>
    </>
  );
}