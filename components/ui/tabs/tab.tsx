import { ItemTypes } from "@/types/types"; import DepartureForm from "../forms/departure-form";
import MainContainer from "../containers/main-container";
import Link from "next/link";

export default function Tab({
  currentTab,
  itemTypesPromise,
  rentedOut,
  searchHistory
}: {
  currentTab: string;
  itemTypesPromise: Promise<ItemTypes[]>;
  rentedOut: React.ReactNode;
  searchHistory: React.ReactNode;
}) {

  const tabs = ["Departure", "Rented Out", "Search"];

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
            className={`${currentTab === tab ? "bg-foreground text-white" : "bg-white"
              } grow rounded-t-md border-[1px] text-lg hover:bg-background border-foreground p-2`}
          >
            {tab}
          </Link>
        ))}
      </div>
      <MainContainer>
        {currentTab === "Departure" && <DepartureForm itemTypesPromise={itemTypesPromise} />}
        {currentTab === "Rented Out" && <>{rentedOut}</>}
        {currentTab === "Search" && <>{searchHistory}</>}
      </MainContainer>
    </div>
  );
}

