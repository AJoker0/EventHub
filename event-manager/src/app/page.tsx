// src/app/page.tsx
import Link from "next/link";
import { getServerSession } from "next-auth";

export default async function HomePage() {
  const session = await getServerSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
      <h1 className="text-5xl font-bold mb-6">Welcome to EventHub</h1>
      <p className="text-xl mb-12 max-w-2xl text-gray-300">
        Manage your events, find venues, and organize everything in one place.
      </p>

      {session ? (
        <div className="flex gap-4">
          <Link 
            href="/events" 
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Browse Events
          </Link>
          <Link 
            href="/events/create" 
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
          >
            Create Event
          </Link>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link 
            href="/login" 
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Login
          </Link>
          <Link 
            href="/register" 
            className="px-8 py-3 border-2 border-blue-600 text-blue-400 rounded-lg hover:bg-blue-600/10 transition font-semibold"
          >
            Register
          </Link>
        </div>
      )}
    </main>
  );
}