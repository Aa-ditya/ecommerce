import nodeMailer from "nodemailer"
import bcrypt from "bcryptjs"
import User from "@/models/userModel"

export const sendEmail = async ({ email, emailType, userId }) => {
    try {
        const hash = await bcrypt.hash(userId.toString(), 10)
        if (emailType === "Verify") {
            await User.findByIdAndUpdate(userId, { verifiedToken: hash, verifiedTokenExpiry: Date.now() + 360000 })
        } else if (emailType === "Reset") {
            await User.findByIdAndUpdate(userId, { forgotPasswordToken: hash, verifiedTokenExpiry: Date.now() + 360000 })
        }
        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transporter = nodeMailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "ff1cf3768ba148",
                pass: "bf9382681e794a"
            }
        });

        const emailOptions =
        {
            from: 'aaditya@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === "Verfiy" ? "verify email" : "reset your  password", // Subject line
            text: "Hello world?", // plain text body
            html: `<p>Click <a hrf="${process.env.DOMAIN}/verifyemail?token=${hash}">here</a> to ${emailType === "Verify" ? "verify your email" : "reset your password"} or copy paste the link below in your browser ${process.env.DOMAIN}/verifyemail?token=${hash}" <br>
            </p>`, // html body

        }

        const sender = await transporter.sendMail(emailOptions);
        return sender;
    } catch (error) {
        throw new Error(error.message);
    }
}

