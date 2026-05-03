// src/app/events/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function EventsListPage() {
  // fetch events from the database
  const events = await prisma.event.findMany({
    orderBy: {
      createdAt: 'desc' // newest first
    }
  });

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-white">Events</h1>
          <p className="text-gray-300 mt-1">Discover and manage events</p>
        </div>
        <Link 
          href="/events/create" 
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
        >
          + Create Event
        </Link>
      </div>

      {/* empty state */}
      {events.length === 0 ? (
        <div className="bg-gray-800 p-12 rounded-lg text-center text-gray-300">
          <p className="text-lg mb-4">No events found yet.</p>
          <Link href="/events/create" className="text-green-400 hover:underline">
            Create the first event →
          </Link>
        </div>
      ) : (
        // render the grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-gray-800 hover:bg-gray-750 p-6 rounded-lg shadow-md text-white flex flex-col justify-between transition-colors border border-gray-700">
              <div>
                <h2 className="text-xl font-bold mb-2">{event.title}</h2>
                <p className="text-gray-300 mb-4 line-clamp-2 text-sm">{event.description}</p>
                
                <div className="text-sm text-gray-400 space-y-2 mb-6">
                  <p>📍 {event.venue}</p>
                  <p>📅 {new Date(event.date).toLocaleDateString()}</p>
                  <p>💰 ${event.ticketPrice.toFixed(2)}</p>
                </div>
              </div>

              {/* link to details */}
              <Link 
                href={`/events/${event.id}`}
                className="inline-block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}