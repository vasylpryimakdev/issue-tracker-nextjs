import NextAuth from "next-auth";

const handler = NextAuth({ providers: [] });

export { handler as POST, handler as GET };
