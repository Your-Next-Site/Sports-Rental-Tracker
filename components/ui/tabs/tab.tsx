"use client";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
// import { fetchTrips, searchTrips } from "@/hooks/hooks";
import { ItemTypes, Trip, TripsData } from "@/types/types";
import DepartureForm from "../forms/departure-form";
import RentedOut from "../rented-out/rented-out";
import SearchHistory from "../search-history-component/search-history";


export default function Tab({ currentTab, rentedOutPage, tripsPromise, itemTypesPromise }:
  {
    currentTab: string,
    rentedOutPage: number,
    tripsPromise: Promise<TripsData>
    itemTypesPromise: Promise<ItemTypes[]>
  }) {

  // const [selectedTab, setSelectedTab] = useState("Departure");
  const [selectedTab, setSelectedTab] = useState(currentTab);
  const tabs = ["Departure", "Rented Out", "Search"];

  return (
    <div className="flex flex-col  w-full md:w-5/6">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={(e) => { setSelectedTab(e.currentTarget.innerText); }}
            className={`${selectedTab == tab ? "bg-foreground text-white" : "bg-white"
              } grow rounded-t-md border-[1px] hover:bg-background border-foreground py-2`}
          >
            {tab}
          </button>
        ))}
      </div>
      {selectedTab == "Departure" && <DepartureForm itemTypesPromise={itemTypesPromise} />}
      {selectedTab == "Rented Out" && <RentedOut tripsPromise={tripsPromise} rentedOutPage={rentedOutPage} />}
      {selectedTab == "Search" && <SearchHistory />}
      {/* <div><button onClick={()=>revalidatePathAction('main-rental-page')}>Test Refetch</button></div> */}
    </div >
  );
}
