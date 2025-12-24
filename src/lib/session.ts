    import { jwtVerify, SignJWT } from "jose"
    import { cookies } from "next/headers"
    import { redirect } from "next/navigation"

    export type SessionUser = {
        id?: string
        name?: string
        avatar?: string
    }

    export type Session = {
        user: SessionUser
        accessToken: string
    }



    const secretKey = process.env.SESSION_SECRET_KEY!

    const encodedKey = new TextEncoder().encode(secretKey)

    export const createSession = async (payload: Session) => {


        const session = await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(encodedKey)



        const expiresInMs = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
        const expiredAt = new Date(Date.now() + expiresInMs);

        (await cookies()).set("session", session, {
            httpOnly: true,
            secure: true,
            expires: expiredAt,
            sameSite: "lax",
            path: "/",
        });
    }


    export async function getSession() {


        const cookie = (await cookies()).get("session")?.value

        if (!cookie) return null


        try {

            const { payload } = await jwtVerify(cookie, encodedKey, {
                algorithms: ["HS256"]
            })
            return payload as Session
        } catch (err) {
            console.error("Failed to verify the session", err)
            await (await cookies()).delete("session");
            redirect("/auth/signin")
        }   



    }


    export async function deleteSession() {
        await (await cookies()).delete("session")

    }