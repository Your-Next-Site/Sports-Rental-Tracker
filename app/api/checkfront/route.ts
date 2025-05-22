import { fetchBookings } from '@/lib/utils/checkfront';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');
    try {
        const result = await fetchBookings(date || "");
        return new Response(JSON.stringify(result), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.log(error)
        return new Response(`Error fetching raft data: ${error}`, { status: 500, headers: { 'Content-Type': 'text/plain' } });
    }
}

