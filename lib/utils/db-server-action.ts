'use server'
import { Trip } from "@/types/types";
import { neon } from "@neondatabase/serverless";

export async function searchTrips(guestName: string | null, departureTime: Date | null) {
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
        WHERE 
            LOWER(row.guest_name) LIKE LOWER(${'%' + guestName + '%'})
            ${departureTime ?
            sql` AND row.departure_time BETWEEN ${departureTime + ' 00:00:00.0000'} 
                                         AND ${departureTime + ' 23:59:59.9999'} ` :
            sql` `}
        ORDER BY row.departure_time DESC`;
    return result as Trip[];
}
