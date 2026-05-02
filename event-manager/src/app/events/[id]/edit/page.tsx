// src/app/events/[id]/edit/page.tsx
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import EditForm from "./EditForm";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const eventId = resolvedParams.id;

  // 1. Fetch the event
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    notFound();
  }

  // 2. Check authorization
  const session = await getServerSession();
  if (!session || !session.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  // 3. Prevent non-owners from accessing the edit page
  if (event.creatorId !== user?.id) {
    return (
      <div className="p-8 text-center text-red-500">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p>You do not have permission to edit this event.</p>
      </div>
    );
  }

  // 4. Pass the data to our client form component
  return (
    <div className="max-w-2xl mx-auto p-8 text-white">
      <div className="mb-6">
        <Link href={`/events/${eventId}`} className="text-sm text-gray-300 hover:underline">
          ← Back to event
        </Link>
      </div>
      <EditForm event={event} />
    </div>
  );
}