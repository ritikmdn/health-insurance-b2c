import { type UseChatHelpers } from 'ai/react';
import { PromptForm } from '@/components/chat/prompt-form';

export interface ChatPanelProps extends Pick<UseChatHelpers, 'input' | 'setInput'> {
  onSubmitMessage: () => void; 
}

export function ChatPanel({
  input,
  setInput,
  onSubmitMessage,
}: ChatPanelProps) {
  return (
    <div className="fixed inset-x-0 bottom-4 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="space-y-2 bg-indigo-50/80 px-2 py-1 shadow-lg sm:rounded-md md:py-2">
          <PromptForm
            onSubmit={async value => {
              setInput(""); // Clear the input
              if (onSubmitMessage) {
                onSubmitMessage(); // Redirect
              }
            }}
            input={input}
            setInput={setInput}
            isLoading={false}
          />
        </div>
      </div>
    </div>
  );
}
