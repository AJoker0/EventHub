// src/app/events/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteButton from "./DeleteButton";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>; // Updated to Promise
}) {
  // Await the params to get the ID correctly in the new Next.js version
  const resolvedParams = await params;
  const eventId = resolvedParams.id;

  // Fetch the single record from database using the resolved ID
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: { creator: true }, // Include creator details
  });

  if (!event) {
    notFound(); 
  }

  // Get current session to check ownership
  const session = await getServerSession();
  let isOwner = false;

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    // Check if the current user created this specific event
    isOwner = user?.id === event.creatorId;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 text-white">
      <div className="mb-6">
        <Link href="/events" className="text-sm text-gray-300 hover:underline">
          ← Back to events
        </Link>
      </div>

      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg border border-gray-700">
        <h1 className="text-4xl font-bold mb-6">{event.title}</h1>
        
        <div className="space-y-4 mb-8 text-sm text-gray-300">
          <p>📍 <strong>Venue:</strong> {event.venue}</p>
          <p>📅 <strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
          <p>💰 <strong>Ticket Price:</strong> ${event.ticketPrice.toFixed(2)}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3">About this event</h2>
          <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{event.description}</p>
        </div>

        <div className="text-sm text-gray-400 border-t border-gray-600 pt-6 mb-8">
          <p>Organized by: <strong>{event.creator.name || event.creator.email}</strong></p>
          <p>Created on: {new Date(event.createdAt).toLocaleDateString()}</p>
        </div>

        {/* Display action buttons only if the user is the owner */}
        {isOwner && (
          <div className="flex gap-4 border-t border-gray-600 pt-6">
            <Link 
              href={`/events/${event.id}/edit`}
              className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded font-semibold transition"
            >
              Edit Event
            </Link>
            
            <DeleteButton eventId={event.id} />
          </div>
        )}
      </div>
    </div>
  );
}