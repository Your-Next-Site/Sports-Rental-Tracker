'use server'
import { addInventoryItem, toggleAvailabilityDb } from "@/lib/utils/db";
import { schemaAddInventoryItem } from "@/lib/utils/zod/schmeas";
import { auth } from "@clerk/nextjs/server";

export async function addInventory(formData: FormData) {

    await auth.protect()

    const validatedFields = schemaAddInventoryItem.safeParse({
        itemType: formData.get("item-type"),
        unitNumber: Number(formData.get("unit-number")),
    });

    if (!validatedFields.success) throw new Error("Invalid form data");

    try {
        const [result] = await addInventoryItem(validatedFields.data)

        if (!result) throw new Error('Failed to add raft to water');

        return result;
    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        throw new Error(errorMessage);
    }
}

export async function toggleAvailability(unitNumber: number) {
    try {
        const [result] = await toggleAvailabilityDb(unitNumber)
        if (!result) throw new Error('Failed toggle Availability');

        return result;
    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        throw new Error(errorMessage);
    }

}