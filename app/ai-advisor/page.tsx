'use client'

import React, { useState } from 'react';
import UserForm from '@/components/ai-advisor/user-form';
import SquigglyLines from "@/components/home/squiggly-lines"
import Guide from '@/components/ai-advisor/guide';

export const runtime = 'edge';

export default function AIAdvisor() {
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  return (
    <>
      <div className="z-10 w-full max-w-3xl animate-fade-up items-center p-5 py-5">
        {
          isFormSubmitted
            ? <Guide />
            : <UserForm onFormSubmit={() => setFormSubmitted(true)} />
        }
      </div>
    </>
  );
}