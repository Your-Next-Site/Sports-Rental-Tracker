import { searchTripsDB } from '@/lib/utils/db';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { userId, orgId } = await auth()
    if (!userId) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }
    try {
        const searchParams = request.nextUrl.searchParams;
        const guestName = searchParams.get('guestName') || '';
        const departureTime = searchParams.get('departureTime') || new Date().toISOString();
        const page = Number(searchParams.get('page')) || 0;
        const result = await searchTripsDB(guestName, departureTime, page, orgId || userId);

        return new Response(JSON.stringify(result), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.log(error)
        return new Response(`Error fetching raft data: ${error}`, { status: 500, headers: { 'Content-Type': 'text/plain' } });
    }
}

