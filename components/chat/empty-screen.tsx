import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: 'Waiting period',
    message: 'What is waiting period in health insurance policies?'
  },
  {
    heading: 'Maternity benefits',
    message: 'Is maternity cover included in the health plan? What expenses are covered by the maternity benefit in health insurance?'
  },
  {
    heading: 'Tax benefits of health insurance',
    message: 'What is the maximum deduction under Section 80D for health insurance plans?'
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Hey, I&apos;m Simple AI Insurance Advisor 👋
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          I&apos;m here to answer your queries related to health insurance.
        </p>
        <p className="leading-normal text-muted-foreground">
          You can start a conversation directly or try the following examples:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
        <p className="mt-4 leading-normal text-gray italic">
          Note: The AI advisor is experimental and can make mistakes. We recommend talking to a professional advisor before purchasing an insurance policy.   
        </p>
      </div>
    </div>
  )
}