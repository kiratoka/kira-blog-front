
import { createSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url)

    const accessToken = searchParams.get("accessToken")
    const userId = searchParams.get("userId")
    const name = searchParams.get("name")
    const avatar = searchParams.get("avatar")



    if (!accessToken || !userId || !name) {
        return NextResponse.json({ error: "Google oauth failed!" }, { status: 400 });
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-token`, {
        headers: {
            authorization: `Bearer ${accessToken}`

        }
    })


    if (res.status === 401) {
        return NextResponse.json({ error: "Jwt verification failed!" }, { status: 401 });
    }


    await createSession({
        user: {
            id: userId,
            name,
            avatar: avatar ?? undefined
        },
        accessToken
    })

    return NextResponse.redirect(new URL("/", req.url));

}