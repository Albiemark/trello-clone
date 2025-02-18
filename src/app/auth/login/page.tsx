import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import Image from 'next/image'
import LoginForm from '@/components/auth/LoginForm'

export default async function LoginPage() {
  const session = await getServerSession(authOptions)
  
  if (session) {
    redirect('/board')
  }

  return (
    <div className="min-h-screen bg-[#1D2125] flex items-center justify-center">
      <div className="bg-black/30 p-8 rounded-lg w-full max-w-md">
        <div className="flex flex-col items-center space-y-6">
          <Image
            src="/media/Duque-Immigration-Logo-3.png"
            alt="Duque Immigration Services (DIS) Inc."
            width={220}
            height={76}
            className="h-12 w-auto mb-8"
            priority
          />
          <h1 className="text-2xl font-semibold text-white">Sign in to continue</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  )
} 