import { Connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/utils/tokenData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

Connect();

export async function POST(request) {
    const req = new NextRequest(request)
    const userId = await getDataFromToken(req);
    const user = await User.findOne({ _id: userId }).select("-password")
    return NextResponse.json({
        message: "user found",
        data: user
    })
}