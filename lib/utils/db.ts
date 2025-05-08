import { neon } from "@neondatabase/serverless";

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