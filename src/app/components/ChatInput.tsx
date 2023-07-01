'use client'
import { useContext, useRef, useState } from 'react'
import { FC, HTMLAttributes,  } from 'react'
import { cn } from '../lib/utils'
import TextareaAutosize from 'react-textarea-autosize' 
import {useMutation}    from '@tanstack/react-query'
import { nanoid } from 'nanoid'
import { Message } from '../lib/validators/message'
import { MessagesContext } from '../context/messages'

interface ChatInputProps extends HTMLAttributes<HTMLDivElement>{
  
}

const ChatInput: FC<ChatInputProps> = ({className,...props}) => {

const [input,setInput] = useState<string>('')

const {messages,addMessage,removeMessage,setIsMessageUpdating,updateMessage} = useContext(MessagesContext)

const textareaRef = useRef<null | HTMLTextAreaElement>(null)
const {mutate: sendMessage, isLoading} = useMutation({
mutationFn: async (message: Message) => {
const res = await fetch('/api/message', {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({messages: [message]})
})
return res.body
},

onMutate(message) {
    addMessage(message)
},


onSuccess: async (stream) => {
    if(!stream ) throw new Error('No Steam Found')

    const id = nanoid()
    const responseMessage: Message = {
        id,
        isUserMessage: false,
        text: ''
    }

    addMessage(responseMessage)

    setIsMessageUpdating(true)

    const reader = stream.getReader()
    const decoder = new TextDecoder()  
    let done = false 

 

    while (!done) {
        const {value, done: doneReading} = await reader.read()
        done = doneReading
        const chunkValue = decoder.decode(value)
        updateMessage(id, (prev) => prev + chunkValue)
    }

    setIsMessageUpdating(false)
    setInput('')
    setTimeout(()=> {
        textareaRef.current?.focus()
    },10)
}
})


  return <div {...props} className={cn('border-tborder-zinc-300', className)}>
    <div className='relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none text-white'>
        
<TextareaAutosize 
ref={textareaRef}
rows={2}
onKeyDown={(e) => {
    if(e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const message = {
            id: nanoid(),
            isUserMessage: true,
            text: input
        }
        sendMessage(message)
    }
}}
maxRows={4}
autoFocus
value={input}
onChange={(e) => setInput(e.target.value)}
placeholder='How May We Assist You Today ?'
className=' pr-14 resize-none w-full block border-0 bg-slate-100 text-black py-1.5 
focus:ring-0 text-sm sm:leading-6'
/>
    </div>
    
  
  </div>
}

export default ChatInput