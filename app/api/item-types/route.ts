import { fetchItemTypes } from '@/lib/utils/db';
import { auth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const { userId, orgId } = await auth()
    if (!userId) {
        return new Response('Unauthorized: No user ID found', { status: 401, headers: { 'Content-Type': 'text/plain' } });
    }

    try {
        const result = await fetchItemTypes(orgId || userId);
        return new Response(JSON.stringify(result), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.log(error)
        return new Response(`Error fetching raft data: ${error}`, { status: 500, headers: { 'Content-Type': 'text/plain' } });
    }
}

