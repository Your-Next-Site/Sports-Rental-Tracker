import { Trip } from '@/types/types';
import { neon } from '@neondatabase/serverless';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const sql = neon(`${process.env.DATABASE_URL}`);
        const result = await sql`SELECT * FROM rafts_on_water WHERE departure_time >= CURRENT_DATE - INTERVAL '1 days' ORDER BY departure_time DESC`;
        return new Response(JSON.stringify(result as Trip[]), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(`Error getting comments: ${error}`, { headers: { 'Content-Type': 'text/plain' } });
    }
}
