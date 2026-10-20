import 'next-auth';
declare module 'next-auth' {
  interface Session { accessToken?: string; userId?: string; }
  interface User { accessToken?: string; shopUserId?: string; }
}
declare module 'next-auth/jwt' {
  interface JWT { accessToken?: string; userId?: string; }
}
