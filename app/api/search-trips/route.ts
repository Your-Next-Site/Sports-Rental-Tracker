import { searchTripsDB } from '@/lib/utils/db';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const guestName = searchParams.get('guestName') || '';
        const departureTime = searchParams.get('departureTime') || new Date().toISOString();

        const result = await searchTripsDB(guestName, departureTime);

        return new Response(JSON.stringify(result), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.log(error)
        return new Response(`Error fetching raft data: ${error}`, { status: 500, headers: { 'Content-Type': 'text/plain' } });
    }
}

