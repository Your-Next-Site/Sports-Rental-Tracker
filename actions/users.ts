'use server'
import { toggleAdminDB, toggleEmployeeDB } from "@/lib/utils/db";

export async function toggleAdmin(email: string) {

    try {
        const [result] = await toggleAdminDB(email)

        if (!result) throw new Error('Failed to toggle admin status');

        return result;
    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        throw new Error(errorMessage);
    }
}

export async function toggleEmployee(email: string) {

    try {
        const [result] = await toggleEmployeeDB(email)

        if (!result) throw new Error('Failed to toggle employee status');

        return result;
    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        throw new Error(errorMessage);
    }
}
