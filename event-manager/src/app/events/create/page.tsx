// src/app/events/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
  const router = useRouter();
  
  // State to hold form data including our custom fields
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    ticketPrice: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Send data to our new API route
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      // Redirect to the List page after successful creation
      router.push("/events"); 
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to create event");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Create New Event</h1>

      {/* Error message display */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow text-black">
        <div>
          <label className="block text-sm font-medium mb-1">Event Title</label>
          <input
            type="text"
            required
            className="w-full border rounded p-2"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            required
            className="w-full border rounded p-2"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date and Time</label>
          <input
            type="datetime-local"
            required
            className="w-full border rounded p-2"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Venue (Location)</label>
          <input
            type="text"
            required
            className="w-full border rounded p-2"
            value={formData.venue}
            onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ticket Price ($)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            required
            className="w-full border rounded p-2"
            value={formData.ticketPrice}
            onChange={(e) => setFormData({ ...formData, ticketPrice: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white rounded p-3 font-bold hover:bg-green-700 transition mt-4"
        >
          Save Event
        </button>
      </form>
    </div>
  );
}