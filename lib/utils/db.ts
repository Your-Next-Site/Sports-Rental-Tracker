import { neon } from "@neondatabase/serverless";
import { schemaAddRaft } from "./zod/schmeas";
import { Trip } from "@/types/types";
import { User } from "@auth/core/types";


export async function fetchUsersFromDB() {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const result = await sql`
    SELECT * FROM users;
    `;
    return result as User[];
}
export async function fetchRaftsOnTheWater(tripCurrent: boolean) {
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
        ${tripCurrent ?
            sql`WHERE row.arrival_time IS NULL` :
            sql`WHERE row.arrival_time IS NOT NULL`
        }
            ORDER BY row.departure_time DESC`;
    return result as Trip[];
}
export async function addRaftToWaterDB(validatedFields: typeof schemaAddRaft._type, email: string | null | undefined) {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const [result] = await sql`
            INSERT INTO rafts_on_water (
                guest_name,
                raft_type_id,
                unit_number,
                checked_out_by,
                departure_time
            )
            VALUES (
                ${validatedFields.guestName},
                (SELECT id FROM raft_types WHERE name = ${validatedFields.raftType}),
                ${validatedFields.unitNumber},
                (SELECT id FROM users WHERE email = ${email}),
                NOW()
            )
            RETURNING *;
        `;
    return [result]
}

export async function removeRaftFromWater(raftOnWaterId: number, email: string | null | undefined) {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const [result] = await sql`
        UPDATE rafts_on_water 
        SET arrival_time = NOW(),
            checked_in_by = (SELECT id FROM users WHERE email = ${email})
        WHERE id = ${raftOnWaterId}
        RETURNING *;
        `;
    return [result];
}

export async function toggleAdminDB(email: string) {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const [result] = await sql`
        UPDATE users 
        SET admin = NOT admin 
        WHERE email = ${email}
        RETURNING *;
    `;
    return [result];
}

export async function toggleEmployeeDB(email: string) {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const [result] = await sql`
        UPDATE users 
        SET employee = NOT employee 
        WHERE email = ${email}
        RETURNING *;
    `;
    return [result];
}

// SELECT 
//                 row.id,
//                 row.guest_name,
//                 rt.name as raft_type_name,
//                 row.unit_number,
//                 row.checked_out_by,
//                 row.departure_time,
//                 row.arrival_time                
//             FROM rafts_on_water row
//             JOIN raft_types rt ON row.raft_type_id = rt.id
//             WHERE row.departure_time >= CURRENT_DATE 
//             ${tripCurrent ? sql`- INTERVAL '1 days'` : sql``}
//             ${tripCurrent ? sql`AND row.arrival_time IS NULL` : sql``}
//             ORDER BY row.departure_time DESC`;