'use server'
import { Trip } from "@/types/types";
import { neon } from "@neondatabase/serverless";

export async function searchTrips(guestName: string | string, departureTime: Date | string) {
    console.log(departureTime);
    // Adjust departure time by subtracting 6 hours
    const adjustedTime = new Date(departureTime);
    adjustedTime.setHours(adjustedTime.getHours() - 6);
    // Calculate time window (24 hours from adjusted time)
    const endTime = new Date(adjustedTime);

    endTime.setHours(endTime.getHours() + 24);
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
            AND row.departure_time BETWEEN ${adjustedTime} AND ${endTime}
        ORDER BY row.departure_time DESC`;
    return result as Trip[];
}


