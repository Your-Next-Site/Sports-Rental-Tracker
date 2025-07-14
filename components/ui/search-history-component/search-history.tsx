"use client";
import { Trip } from "@/types/types";
import PaginationBar from "../pagination/pagination-bar";
import { use} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


export default function SearchHistory({ searchTripsPromise }:
  { searchTripsPromise: Promise<{ trips: Trip[], hasMore: boolean, totalPages: number }> }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchPage = searchParams.get("searchPage") || 0;
  const departureDate = searchParams.get("departureDate") || 0;
  const guestName = searchParams.get("guestName") || ""

  const { trips: data, hasMore, totalPages } = use(searchTripsPromise);

  const updateSearchParams = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    params.set("searchPage", "0"); // reset page to 0 when search params change
    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <>
      <div className="flex flex-col gap-8 min-h-[416px]">
        <h1 className="text-2xl">Search Trips</h1>
        <div className="flex flex-col md:justify-center md:items-center gap-2 md:flex-row">
          <label htmlFor="GuestName">Guest Name</label>
          <input
            name="GuestName"
            type="text"
            className="border-1 p-1"
            value={guestName}
            onChange={(e) => {
              // setGuestName(e.target.value);
              updateSearchParams("guestName", e.target.value);
            }}
          />
          <label htmlFor="Date">Date</label>
          <input
            name="Date"
            type="date"
            max={new Date().toLocaleDateString()}
            className="border-1 p-1"
            value={departureDate}
            onChange={(e) => {
              // setDepartureDate(e.target.value);
              updateSearchParams("departureDate", e.target.value);
            }}
          />
          {/* <button
            onClick={() => refetch()}
            className="bg-buttoncolormain hover:bg-buttoncolorsecend text-white p-2 rounded mr-4"
          >
            Search
          </button> */}
        </div>
        <Trips trips={data} />
      </div>
      <PaginationBar
        page={Number(searchPage)}
        currentTab={"Search"}
        hasMore={hasMore}
        totalPages={totalPages}
        pathName={"/main-rental-page"}
      />
    </>
  );
}

function Trips({ trips }: { trips: Trip[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 ">
      {/* {isError && <p className="text-red-500">Error marking raft arrived</p>} */}
      {trips && trips.length > 0 ? (
        trips.map((trip, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded shadow-2xl md:w-1/2 lg:w-1/3 xl:w-1/4 w-full"
          >
            <h2 className="text-lg">{trip.guest_name}</h2>
            <p>
              Departure Date:{" "}
              {new Intl.DateTimeFormat("en-CA", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }).format(new Date(trip.departure_time))}
            </p>
            <p>
              Departure Time:{" "}
              {new Intl.DateTimeFormat("en-CA", {
                hour: "2-digit",
                minute: "2-digit",
              }).format(new Date(trip.departure_time))}
            </p>
            {trip.arrival_time ? (
              <>
                <p>
                  Arrival Time:{" "}
                  {new Intl.DateTimeFormat("en-CA", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(trip.arrival_time))}
                </p>
                <p
                  className={`p-2 rounded ${(new Date(trip.arrival_time).getTime() -
                    new Date(trip.departure_time).getTime()) /
                    (1000 * 60 * 60) <=
                    Number(process.env.NEXT_PUBLIC_TRIP_LIMIT)
                    ? "bg-green-500"
                    : "bg-red-500"
                    } text-white`}
                >
                  Duration:{" "}
                  {(
                    (new Date(trip.arrival_time).getTime() -
                      new Date(trip.departure_time).getTime()) /
                    (1000 * 60 * 60)
                  ).toFixed(2)}{" "}
                  hours
                </p>
              </>
            ) : (
              <p
                className={`p-2 rounded text-white ${(new Date().getTime() -
                  new Date(trip.departure_time).getTime()) /
                  (1000 * 60 * 60) <=
                  Number(process.env.NEXT_PUBLIC_TRIP_WARNING)
                  ? "bg-green-400"
                  : (new Date().getTime() -
                    new Date(trip.departure_time).getTime()) /
                    (1000 * 60 * 60) <=
                    Number(process.env.NEXT_PUBLIC_TRIP_LIMIT)
                    ? "bg-yellow-400"
                    : "bg-red-400"
                  }`}
              >
                Current Duration:{" "}
                {(
                  (new Date().getTime() -
                    new Date(trip.departure_time).getTime()) /
                  (1000 * 60 * 60)
                ).toFixed(2)}{" "}
                hours
              </p>
            )}
            <p>Item Type: {trip.item_type_id}</p>
            <p>Unit Number: {trip.unit_number}</p>
          </div>
        ))
      ) : (
        <p className="bg-white p-4 rounded shadow-2xl w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
          No results found
        </p>
      )}
    </div>
  );
}
