import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Public routes that don't require authentication
const publicRoutes = ["/", "/api/auth"];

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Allow public routes
	if (publicRoutes.some((route) => pathname.startsWith(route))) {
		const response = NextResponse.next();
		response.headers.set("x-pathname", pathname);
		return response;
	}

	// Add pathname to headers for server components
	const response = NextResponse.next();
	response.headers.set("x-pathname", pathname);

	// For protected routes, you can add session checks here
	// Example: Check for session token in cookies
	// const token = request.cookies.get("next-auth.session-token");
	// if (!token) {
	//   return NextResponse.redirect(new URL("/", request.url));
	// }

	return response;
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public files (public folder)
		 */
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
