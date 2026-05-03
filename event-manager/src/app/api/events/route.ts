// src/app/api/events/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  try {
    // ensure the user is logged in
    const session = await getServerSession();
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    // resolve the user by session email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // read request data
    const body = await request.json();
    const { title, description, date, venue, ticketPrice } = body;

    // validate required fields
    if (!title || !description || !date || !venue || ticketPrice === undefined) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // note: date arrives as a string from the client and must be converted

    // create the event
    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        venue,
        ticketPrice: parseFloat(ticketPrice),
        creatorId: user.id,
      },
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("CREATE EVENT ERROR:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}