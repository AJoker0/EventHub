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
        <Link href="/events" className="text-blue-400 hover:underline">
          &larr; Back to all events
        </Link>
      </div>

      <div className="bg-white text-black p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
        
        <div className="flex flex-wrap gap-4 text-sm font-semibold text-gray-600 mb-6 bg-gray-100 p-4 rounded">
          <p>📍 Venue: {event.venue}</p>
          <p>📅 Date: {new Date(event.date).toLocaleString()}</p>
          <p>💰 Ticket Price: ${event.ticketPrice.toFixed(2)}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">About this event</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{event.description}</p>
        </div>

        <div className="text-sm text-gray-500 mb-8 border-t pt-4">
          <p>Organized by: {event.creator.name || event.creator.email}</p>
          <p>Created on: {new Date(event.createdAt).toLocaleDateString()}</p>
        </div>

        {/* Display action buttons only if the user is the owner */}
        {isOwner && (
          <div className="flex gap-4 border-t pt-6">
            <Link 
              href={`/events/${event.id}/edit`}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
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