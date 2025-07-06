import { Items, ItemTypes, Trip } from "@/types/types";
import { User } from "@clerk/nextjs/server";

export const fetchItems = async (): Promise<Items[]> => {
    const response = await fetch(`/api/items`)
    return await response.json();
}

export const fetchItemTypes = async (userId: string | null, orgId?: string | null): Promise<ItemTypes[]> => {
    const params = new URLSearchParams();
    if (userId) params.append('userId', userId);
    if (orgId) params.append('orgId', orgId);

    let url = `/api/item-types?${params.toString()}`;
    if (typeof window === "undefined") {
        // On the server, build absolute URL
        const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";
        url = `${base}/api/item-types?${params.toString()}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error fetching item types: ${response.status} ${text}`);
    }

    return await response.json();
}
export const fetchTrips = async (currentTrip: boolean, currentPage: number): Promise<{ trips: Trip[], hasMore: boolean, totalPages: number }> => {
    const response = await fetch(`/api/rented-out?currentTrip=${currentTrip}&page=${currentPage}`)
    return await response.json();
}

export const searchTrips = async (guestName: string, departureTime: any, page: number): Promise<{ trips: Trip[], hasMore: boolean, totalPages: number }> => {
    const response = await fetch(`/api/search-trips?guestName=${guestName}&departureTime=${departureTime}&page=${page}`)
    return await response.json();
}


// export const fetchItemTypes = async (): Promise<ItemTypes[]> => {
//     const url = API_URL.includes('localhost')
//         ? `http://localhost:3000/api/item-types`
//         : `${API_URL}/api/item-types`;
//     const response = await fetch(url, {
//         next: { tags: ['item-types'] }
//     });
//     return await response.json();
// }