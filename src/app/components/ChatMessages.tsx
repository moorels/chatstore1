"use client"
import { FC, HTMLAttributes, useContext } from 'react'
import { MessagesContext } from '../context/messages'
import { cn } from '../lib/utils'

 
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {  a11yDark} from 'react-syntax-highlighter/dist/esm/styles/prism';
interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> {}

const ChatMessages: FC<ChatMessagesProps> = ({ className, ...props }) => {
  const { messages } = useContext(MessagesContext)
  const inverseMessages = [...messages].reverse()

  return (
    <div
      {...props}
      className={cn(
        ' bg-slate-600 flex flex-col-reverse gap-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch',
        className
      )}>
      <div className='flex-1 flex-grow ' />
      {inverseMessages.map((message) => {
        return (
          <div className='chat-message  h-96' key={`${message.id}-${message.id}`}>
            <div
              className={cn('flex items-end', {
                'justify-end': message.isUserMessage,
              })}>
              <div
                className={cn('flex flex-col space-y-2 text-sm w-full mx-2 overflow-x-hidden ', {
                  'order-1 items-end': message.isUserMessage,
                  'order-2 items-start': !message.isUserMessage,
                })}>
                <p
                  className={cn('px-2 py-1 rounded-lg text-[13px] font-extrabold', {
                    'bg-gray-200 text-white': message.isUserMessage,
                    'bg-gray-200 text-gray-900': !message.isUserMessage,
                  })}><SyntaxHighlighter  className={<p
                    className={cn('px-2 py-1 rounded-lg ', {
                      'bg-gray-200 text-white': message.isUserMessage,
                      'bg-gray-200 text-gray-900': !message.isUserMessage,
                    })}/>} wrapLongLines={true} >
                    
                  {message.text} </SyntaxHighlighter> 
                </p>
                
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ChatMessages