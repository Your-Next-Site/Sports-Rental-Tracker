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
                rt.name as raft_type_name,
                row.unit_number,
                row.checked_out_by,
                row.departure_time,
                row.arrival_time                
            FROM rafts_on_water row
            JOIN raft_types rt ON row.raft_type_id = rt.id
            WHERE row.departure_time >= CURRENT_DATE - INTERVAL '1 days'
            AND row.arrival_time IS NULL
            ORDER BY row.departure_time DESC`;
        return new Response(JSON.stringify(result as Trip[]), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.log(error)
        return new Response(`Error fetching raft data: ${error}`, { status: 500, headers: { 'Content-Type': 'text/plain' } });
    }
}

export async function POST(request: NextRequest) {
    try {
        const sql = neon(`${process.env.DATABASE_URL}`);
        const body = await request.json();
        const { guest_name, raft_type_id, unit_number, checked_out_by } = body;

        const result = await sql`
            INSERT INTO rafts_on_water 
            (guest_name, raft_type_id, unit_number, checked_out_by, departure_time)
            VALUES 
            (${guest_name}, ${raft_type_id}, ${unit_number}, ${checked_out_by}, NOW())
            RETURNING 
            id,
            guest_name,
            (SELECT name FROM raft_types WHERE id = ${raft_type_id}) as raft_type_name,
            unit_number,
            checked_out_by,
            departure_time,
            arrival_time`;

        if (!result || result.length === 0) {
            return new Response('No data was inserted', { status: 500, headers: { 'Content-Type': 'text/plain' } });
        }
        return new Response(JSON.stringify(result as Trip[]), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.log(error)
        return new Response(`Error fetching raft data: ${error}`, { status: 500, headers: { 'Content-Type': 'text/plain' } });
    }
}