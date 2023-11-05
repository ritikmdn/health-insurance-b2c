'use client'

import React, { useState } from 'react';
import UserForm from '@/components/ai-advisor/user-form';
import SquigglyLines from "@/components/home/squiggly-lines"
import Guide from '@/components/ai-advisor/guide';

// export const runtime = 'edge';

export interface UserDetails {
  gender: string;
  age: string;
  corporateCover: string;
  additionalComments: string;
}

export default function AIAdvisor() {
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const handleFormSubmit = (details: UserDetails) => {
    setUserDetails(details); // Save the user details
    setFormSubmitted(true);
  };

  return (
    <>
      <div className="z-10 w-full max-w-3xl animate-fade-up items-center p-5 py-5">
        {
          isFormSubmitted && userDetails
            ? <Guide userDetails={userDetails} />
            : <UserForm onFormSubmit={handleFormSubmit} />
        }
      </div>
    </>
  );
}