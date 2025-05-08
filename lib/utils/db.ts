import { neon } from "@neondatabase/serverless";
import { schemaAddRaft } from "./zod/schmeas";

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