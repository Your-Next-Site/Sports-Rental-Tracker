"use client";
import { Trip } from "@/types/types";
import PaginationBar from "../pagination/pagination-bar";
import { use, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Trips } from "../trips/trips";


export default function SearchHistory({ searchTripsPromise }:
  { searchTripsPromise: Promise<{ trips: Trip[], hasMore: boolean, totalPages: number }> }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchPage = searchParams.get("searchPage") || 0;
  const departureDate = searchParams.get("departureDate") || new Date(new Date().getTime() - Number(process.env.NEXT_PUBLIC_OFFSET) * 60 * 60 * 1000).toISOString().split('T')[0]
  const guestName = searchParams.get("guestName") || ""

  const { trips: data, hasMore, totalPages } = use(searchTripsPromise);

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
      <div className="flex flex-col gap-8 min-h-[416px]">
        <h1 className="text-2xl">Search Trips</h1>
        <div className="flex flex-col md:justify-center md:items-center gap-2 md:flex-row">
          <label htmlFor="GuestName">Guest Name</label>
          <input
            defaultValue={guestName}
            name="GuestName"
            type="text"
            className="border-1 p-1"
            onChange={(e) => {
              debouncedUpdateSearchParams("guestName", e.target.value);
            }}
          />
          <label htmlFor="Date">Date</label>
          <input
            name="Date"
            type="date"
            defaultValue={departureDate}
            className="border-1 p-1"
            onChange={(e) => {
              updateSearchParams("departureDate", e.target.value);
            }}
          />
        </div>
        <Trips trips={data} />
      </div>
      <PaginationBar
        page={Number(searchPage)}
        currentTab={"Search"}
        hasMore={hasMore}
        totalPages={totalPages}
        pathName={"/main-rental-page"}
      />
    </>
  );
}
