// src/app/events/[id]/edit/EditForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// expected props shape
type EventData = {
  id: string;
  title: string;
  description: string;
  date: Date;
  venue: string;
  ticketPrice: number;
};

export default function EditForm({ event }: { event: EventData }) {
  const router = useRouter();
  
  // format date for the datetime-local input
  const formattedDate = new Date(event.date).toISOString().slice(0, 16);

  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description,
    date: formattedDate,
    venue: event.venue,
    ticketPrice: event.ticketPrice.toString(),
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch(`/api/events/${event.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push(`/events/${event.id}`);
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to update event");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Edit Event</h1>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow text-black">
        <div>
          <label className="block text-sm font-medium mb-1">Event Title</label>
          <input
            type="text" required className="w-full border rounded p-2"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            required rows={3} className="w-full border rounded p-2"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date and Time</label>
          <input
            type="datetime-local" required className="w-full border rounded p-2"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Venue (Location)</label>
          <input
            type="text" required className="w-full border rounded p-2"
            value={formData.venue}
            onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ticket Price ($)</label>
          <input
            type="number" step="0.01" min="0" required className="w-full border rounded p-2"
            value={formData.ticketPrice}
            onChange={(e) => setFormData({ ...formData, ticketPrice: e.target.value })}
          />
        </div>
        <div className="flex gap-4 mt-4">
          <button type="submit" className="flex-1 bg-yellow-500 text-white rounded p-3 font-bold hover:bg-yellow-600 transition">
            Update Event
          </button>
          <button type="button" onClick={() => router.back()} className="flex-1 bg-gray-500 text-white rounded p-3 font-bold hover:bg-gray-600 transition">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}