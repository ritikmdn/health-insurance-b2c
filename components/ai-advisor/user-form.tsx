'use client';

import React, { useState, FormEvent } from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import Textarea from 'react-textarea-autosize'

const toggleGroupItemClasses =
  'px-5 color-mauve11 data-[state=on]:bg-indigo-50/80 flex flex-grow h-[50px] items-center justify-center bg-white text-base leading-4 first:rounded-l last:rounded-r focus:z-9 focus:shadow-[0_0_0_2px] focus:shadow-none focus:outline-none';

const selectItemClasses =
  'z-10 px-5 overflow-hidden bg-transparent w-[500px] text-center hover:bg-indigo-50/80 hover:outline-none';


const UserForm: React.FC = () => {
  const [corporateCover, setCorporateCover] = useState('no');
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('young-adults');
  const [textAreaInput, setTextAreaInput] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (typeof window !== 'undefined') {
      alert(`Hello, ${age}! ${textAreaInput}! ${corporateCover}! Your preferred gender is ${gender}.`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center space-y-2'>
      <div>
        <h2 className='font-semibold py-4 text-xl'>
          What is your gender?
        </h2>
        <ToggleGroup.Root
          className="inline-flex rounded shadow-indigo-100 space-x-px relative bg-white shadow h-[50px] w-[500px]"
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
          className="inline-flex rounded shadow-indigo-100 space-x-px relative bg-white shadow h-[50px] w-[500px]"
          type="single"
          defaultValue="young-adults"
          onValueChange={value => setAge(value)}
        >
          <ToggleGroup.Item className={toggleGroupItemClasses} value="children">0-17</ToggleGroup.Item>
          <ToggleGroup.Item className={toggleGroupItemClasses} value="young-adults">18-24</ToggleGroup.Item>
          <ToggleGroup.Item className={toggleGroupItemClasses} value="adults">25-34</ToggleGroup.Item>
          <ToggleGroup.Item className={toggleGroupItemClasses} value="middle-aged-adults">35-54</ToggleGroup.Item>
          <ToggleGroup.Item className={toggleGroupItemClasses} value="baby-boomers">55-64</ToggleGroup.Item>
          <ToggleGroup.Item className={toggleGroupItemClasses} value="seniors">65+</ToggleGroup.Item>
        </ToggleGroup.Root>
      </div>
      <div>
        <h2 className='font-semibold py-4 text-xl'>
          Do you have a corporate cover?
        </h2>
        <ToggleGroup.Root
          className="inline-flex rounded shadow-indigo-100 space-x-px relative bg-white shadow h-[50px] w-[500px]"
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
        <div className="relative flex min-h-[50px] max-h-[100px] w-[500px] grow flex-col overflow-hidden bg-white sm:rounded sm:px-0 shadow shadow-indigo-100">
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
        <button type="submit" className="mt-5 rounded-lg border justify-center font-semibold bg-blue-500 h-[50px] w-[500px] text-sm text-white transition-all hover:bg-white hover:text-black">
          Submit
        </button>
      </div>
    </form>
  );
};

export default UserForm;