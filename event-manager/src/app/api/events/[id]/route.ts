// src/app/api/events/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Updated to Promise
) {
  try {
    // resolve route params
    const resolvedParams = await params;
    const eventId = resolvedParams.id;

    // ensure the user is logged in
    const session = await getServerSession();
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    // load the event
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event || !user) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // only the creator can delete
    if (event.creatorId !== user.id) {
      return NextResponse.json(
        { error: "Forbidden: You can only delete your own events" },
        { status: 403 }
      );
    }

    // note: delete is blocked for non-owners even if they know the id

    // delete the event
    await prisma.event.delete({
      where: { id: eventId },
    });

    return NextResponse.json({ message: "Event deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const eventId = resolvedParams.id;

    // ensure the user is logged in
    const session = await getServerSession();
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event || !user) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // only the creator can edit
    if (event.creatorId !== user.id) {
      return NextResponse.json(
        { error: "Forbidden: You can only edit your own events" },
        { status: 403 }
      );
    }

    // note: update is blocked for non-owners even if they know the id

    // parse and validate incoming data
    const body = await request.json();
    const { title, description, date, venue, ticketPrice } = body;

    if (!title || !description || !date || !venue || ticketPrice === undefined) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // update the event
    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: {
        title,
        description,
        date: new Date(date),
        venue,
        ticketPrice: parseFloat(ticketPrice),
      },
    });

    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}