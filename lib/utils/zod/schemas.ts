import z from 'zod'

export const schemaAddRaft = z.object({
    guestName: z.string(),
    itemType: z.string(),
    unitNumber: z.number(),
})

export const schemaRemoveRaft = z.object({
    raftOnWaterId: z.number(),
})

export const schemaAddInventoryItem = z.object({
    itemType: z.string(),
    unitNumber: z.number(),
})

export const schemaAddInventoryItemType = z.object({
    unitTypeValue: z.string(),
    unitTypeLabel: z.string(),
})