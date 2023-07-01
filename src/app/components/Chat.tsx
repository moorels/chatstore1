'use client'

import { Message } from '../lib/validators/message'
import { MessagesContext } from '../context/messages'
import { FC } from 'react'
import { useContext} from 'react'
import { Accordion,AccordionContent,AccordionItem, AccordionTrigger } from './ui/accordion'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import ChatMessages from './ChatMessages'
const Chat: FC = () => {

    

    

    
  return <Accordion 
  type='single' 
  collapsible 
  className='relative bg-white z-40 shadow '>
   <AccordionItem value= 'item-1'>
    <div className=' fixed right-8 w-11/12 md:w-auto bottom-8 bg-whiteborder border-gray-200 rounded-md overflow:hidden'>
        <div className='w-full h-full flex flex-col md:w-auto bg-slate-600'>
            <AccordionTrigger className='px-6 borber-b border-zinc-300 text-slate-950'>
               <ChatHeader/>
            </AccordionTrigger>
            <AccordionContent>
                <div className='flex flex-col h-[520px]'>
                    <ChatMessages className='px-2 py-3 flex-1 w'/>
                    <ChatInput className='px-4 '/>
   
                </div>
            </AccordionContent>
        </div>
    </div>
   </AccordionItem>
  </Accordion>
}

export default Chat