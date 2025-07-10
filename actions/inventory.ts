'use server'
import { addInventoryItem, addInventoryItemType, toggleAvailabilityDb, removeInventoryItemTypeDb, removeInventoryItem } from "@/lib/utils/db";
import { schemaAddInventoryItem, schemaAddInventoryItemType, schemaRemoveInventoryItem, schemaRemoveInventoryItemType } from "@/lib/utils/zod/schemas";
import { auth } from "@clerk/nextjs/server";


export async function addInventory(formData: FormData) {

    const { orgId, userId } = await auth()
    if (!userId) {
        throw new Error("No user ID found");
    }
    const validatedFields = schemaAddInventoryItem.safeParse({
        itemType: formData.get("item-type"),
        unitNumber: Number(formData.get("unit-number")),
    });

    if (!validatedFields.success) throw new Error("Invalid form data");

    try {
        const [result] = await addInventoryItem(validatedFields.data, orgId || userId)

        // revalidateTag('item-types'); // This will invalidate the cache for the tag

        if (!result) throw new Error('Failed to add to inventory');

        return result;
    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        throw new Error(errorMessage);
    }
}

export async function removeInventory(inventoryId: number) {

    const { orgId, userId } = await auth()
    if (!userId) {
        throw new Error("No user ID found");
    }
    const validatedFields = schemaRemoveInventoryItem.safeParse({
        inventoryId: inventoryId
    });

    if (!validatedFields.success) throw new Error("Invalid form data");

    try {
        const [result] = await removeInventoryItem(validatedFields.data.inventoryId, orgId || userId)

        // revalidateTag('item-types'); // This will invalidate the cache for the tag

        if (!result) throw new Error('Failed to add to inventory');

        return result;
    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        throw new Error(errorMessage);
    }
}

export async function removeInventoryType(itemTypeId: number) {

    const { orgId, userId } = await auth.protect()

    const validatedFields = schemaRemoveInventoryItemType.safeParse({
        itemTypeId: itemTypeId,

    });

    if (!validatedFields.success) throw new Error("Invalid form data");

    try {
        const [result] = await removeInventoryItemTypeDb(validatedFields.data.itemTypeId)

        // revalidateTag('item-types'); // This will invalidate the cache for the tag

        if (!result) throw new Error('Failed to remove to inventory');

        return result;
    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        throw new Error(errorMessage);
    }
}
export async function toggleAvailability(unitNumber: number) {
    const { orgId, userId } = await auth()
    if (!userId) {
        throw new Error("No user ID found");
    }
    try {
        const [result] = await toggleAvailabilityDb(unitNumber, orgId || userId)
        if (!result) throw new Error('Failed toggle Availability');

        return result;
    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        throw new Error(errorMessage);
    }

}

export async function addInventoryType(formData: FormData) {
    const { orgId, userId } = await auth()
    if (!userId) {
        throw new Error("No user ID found");
    }
    const validatedFields = schemaAddInventoryItemType.safeParse({
        unitTypeValue: formData.get("unit-type-value"),
        unitTypeLabel: formData.get("unit-type-label"),
    });

    if (!validatedFields.success) throw new Error("Invalid form data");

    try {
        const [result] = await addInventoryItemType(validatedFields.data, orgId || userId)

        if (!result) throw new Error('Failed to add to inventory');

        return result;
    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        throw new Error(errorMessage);
    }
}
