"use client";
import { Suspense } from "react";
import { ItemTypes, Trip, TripsData } from "@/types/types";
import DepartureForm from "../forms/departure-form";
import RentedOut from "../rented-out/rented-out";
import SearchHistory from "../search-history-component/search-history";
import RentedOutFallback from "../fallbacks/rented-out-fallback";
import { useTabNavigation } from "@/hooks/hooks";


export default function Tab({ 
  tripsPromise,
  itemTypesPromise,
  searchTripsPromise,
}: {  
  tripsPromise: Promise<TripsData>;
  itemTypesPromise: Promise<ItemTypes[]>;
  searchTripsPromise: Promise<{ trips: Trip[], hasMore: boolean, totalPages: number }>
}) {

  const tabs = ["Departure", "Rented Out", "Search"];
  const { selectedTab, handleTabClick } = useTabNavigation(tabs, "Departure");

  return (
    <div className="flex flex-col w-full md:w-5/6">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`${selectedTab === tab ? "bg-foreground text-white" : "bg-white"
              } grow rounded-t-md border-[1px] hover:bg-background border-foreground py-2`}
          >
            {tab}
          </button>
        ))}
      </div>
      {selectedTab === "Departure" && <DepartureForm itemTypesPromise={itemTypesPromise} />}
      {selectedTab === "Rented Out" && (
        <Suspense fallback={<RentedOutFallback />}>
          <RentedOut tripsPromise={tripsPromise} />
        </Suspense>
      )}
      {selectedTab === "Search" && <SearchHistory  searchTripsPromise={searchTripsPromise} />}
    </div>
  );
}

