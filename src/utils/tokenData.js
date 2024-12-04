import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"

export const getDataFromToken = (request) => {
    try {
        const req = new NextRequest(request);
        const token = req.cookies.get("token")?.value || ""
        const decodedToken = jwt.verify(token, process.env.MONGO_URI);
        return decodedToken.id;
    } catch (error) {

    }
}