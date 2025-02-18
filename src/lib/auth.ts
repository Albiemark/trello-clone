import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log('Auth redirect:', { url, baseUrl })
      const redirectUrl = url.startsWith(baseUrl) ? url : `${baseUrl}/board`
      console.log('Redirecting to:', redirectUrl)
      return redirectUrl
    },
    async session({ session, token }) {
      console.log('Session callback:', { session, token })
      return session
    },
  },
  events: {
    signOut: async (message) => {
      console.log('Sign out event:', message)
    },
  },
} 