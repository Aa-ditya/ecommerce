import { Connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST() {
    try {
        const response = NextResponse.json({
            messsage: "user logged out successfully",
            success: true
        });
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: Date.now(0)
        })

        return response;
    } catch (error) {
        return NextResponse.json({ message: "Error while logging out" })
    }
}