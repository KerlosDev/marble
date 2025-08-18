import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const COOKIE_NAME = 'granet-admin-session';
const SESSION_SECRET = process.env.SESSION_SECRET || 'fallback-secret-key-12345678';

// Check if the admin is authenticated
export function isAuthenticated() {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get(COOKIE_NAME);

    if (!sessionCookie) {
        return false;
    }

    // In a real app, you would verify a signed token or session
    // For this simple demo, we'll just check if the cookie exists and has the expected value
    return sessionCookie.value === SESSION_SECRET;
}

// Login the admin and set the session cookie
export function loginAdmin(password) {
    if (password !== ADMIN_PASSWORD) {
        return false;
    }

    // Set the cookie
    cookies().set({
        name: COOKIE_NAME,
        value: SESSION_SECRET,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
    });

    return true;
}

// Logout the admin and clear the session cookie
export function logoutAdmin() {
    cookies().delete(COOKIE_NAME);
    return true;
}

// Middleware to protect routes
export async function adminAuthMiddleware() {
    if (!isAuthenticated()) {
        return NextResponse.json(
            { message: 'Unauthorized access' },
            { status: 401 }
        );
    }

    return null; // Continue with the request
}
