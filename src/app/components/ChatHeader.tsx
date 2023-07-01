
/* eslint-disable @next/next/no-img-element */
import { FC, useContext } from 'react'

interface ChatHeaderProps {
  
}

const ChatHeader: FC<ChatHeaderProps> = ({}) => {



  return <div className=' w-96 flex gap-3 justify-start items-center text-zinc-800'>
    <div className='flex flex-col items-start text-sm md:w-auto'>
    <p className=' text-sm text-white'>Click Here to Chat:</p>
    <div className='flex items-center md:w-auto'>
        <p className='w-3 h-3 rounded-full bg-green-500 animate-pulse'/>
        <p className='font-medium px-2 text-white '>Computer Store and Repairs</p>
        
    </div>
    </div>
    
    </div>
}

export default ChatHeader