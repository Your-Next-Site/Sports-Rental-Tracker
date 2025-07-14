"use client";
import { Suspense, useState, useCallback } from "react";
import { ItemTypes, Trip, TripsData } from "@/types/types";
import DepartureForm from "../forms/departure-form";
import RentedOut from "../rented-out/rented-out";
import SearchHistory from "../search-history-component/search-history";
import RentedOutFallback from "../fallbacks/rented-out-fallback";
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function Tab({ rentedOutPage, tripsPromise, itemTypesPromise }:
  {
    rentedOutPage: number,
    tripsPromise: Promise<TripsData>
    itemTypesPromise: Promise<ItemTypes[]>
  }) {

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentTab = searchParams.get("currentTab")
  const [selectedTab, setSelectedTab] = useState(currentTab);

  const tabs = ["Departure", "Rented Out", "Search"];

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    router.push(pathname + '?' + createQueryString('currentTab', tab))
  };

  return (
    <div className="flex flex-col  w-full md:w-5/6">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={(e) => handleTabClick(e.currentTarget.innerText)}
            className={`${selectedTab == tab ? "bg-foreground text-white" : "bg-white"
              } grow rounded-t-md border-[1px] hover:bg-background border-foreground py-2`}
          >
            {tab}
          </button>
        ))}
      </div>
      {selectedTab == "Departure" && <DepartureForm itemTypesPromise={itemTypesPromise} />}
      {selectedTab == "Rented Out" && <Suspense fallback={<RentedOutFallback />}>
        <RentedOut tripsPromise={tripsPromise} rentedOutPage={rentedOutPage} />
      </Suspense>}
      {selectedTab == "Search" && <SearchHistory />}
    </div >
  );
}