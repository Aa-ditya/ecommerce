import { Connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import jwt from "jsonwebtoken"

Connect();

export async function POST(request) {
    try {
        const req = new NextRequest(request)
        const res = await req.json();
        const { token } = res;
        if (!token) {
            return NextResponse({ error: "Something went wrong while verifying the email", err }, { status: 500 })
        }

        const user = await User.findOne({ verifiedToken: token, verifiedTokenExpiry: { $gt: Date.now() } })

        if (!user) {
            return NextResponse.json({ error: "user not found", err }, { status: 400 })
        }

        user.isVerified = true;
        user.verifiedToken = undefined;
        user.verifiedTokenExpiry = undefined;

        NextResponse.json({ message: "user verification successful" }, { success: true }, { status: 500 });
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        const jwtToken = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' })

        const response = NextResponse.json({
            message: "user logged in successfully",
            success: true,
        })

        response.cookies.set("token", jwtToken, {
            httpOnly: true
        })

        return response;

    } catch (err) {
        return NextResponse.json({ error: "Something went wrong while verifying the email", err }, { status: 500 })
    }
}
