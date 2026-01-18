import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "./lib/strapi";
const protectedRoutes = ["/dashboard"];


function isProtectedRoute(pathname: string) {
    return protectedRoutes.includes(pathname);
}

export async function proxy(request: NextRequest) {
    const currentPath = request.nextUrl.pathname;
    const isProtected = isProtectedRoute(currentPath);
    if(!isProtected) {
        return NextResponse.next();
    }

    try{
        const jwt = request.cookies.get('jwt')?.value;
        if(!jwt) {
            return NextResponse.redirect(new URL('/signin', request.url));
        }

        const response = await fetch(`${BASE_URL}/api/users/me`, {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json',
            },
        });
        const userResponse = await response.json();
        if(!userResponse){
            return NextResponse.redirect(new URL('/signin', request.url));
        }
        return NextResponse.next();
    }
    catch(error){
        console.error("Error in proxy middleware:", error);
        return NextResponse.redirect(new URL('/signin', request.url));
    }

}

export const config = {

     matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/dashboard",
    "/dashboard/:path*",
  ]
}