'use client'

import { useChat, type Message } from 'ai/react'
import { ChatPanel } from '@/components/home/chat-panel-home'
import useLocalStorage from '@/lib/hooks/use-local-storage'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation';

// const IS_PREVIEW = process.env.VERCEL_ENV === 'preview'
export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
}

export function ChatHome({ id, initialMessages, className }: ChatProps) {
  // const [previewToken, setPreviewToken] = useLocalStorage<string | null>(
  //   'ai-token',
  //   null
  // )
  // const [previewTokenDialog, setPreviewTokenDialog] = useState(IS_PREVIEW)
  // const [previewTokenInput, setPreviewTokenInput] = useState(previewToken ?? '')

  const router = useRouter();

  const handleChatSubmit = () => {
    const url = `${window.location.origin}/chat?input=${encodeURIComponent(input)}`;
    window.open(url);
  }

  // const { messages, append, reload, stop, isLoading, input, setInput } =
  //   useChat({
  //     initialMessages,
  //     id,
  //     body: {
  //       id,
  //       // previewToken
  //     },
  //     onResponse(response) {
  //       if (response.status === 401) {
  //         toast.error(response.statusText)
  //       }
  //     }
  //   })

  const { input, setInput } = useChat({
    id,
    body: {
      id,
    },
  });

  return (
    <>
      <ChatPanel
        // id={id}
        // isLoading={isLoading}
        // stop={stop}
        // append={append}
        // reload={reload}
        // messages={messages}
        input={input}
        setInput={setInput}
        onSubmitMessage={handleChatSubmit}
      />
    </>
  )
}
