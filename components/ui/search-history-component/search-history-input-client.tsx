'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function SearchHistoryInputClient() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const departureDate = searchParams.get("departureDate") || new Date(new Date().getTime() - Number(process.env.NEXT_PUBLIC_OFFSET) * 60 * 60 * 1000).toISOString().split('T')[0]
    const guestName = searchParams.get("guestName") || ""

    const updateSearchParams = (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(name, value);
        params.set("searchPage", "0"); // reset page to 0 when search params change
        router.push(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    };

    const debouncedUpdateSearchParams = useCallback(
        debounce((name: string, value: string) => {
            updateSearchParams(name, value);
        }, 500),
        [updateSearchParams]
    );

    function debounce(fn: Function, delay: number) {
        let timeoutId: NodeJS.Timeout;
        return (...args: any[]) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                fn(...args);
            }, delay);
        };
    }
    return (
        <>
            <input
                defaultValue={guestName}
                name="GuestName"
                type="text"
                className="border-1 p-1 bg-white rounded-sm"
                onChange={(e) => {
                    debouncedUpdateSearchParams("guestName", e.target.value);
                }}
            />
            <label htmlFor="Date">Date</label>
            <input
                name="Date"
                type="date"
                defaultValue={departureDate}
                className="border-1 p-1 bg-white"
                onChange={(e) => {
                    updateSearchParams("departureDate", e.target.value);
                }}
            />
        </>
    );
}