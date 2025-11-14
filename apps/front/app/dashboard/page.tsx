'use client'

import { useSession, signOut } from '../../auth-client'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { data: session, isPending } = useSession()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/login')
    } catch (error) {
      console.error('ログアウトエラー:', error)
    }
  }

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">読み込み中...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">
          ダッシュボード
        </h1>

        {session?.user ? (
          <div className="text-center space-y-4">
            <div className="text-green-600 text-lg font-semibold mb-2">
              ログインしています
            </div>
            <p className="text-black">
              ユーザー: {session.user.name || session.user.email}
            </p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              ログアウト
            </button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-red-600 text-lg font-semibold mb-2">
              ログインしていません
            </div>
            <p className="text-black">ログインページに移動してください</p>
            <button
              onClick={() => router.push('/login')}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              ログインページへ
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
