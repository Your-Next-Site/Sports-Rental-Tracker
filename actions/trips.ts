'use server'
import { auth } from "@/auth";
import { addRaftToWaterDB, removeRaftFromWater } from "@/lib/utils/db";
import { schemaAddRaft, schemaRemoveRaft } from "@/lib/utils/zod/schmeas";
import { neon } from "@neondatabase/serverless";


export async function addRaftToWater(formData: FormData) {
    const session = await auth();
    const email = session?.user.email;

    console.log("data: ", formData.get("guest-name"),formData.get("item-type"),formData.get("unit-number") )
    const validatedFields = schemaAddRaft.safeParse({
        guestName: formData.get("guest-name"),
        itemType: formData.get("item-type"),
        unitNumber: Number(formData.get("unit-number")),
    });

    if (!validatedFields.success) throw new Error("Invalid form data");

    try {
        const [result] = await addRaftToWaterDB(validatedFields.data, email)            
        
        if (!result) throw new Error('Failed to add raft to water');
        
        return result;
    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        throw new Error(errorMessage);
    }
}

export async function addRemoveRaftFromWater(raftOnWaterId: number) {
    const session = await auth();
    const email = session?.user.email;

    const validatedFields = schemaRemoveRaft.safeParse({ raftOnWaterId: raftOnWaterId });

    if (!validatedFields.success) throw new Error("Invalid data");

    try {
        const sql = neon(`${ process.env.DATABASE_URL } `);
        const [result] = await removeRaftFromWater(validatedFields.data.raftOnWaterId, email)

        if (!result) throw new Error('Failed to mark raft as arrived');
        return result;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(errorMessage);
    }
}