import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { request } from '@/lib/api';

const credentials = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type StoreUser = {
  _id?: string;
  id?: string;
  name: string;
  email: string;
};

type SignInResponse = { token: string; user: StoreUser };
type ProfileResponse = {
  data?: { _id?: string; id?: string; user?: { _id?: string; id?: string } };
  user?: { _id?: string; id?: string };
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(raw) {
        const parsed = credentials.safeParse(raw);
        if (!parsed.success) return null;

        try {
          const result = await request<SignInResponse>('/auth/signin', {
            method: 'POST',
            body: JSON.stringify(parsed.data),
          });
          if (!result.token || !result.user?.email) return null;

          let userId: string | undefined = result.user._id || result.user.id;
          if (!userId) {
            try {
              const profile = await request<ProfileResponse>(
                '/users/getMe',
                {},
                result.token,
              );
              userId =
                profile.data?._id ||
                profile.data?.id ||
                profile.data?.user?._id ||
                profile.data?.user?.id ||
                profile.user?._id ||
                profile.user?.id;
            } catch {
              // Logging in should still work if the profile endpoint is unavailable.
            }
          }

          return {
            id: userId || result.user.email,
            name: result.user.name,
            email: result.user.email,
            accessToken: result.token,
            shopUserId: userId,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user && typeof user.accessToken === 'string') {
        token.accessToken = user.accessToken;
      }
      if (user && typeof user.shopUserId === 'string') {
        token.userId = user.shopUserId;
      }
      return token;
    },
    session({ session, token }) {
      if (typeof token.accessToken === 'string') {
        session.accessToken = token.accessToken;
      }
      if (typeof token.userId === 'string') {
        session.userId = token.userId;
      }
      return session;
    },
  },
});
