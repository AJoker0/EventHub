// src//app/api/register/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// initialize Prisma Client
const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password } = body;

        // validate input: ensure required fields are present
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        //prevent duplicate emails: check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "Email is already registered" },
                { status: 400 }
            );
        }

        // do not store plain-text passwords: hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // store the user in the database
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        // return success without exposing the hashed password
        return NextResponse.json(
            { message: "User created successfully", user: { id: newUser.id, email: newUser.email } },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong during registration" },
            { status: 500 }
        );
    }
}