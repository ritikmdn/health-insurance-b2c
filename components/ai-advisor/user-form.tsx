'use client';

import React, { FC, useState, FormEvent } from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Select from '@radix-ui/react-select';
import Textarea from 'react-textarea-autosize'
import { ChevronRight } from 'lucide-react';
import SquigglyLines from "@/components/home/squiggly-lines"

const toggleGroupItemClasses =
  'px-5 color-mauve11 data-[state=on]:bg-indigo-50/80 flex flex-grow h-[50px] items-center justify-center bg-white text-base leading-4 first:rounded-l last:rounded-r focus:z-9 focus:shadow-[0_0_0_2px] focus:shadow-none focus:outline-none';

const selectItemClasses =
  'z-10 px-5 overflow-hidden bg-transparent sm:w-[500px] w-[300px] text-center hover:bg-indigo-50/80 hover:outline-none';

interface UserFormProps {
  onFormSubmit: (details: UserDetails) => void;
}

type UserDetails = {
  gender: string;
  age: string;
  corporateCover: string;
  additionalComments: string;
};

const UserForm: FC<UserFormProps> = ({ onFormSubmit }) => {
  const [corporateCover, setCorporateCover] = useState('no');
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState("18-24");
  const [textAreaInput, setTextAreaInput] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (typeof window !== 'undefined') {
      const details = {
        gender,
        age,
        corporateCover,
        additionalComments: textAreaInput,
      };
      onFormSubmit(details); // Pass the details to the callback
    }
  };

  return (
    <>
      <h1 className="mx-auto max-w-5xl font-display text-4xl text-center font-bold tracking-normal animate-fade-up drop-shadow-sm md:text-4xl md:leading-[5rem]">
        Let&apos;s{" "}
        <span className="relative whitespace-nowrap text-blue-600">
          <SquigglyLines />
          <span className="relative">personalise</span>
        </span>{" "}
        health insurance for you!
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col items-center space-y-2'>
        <div>
          <h2 className='font-semibold py-4 text-xl'>
            What is your gender?
          </h2>
          <ToggleGroup.Root
            className="inline-flex rounded shadow-indigo-100 space-x-px relative bg-white shadow h-[50px] sm:w-[500px] w-[300px]"
            type="single"
            defaultValue="male"
            onValueChange={value => setGender(value)}
          >
            <ToggleGroup.Item className={toggleGroupItemClasses} value="male">Male</ToggleGroup.Item>
            <ToggleGroup.Item className={toggleGroupItemClasses} value="female">Female</ToggleGroup.Item>
            <ToggleGroup.Item className={toggleGroupItemClasses} value="others">Others</ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>

        <div>
          <h2 className='font-semibold py-4 text-xl'>
            What is your age?
          </h2>
          <ToggleGroup.Root
            className="inline-flex rounded shadow-indigo-100 space-x-px relative bg-white shadow h-[50px] sm:w-[500px] w-[300px]"
            type="single"
            defaultValue="18-24"
            onValueChange={value => setAge(value)}
          >
            <ToggleGroup.Item className={toggleGroupItemClasses} value="0-17">0-17</ToggleGroup.Item>
            <ToggleGroup.Item className={toggleGroupItemClasses} value="18-24">18-24</ToggleGroup.Item>
            <ToggleGroup.Item className={toggleGroupItemClasses} value="25-34">25-34</ToggleGroup.Item>
            <ToggleGroup.Item className={toggleGroupItemClasses} value="35-54">35-54</ToggleGroup.Item>
            <ToggleGroup.Item className={toggleGroupItemClasses} value="55-64">55-64</ToggleGroup.Item>
            <ToggleGroup.Item className={toggleGroupItemClasses} value="65+">65+</ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>
        <div>
          <h2 className='font-semibold py-4 text-xl'>
            Do you have a corporate cover?
          </h2>
          <ToggleGroup.Root
            className="inline-flex rounded shadow-indigo-100 space-x-px relative bg-white shadow h-[50px] sm:w-[500px] w-[300px]"
            type="single"
            defaultValue="no"
            onValueChange={value => setCorporateCover(value)}
          >
            <ToggleGroup.Item className={toggleGroupItemClasses} value="yes">Yes</ToggleGroup.Item>
            <ToggleGroup.Item className={toggleGroupItemClasses} value="no">No</ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>
        <div>
          <h2 className='font-semibold py-4 text-xl'>
            Any additional comments?
          </h2>
          <div className="relative flex min-h-[50px] max-h-[100px] sm:w-[500px] w-[300px] grow flex-col overflow-hidden bg-white sm:rounded sm:px-0 shadow shadow-indigo-100">
            <Textarea
              tabIndex={0}
              rows={3}
              value={textAreaInput}
              onChange={e => setTextAreaInput(e.target.value)}
              placeholder="Example: I want good coverage for diabetes."
              className="w-full resize-none bg-transparent py-2 focus:ring-0 focus:border-0 border-0 placeholder-gray-700/40"
            />
          </div>
        </div>
        <div className='pt-5'>
          <button type="submit" className="flex items-center mt-5 rounded-lg border justify-center font-semibold bg-blue-500 h-[50px] sm:w-[500px] w-[300px] text-sm text-white transition-all hover:bg-white hover:text-blue-500">
            Let&apos;s get started
            <ChevronRight size={16} className="ml-2" aria-hidden="true" />
          </button>
        </div>
      </form>
    </>
  );
};

export default UserForm;