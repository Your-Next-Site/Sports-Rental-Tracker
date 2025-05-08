'use server'
import { auth } from "@/auth";
import { neon } from "@neondatabase/serverless";
import { z } from 'zod'

const schemaAddRaft = z.object({
    guestName: z.string(),
    raftType: z.string(),
    unitNumber: z.number(),
})

export async function addRaftToWater(formData: FormData) {
    const session = await auth();
    const email = session?.user.email;
    console.log(formData.get("raft-type"))
    const validatedFields = schemaAddRaft.safeParse({
        guestName: formData.get("guest-name"),
        raftType: formData.get("raft-type"),
        unitNumber: Number(formData.get("unit-number")),
    });

    if (!validatedFields.success) {
        throw new Error("Invalid form data");
    }

    try {
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
                ${validatedFields.data.guestName},
                (SELECT id FROM raft_types WHERE name = ${validatedFields.data.raftType}),
                ${validatedFields.data.unitNumber},
                (SELECT id FROM users WHERE email = ${email}),
                NOW()
            )
            RETURNING *;
        `;
        console.log(result)
        if (!result) throw new Error('Failed to add raft to water');
        return result;
    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        throw new Error(errorMessage);
    }
}