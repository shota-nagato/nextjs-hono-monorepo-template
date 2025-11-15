'use client'
import { createAuthClient } from 'better-auth/react'

const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  basePath: '/api/v1/auth',
  fetchOptions: {
    credentials: 'include', // Required for sending cookies cross-origin
  },
})

export const { signIn, signUp, signOut, getSession, useSession } = authClient
