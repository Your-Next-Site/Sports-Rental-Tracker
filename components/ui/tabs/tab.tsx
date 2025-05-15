"use client";
import { useState } from "react";
import DepartureForm from "../forms/departure-form";
import OnTheWater from "../on-the-water-component/on-the-water";
import SearchHistory from "../search-history-component/search-history";

export default function Tab(props: any) {
  const [selectedTab, setSelectedTab] = useState("Departure");
  const tabs = ["Departure", "On The Water", "Search"];

  return (
    <div className="flex flex-col  w-full md:w-5/6">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={(e) => setSelectedTab(e.currentTarget.innerText)}
            className={`${
              selectedTab == tab ? "bg-foreground text-white" : "bg-white"
            } grow rounded-t-md border-[1px] border-foreground py-2`}
          >
            {tab}
          </button>
        ))}
      </div>
      {selectedTab == "Departure" && <DepartureForm />}
      {selectedTab == "On The Water" && <OnTheWater />}
      {selectedTab == "Search" && <SearchHistory />}
    </div>
  );
}
