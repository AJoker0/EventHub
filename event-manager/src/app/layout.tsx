import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { getServerSession } from "next-auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EventHub",
  description: "Event management app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-900 text-white">
        <header className="w-full bg-gray-800/90 backdrop-blur sticky top-0 z-20">
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white">EventHub</Link>

            <nav className="flex items-center gap-3">
              <Link href="/events" className="px-3 py-1 rounded hover:bg-gray-700">Events</Link>
              <Link href="/events/create" className="px-3 py-1 rounded hover:bg-gray-700">Create</Link>
              {session ? (
                <>
                  <span className="px-3 py-1 text-sm text-gray-300">{session.user?.name || session.user?.email}</span>
                  <Link href="/api/auth/signout" className="px-3 py-1 rounded border border-red-500 text-red-400 hover:bg-red-700/40">Logout</Link>
                </>
              ) : (
                <>
                  <Link href="/login" className="px-3 py-1 rounded hover:bg-gray-700">Login</Link>
                  <Link href="/register" className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white">Register</Link>
                </>
              )}
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
