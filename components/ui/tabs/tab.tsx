"use client";
import { ItemTypes, Trip, TripsData } from "@/types/types";
import DepartureForm from "../forms/departure-form";
import { useTabNavigation } from "@/hooks/hooks";
import MainContainer from "../containers/main-container";
import Link from "next/link";

export default function Tab({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const tabs = ["Departure", "Rented Out", "Search"];
  const { selectedTab, handleTabClick } = useTabNavigation(tabs, "Departure");

  return (
    <div className="flex flex-col w-full md:w-5/6">
      <div className="flex">
        {tabs.map((tab) => (
          <Link
            key={tab}
            href={{
              pathname: `/main-rental-page`,
              query: { currentTab: tab }
            }}
            className={`${selectedTab === tab ? "bg-foreground text-white" : "bg-white"
              } grow rounded-t-md border-[1px] text-lg hover:bg-background border-foreground p-2`}
          >
            {tab}
          </Link>
        ))}
      </div>
      {children}
    </div>
  );
}

