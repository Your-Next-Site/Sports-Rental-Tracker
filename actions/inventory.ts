'use server'
import { auth } from "@/auth";
import { addInventoryItem } from "@/lib/utils/db";
import { schemaAddInventoryItem } from "@/lib/utils/zod/schmeas";

export async function addInventory(formData: FormData) {
    const session = await auth();
    const email = session?.user.email;

    const validatedFields = schemaAddInventoryItem.safeParse({      
        itemType: formData.get("item-type"),
        unitNumber: Number(formData.get("unit-number")),
    });

    if (!validatedFields.success) throw new Error("Invalid form data");

    try {
        const [result] = await addInventoryItem(validatedFields.data, email)

        if (!result) throw new Error('Failed to add raft to water');

        return result;
    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        throw new Error(errorMessage);
    }
}