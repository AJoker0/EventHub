// src/app/events/[id]/DeleteButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ eventId }: { eventId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    // confirm before delete
    if (!confirm("Are you sure you want to delete this event?")) return;

    setIsDeleting(true);
    const res = await fetch(`/api/events/${eventId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/events");
      router.refresh(); // refresh the list page
    } else {
      alert("Failed to delete the event.");
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="px-6 py-3 bg-red-600 text-white rounded font-semibold hover:bg-red-700 disabled:opacity-50 transition"
    >
      {isDeleting ? "Deleting..." : "Delete Event"}
    </button>
  );
}