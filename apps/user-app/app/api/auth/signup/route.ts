import db from "@repo/db/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email, password, phone } = await request.json();

        if (!email || !password || !phone) {
            return NextResponse.json({
                error: "Email and password are required"
            }, {
                status: 400
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const existingUser = await db.user.findFirst({
            where: {
                OR: [
                    { phone: phone },
                    { email: email }
                ]
            }
        })

        if (existingUser) {
            return NextResponse.json({
                error: "User already exists"
            }, {
                status: 409
            })
        }

        await db.user.create({
            data: {
                email,
                phone,
                password: hashedPassword
            }
        })
        return NextResponse.json({
            message: "User created successfullly"
        }, {
            status: 200
        })
    } catch (e) {
        return NextResponse.json({
            message: "Something went wrong while creating the user",
            error: e
        }, {
            status: 400
        })
    }
}
