import Link from 'next/link'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function LandingPage() {
  console.log('Landing page render start')
  const session = await getServerSession(authOptions)
  console.log('Session state:', !!session)
  
  return (
    <div className="min-h-screen bg-[#1D2125]">
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Image
              src="/media/Duque-Immigration-Logo-3.png"
              alt="Duque Immigration Services (DIS) Inc."
              width={180}
              height={62}
              className="h-8 w-auto"
              priority
            />
            <Link
              href={session ? "/board" : "/auth/login"}
              className="px-4 py-2 text-sm font-medium text-white bg-[#E31837] rounded-lg hover:bg-[#E31837]/90 transition-colors"
            >
              {session ? "Go to Board" : "Sign In"}
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Uniting Families Since 2016
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Duque Immigration Services (DIS) Inc. is a licensed Canadian immigration consulting firm 
            regulated by the College of Immigration and Citizenship Consultants (CCIC)
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <FeatureCard
              title="24 Hour Service"
              description="We offer 24 hour service to cater for clients that are from different time zones around the world."
            />
            <FeatureCard
              title="Service to All Countries"
              description="We have had many successful cases from countries around the world, such as Philippines, UAE, Saudi Arabia, Nigeria, Singapore and more!"
            />
            <FeatureCard
              title="Case Management"
              description="Track and manage immigration cases efficiently with our intuitive board system."
            />
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-800 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p>Unit 2 - 2536 Main Street, Winnipeg, Manitoba, Canada R2V 4Y1</p>
            <p className="mt-2">Phone: (204) 339 2522 | Email: info@duqueimmigration.ca</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-black/30 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
} 