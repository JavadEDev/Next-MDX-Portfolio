'use client'

import * as React from 'react'
import { NextUIProvider } from '@nextui-org/system'
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
export interface ProvidersProps {
  children: React.ReactNode
  themeProps?: ThemeProviderProps
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter()

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        {children}
        <ToastProvider />
      </NextThemesProvider>
    </NextUIProvider>
  )
}

function ToastProvider() {
  const { resolvedTheme } = useTheme()

  return (
    <ToastContainer
      closeOnClick
      draggable
      pauseOnFocusLoss
      pauseOnHover
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      position='top-right'
      rtl={false}
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
    />
  )
}
