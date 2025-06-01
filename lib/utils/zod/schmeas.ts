import z from 'zod'

export const schemaAddRaft = z.object({
    guestName: z.string(),
    itemType: z.string(),
    unitNumber: z.number(),
})

export const schemaRemoveRaft = z.object({
    raftOnWaterId: z.number(),
})