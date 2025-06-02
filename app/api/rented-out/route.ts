import { fetchTrips } from '@/lib/utils/db';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const currentTrip = searchParams.get('currentTrip') === 'true';
        const currentPage = parseInt(searchParams.get('page') || '0');

        const result = await fetchTrips(currentTrip, currentPage);

        return new Response(JSON.stringify(result), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.log(error)
        return new Response(`Error fetching raft data: ${error}`, { status: 500, headers: { 'Content-Type': 'text/plain' } });
    }
}

