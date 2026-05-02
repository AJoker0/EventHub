// src/app/api/events/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  try {
    // 1. Check if user is authenticated (Requirement: Protected actions)
    const session = await getServerSession();
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    // 2. Get the user ID from the database using the session email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 3. Parse the incoming form data
    const body = await request.json();
    const { title, description, date, venue, ticketPrice } = body;

    // 4. Validate required fields
    if (!title || !description || !date || !venue || ticketPrice === undefined) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // 5. Create the event in the database using Prisma
    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date), // Convert string to DateTime object for Prisma
        venue,
        ticketPrice: parseFloat(ticketPrice), // Ensure it is saved as a Float
        creatorId: user.id, // Relation: Every event belongs to the user who created it
      },
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("🔥 CREATE EVENT ERROR:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}