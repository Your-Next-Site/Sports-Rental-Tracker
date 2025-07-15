"use client";
import { ItemTypes, Trip, TripsData } from "@/types/types";
import DepartureForm from "../forms/departure-form";
import { useTabNavigation } from "@/hooks/hooks";
import MainContainer from "../containers/main-container";

export default function Tab({
  itemTypesPromise,
  rentedOut,
  searchHistory
}: {
  itemTypesPromise: Promise<ItemTypes[]>;
  rentedOut: React.ReactNode;
  searchHistory: React.ReactNode;
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
      <MainContainer>
        {selectedTab === "Departure" && <DepartureForm itemTypesPromise={itemTypesPromise} />}
        {selectedTab === "Rented Out" && <>{rentedOut}</>}
        {selectedTab === "Search" && <>{searchHistory}</>}
      </MainContainer>
    </div>
  );
}

