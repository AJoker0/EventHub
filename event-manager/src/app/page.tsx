// src/app/page.tsx
import Link from "next/link";
import { getServerSession } from "next-auth";

export default async function HomePage() {
  // Check if user is authenticated using NextAuth
  const session = await getServerSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
      <h1 className="text-5xl font-bold mb-6">Welcome to Event Manager</h1>
      <p className="text-xl mb-12 max-w-2xl">
        Manage your events, find venues, and organize everything in one place.
      </p>

      <div className="flex gap-4">
        {session ? (
          // Navigation links for LOGGED IN users
          <>
            <Link 
              href="/events" 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Browse Events
            </Link>
            <Link 
              href="/events/create" 
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Create New Event
            </Link>
            <Link 
              href="/api/auth/signout" 
              className="px-6 py-3 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition"
            >
              Logout
            </Link>
          </>
        ) : (
          // Navigation links for GUESTS
          <>
            <Link 
              href="/login" 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </main>
  );
}