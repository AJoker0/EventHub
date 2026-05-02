// src/app/events/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function EventsListPage() {
  // Fetch all events from the database using Prisma (Requirement: Read/List)
  const events = await prisma.event.findMany({
    orderBy: {
      createdAt: 'desc' // Show newest events first
    }
  });

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8 text-white">
        <h1 className="text-4xl font-bold">All Events</h1>
        <Link 
          href="/events/create" 
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
        >
          + Create Event
        </Link>
      </div>

      {/* Show message if database is empty */}
      {events.length === 0 ? (
        <div className="bg-gray-800 p-8 rounded-lg text-center text-gray-300">
          <p>No events found. Be the first to create one!</p>
        </div>
      ) : (
        // Display all items in a clear layout grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white p-6 rounded-lg shadow-md text-black flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                
                <div className="text-sm font-medium text-gray-700 mb-4 space-y-1">
                  <p>📍 Venue: {event.venue}</p>
                  <p>📅 Date: {new Date(event.date).toLocaleDateString()}</p>
                  <p>💰 Price: ${event.ticketPrice.toFixed(2)}</p>
                </div>
              </div>

              {/* Link to the Details page (Dynamic Route) */}
              <Link 
                href={`/events/${event.id}`}
                className="inline-block mt-4 text-center bg-blue-100 text-blue-700 py-2 rounded font-semibold hover:bg-blue-200 transition"
              >
                View Details &rarr;
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}