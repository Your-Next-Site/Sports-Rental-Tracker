"use client";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import DepartureForm from "../forms/departure-form";
import OnTheWater from "../on-the-water-component/on-the-water";
import SearchHistory from "../search-history-component/search-history";
import { fetchTrips, searchTrips } from "@/hooks/hooks";

export default function Tab(props: any) {
  const [selectedTab, setSelectedTab] = useState("Departure");
  const tabs = ["Departure", "On The Water", "Search"];
  const queryClient = useQueryClient();

  // Prefetch only for "On The Water"
  const handleMouseOver = (tab: string) => {
    if (tab === "On The Water") {
      queryClient.prefetchQuery({
        queryKey: ['trips', true],
        queryFn: () => fetchTrips(true),
        staleTime: 600,
      });
    } else if (tab === "Search") {
      const currentDate = new Date();
      queryClient.prefetchQuery({
        queryKey: ['searchPageTrips', '', currentDate],
        queryFn: () => searchTrips('', currentDate),
        staleTime: 600,
      });
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
              } grow rounded-t-md border-[1px] border-foreground py-2`}
          >
            {tab}
          </button>
        ))}
      </div>
      {selectedTab == "Departure" && <DepartureForm />}
      {selectedTab == "On The Water" && <OnTheWater />}
      {selectedTab == "Search" && <SearchHistory />}
    </div >
  );
}
