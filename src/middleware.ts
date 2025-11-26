import { getSession } from '@/lib/session'
import { NextResponse, NextRequest } from 'next/server'


export async function middleware(request: NextRequest) {
    const session = await getSession()
    if (!session || !session.user)
        return NextResponse.redirect(new URL('/auth/signin', request.url))


}



export const config = {
    matcher: '/user/:path*',
}