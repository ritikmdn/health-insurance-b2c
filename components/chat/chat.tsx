'use client'

import { useChat, type Message } from 'ai/react'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat/chat-list'
import { ChatPanel } from '@/components/chat/chat-panel'
import { EmptyScreen } from '@/components/chat/empty-screen'
import { ChatScrollAnchor } from '@/components/chat/chat-scroll-anchor'
import useLocalStorage from '@/lib/hooks/use-local-storage'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react';

// const IS_PREVIEW = process.env.VERCEL_ENV === 'preview'
export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
}

export function Chat({ id, initialMessages, className }: ChatProps) {
  // console.log("Chat component rendered.");
  const searchParams = useSearchParams()
  const initialMessage = searchParams.get("input")
  // console.log("URL Initial Message:", initialMessage);
  // const [previewToken, setPreviewToken] = useLocalStorage<string | null>(
  //   'ai-token',
  //   null
  // )
  // const [previewTokenDialog, setPreviewTokenDialog] = useState(IS_PREVIEW)
  // const [previewTokenInput, setPreviewTokenInput] = useState(previewToken ?? '')
  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      initialMessages,
      id,
      body: {
        id,
        // previewToken
      },
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText)
        }
      }
    })

    useEffect(() => {
      console.log("useEffect executed. Initial message:", initialMessage);
      if (initialMessage) {
        setInput(initialMessage as string)
        console.log("Input state updated:", input);
        
        append({ content: initialMessage as string, role: 'user' });
        console.log("Message appended");
      }
    }, [])
  

  return (
    <>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <EmptyScreen setInput={setInput} />
        )}
      </div>
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
      />
    </>
  )
}
