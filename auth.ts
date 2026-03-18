
// Conceptual auth.ts configuration for role-based sessions
import { User, Role } from './types';

export const authConfig = {
  providers: [], // Google, Apple etc would go here
  callbacks: {
    async jwt({ token, user }: { token: any, user: any }) {
      if (user) {
        token.role = user.role || 'GUEST';
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  }
};
