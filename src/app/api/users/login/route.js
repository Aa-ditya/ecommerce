import { Connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(request) {
    try {
        const req = new NextRequest(request);
        const res = await req.json();
        const { email } = res;
        console.log(email);

        const user = User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "User does not exist", error }, { status: 400 })
        }

        const validPassword = bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Check your password", error }, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong while signing the user", error }, { status: 400 })
    }
}