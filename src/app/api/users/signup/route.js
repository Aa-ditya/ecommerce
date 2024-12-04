import { Connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs"
import { sendEmail } from "@/utils/mailer"

Connect();

export async function POST(request) {

    try {
        const req = new NextRequest(request);
        const res = await req.json();
        const { username, email, password } = res
        console.log(res);

        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "user already exits" }, { status: 400 })
        }

        const salt = await bcrypt.genSalt(3)
        const hash = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hash
        })

        const savedUser = await newUser.save()
        console.log(savedUser);
        //-------Send Email
        await sendEmail({ email, emailType: "Verify", userId: savedUser._id })
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
    } catch (error) {
        return NextResponse.json({ error: "Error occured while post request", error }, { status: 500 })
    }
} 