import { type UseChatHelpers } from 'ai/react'
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/chat/prompt-form'
import { ButtonScrollToBottom } from '@/components/chat/button-scroll-to-bottom'
import { IconRefresh, IconStop } from '@/components/ui/icons'
import { toast } from 'react-hot-toast';

const supabase = createClient();

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | 'append'
    | 'isLoading'
    | 'reload'
    | 'messages'
    | 'stop'
    | 'input'
    | 'setInput'
  > {
  id?: string,
  onSubmitMessage?: () => void
}

export function ChatPanel({
  id,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages,
  onSubmitMessage 
}: ChatPanelProps) {

  const handleSubmit = async (value: string) => {
    await append({
      id,
      content: value,
      role: 'user',
    });

    setInput("");

    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      console.log("it was here")
      const { data, error } = await supabase
        .from('chat_user_inputs')
        .insert([
          { user_id: user.id, input: value }
        ]);

      if (error) {
        console.error('Error saving message to Supabase:', error);
        toast.error('Error saving message');
      }
    }

    if (onSubmitMessage) {
      onSubmitMessage();
    }
  };

  return (
    <div className="z-10 fixed inset-x-0 bottom-4 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="flex h-10 items-center justify-center">
          {isLoading ? (
            <Button
              variant="outline"
              onClick={() => stop()}
              className="bg-white"
            >
              <IconStop className="mr-2" />
              Stop generating
            </Button>
          ) : (
            messages?.length > 0 && (
              <Button
                variant="outline"
                onClick={() => reload()}
                className="bg-white"
              >
                <IconRefresh className="mr-2" />
                Regenerate response
              </Button>
            )
          )}
        </div>
        <div className="space-y-2 bg-indigo-50/80 px-2 py-1 shadow-lg sm:rounded-md md:py-2">
          <PromptForm
            onSubmit={handleSubmit}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
