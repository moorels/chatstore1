'use client'    

import { QueryClientProvider,QueryClient } from '@tanstack/react-query'
import { ReactLoadableManifest } from 'next/dist/server/load-components'
import { FC, ReactNode } from 'react'
import { MessagesProvider } from '../context/messages'

interface ProvidersProps {
  children: ReactNode
}

const Providers: FC<ProvidersProps> = ({children}) => {

    const queryClient = new QueryClient()
  return <QueryClientProvider client={queryClient}><MessagesProvider>{children}</MessagesProvider></QueryClientProvider>
}

export default Providers