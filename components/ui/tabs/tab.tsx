"use client";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import DepartureForm from "../forms/departure-form";
import RentedOut from "../rented-out/rented-out";
import SearchHistory from "../search-history-component/search-history";
import { fetchTrips,searchTrips } from "@/hooks/hooks";
import { ItemTypes } from "@/types/types";

export default function Tab({ itemTypesPromise }: { itemTypesPromise: Promise<ItemTypes[]> }) {
  const [selectedTab, setSelectedTab] = useState("Departure");
  const tabs = ["Departure", "Rented Out", "Search"];
  const queryClient = useQueryClient();

  const [prefetchedTabs, setPrefetchedTabs] = useState<Set<string>>(new Set());

  const handleMouseOver = (tab?: string) => {
    if (!tab || prefetchedTabs.has(tab)) return;

    if (tab === "Rented Out") {
      queryClient.prefetchQuery({
        queryKey: ['trips', true],
        queryFn: () => fetchTrips(true, 1),
        staleTime: 120,
      });
      setPrefetchedTabs(prev => new Set(prev).add(tab));
    } else if (tab === "Search") {
      const currentDate = new Date();
      queryClient.prefetchQuery({
        queryKey: ['searchPageTrips', '', currentDate],
        queryFn: () => searchTrips('', currentDate, 1),
        staleTime: 120,
      });
      setPrefetchedTabs(prev => new Set(prev).add(tab));
    }
  };


  return (
    <div className="flex flex-col  w-full md:w-5/6">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={(e) => { setSelectedTab(e.currentTarget.innerText); handleMouseOver(tab) }}
            onMouseOver={() => handleMouseOver(tab)}
            className={`${selectedTab == tab ? "bg-foreground text-white" : "bg-white"
              } grow rounded-t-md border-[1px] hover:bg-background border-foreground py-2`}
          >
            {tab}
          </button>
        ))}
      </div>
      {selectedTab == "Departure" && <DepartureForm itemTypesPromise={itemTypesPromise} />}
      {selectedTab == "Rented Out" && <RentedOut />}
      {selectedTab == "Search" && <SearchHistory />}
    </div >
  );
}
