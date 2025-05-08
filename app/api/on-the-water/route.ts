import { Trip } from '@/types/types';
import { neon } from '@neondatabase/serverless';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const sql = neon(`${process.env.DATABASE_URL}`);
        const result = await sql`
            SELECT 
                row.id,
                row.guest_name,
                rt.name AS raft_type_name,
                row.unit_number,
                row.checked_out_by,
                row.departure_time,
                row.arrival_time,
                row.is_active
            FROM rafts_on_water row
            JOIN raft_types rt ON row.raft_type_id = rt.id
            WHERE row.departure_time >= CURRENT_DATE - INTERVAL '1 days'
            ORDER BY row.departure_time DESC`;
        return new Response(JSON.stringify(result as Trip[]), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(`Error getting comments: ${error}`, { headers: { 'Content-Type': 'text/plain' } });
    }
}