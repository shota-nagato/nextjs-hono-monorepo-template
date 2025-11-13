'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { signIn } from '@/auth-client'
import { toast } from 'sonner'

const schema = z.object({
  email: z.string().email('正しいメールアドレスを入力してください'),
  password: z.string().min(8, 'パスワードは8文字以上で入力してください'),
})

export function usePasswordLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  })

  const login = async (data: z.infer<typeof schema>) => {
    setIsLoading(true)
    const result = await signIn.email({
      email: data.email,
      password: data.password,
    })

    if (result?.error) {
      toast.error(result.error.message || 'ログインに失敗しました')
      setIsLoading(false)
    } else {
      router.push('/dashboard')
      setIsLoading(false)
      toast.success('ログインしました')
    }
  }

  return {
    isLoading,
    form,
    login,
  }
}
