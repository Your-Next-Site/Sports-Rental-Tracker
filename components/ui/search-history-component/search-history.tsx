import { Trip } from "@/types/types";
import { Trips } from "../trips/trips";
import SearchHistoryInputClient from "./search-history-input-client";
import { Suspense } from "react";
import SearchFallback from "../fallbacks/search-fallback";

export default function SearchHistory({ searchTripsPromise }:
  { searchTripsPromise: Promise<{ trips: Trip[], hasMore: boolean, totalPages: number }> }) {

  return (
    <>
      <div className="flex flex-col gap-8 min-h-[416px]">
        <h1 className="text-2xl">Search Trips</h1>
        <div className="flex flex-col md:justify-center md:items-center gap-2 md:flex-row">
          <label htmlFor="GuestName">Guest Name</label>
          <SearchHistoryInputClient />
        </div>
        <Suspense fallback={<SearchFallback />}>
          <Trips searchTripsPromise={searchTripsPromise} />
        </Suspense>
      </div>
    </>
  );
}
