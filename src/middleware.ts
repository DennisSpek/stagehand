import authConfig from "./auth.config"
import NextAuth from "next-auth"

const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req: NextRequest) {
  // Middleware to redirect unauthenticated users to the login page/default '/' page
    if (!req.auth && req.nextUrl.pathname !== "/") {
      const newUrl = new URL("/", req.nextUrl.origin)
      return Response.redirect(newUrl)
    }
})

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|^/$).*)',
  ],
}