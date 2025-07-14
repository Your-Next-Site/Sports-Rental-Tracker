"use client";
import { useEndRental } from "@/mutations/mutations";
import MainContainer from "../containers/main-container";
import { use } from "react";
import PaginationBar from "../pagination/pagination-bar";
import { Trip } from "@/types/types";
import { useSearchParams } from "next/navigation";

export default function RentedOut({ tripsPromise }:
  {
    tripsPromise: Promise<{ trips: Trip[], hasMore: boolean, totalPages: number }>
  }) {

  const searchParams = useSearchParams();
  const rentedOutPage = searchParams.get("rentedOutPage") || 0;
  const { trips: data, hasMore, totalPages } = use(tripsPromise);

  const {
    mutate,
    isPending,
    isError: isErrorMutate,
  } = useEndRental(Number(rentedOutPage));

  return (
    <>
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl">Guests with rented equipment</h1>
      </div>
      <Trips
        isError={isErrorMutate}
        data={data}
        isPending={isPending}
        mutate={mutate}
      />
      <PaginationBar page={Number(rentedOutPage)} currentTab={"Rented Out"} hasMore={hasMore} totalPages={totalPages} pathName={"/main-rental-page"} />
    </>
  );
}

function Trips({
  isError,
  data,
  isPending,
  mutate,
}: {
  isError: boolean;
  data: any[] | undefined;
  isPending: boolean;
  mutate?: (id: number) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-4 ">
      {isError && <p className="text-red-500">Error marking raft arrived</p>}
      {data && data.length > 0 ? (
        data.map((trip, index) => (
          <div key={index} className="bg-white p-4 rounded shadow-2xl md:w-1/2 lg:w-1/3 xl:w-1/4 w-full">
            <h2 className="text-lg">{trip.guest_name}</h2>
            {trip.arrival_time ?
              <p>Departure Time: {new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(trip.departure_time))}</p>
              :
              <p>Departure Time: {new Intl.DateTimeFormat('en-CA', { hour: '2-digit', minute: '2-digit' }).format(new Date(trip.departure_time))}</p>
            }
            {trip.arrival_time ?
              <>
                <p>Arrival Time: {new Intl.DateTimeFormat('en-CA', { hour: '2-digit', minute: '2-digit' }).format(new Date(trip.arrival_time))}</p>
                <p className={`p-2 rounded ${((new Date(trip.arrival_time).getTime() - new Date(trip.departure_time).getTime()) / (1000 * 60 * 60)) <= Number(process.env.NEXT_PUBLIC_TRIP_LIMIT)
                  ? 'bg-green-500'
                  : 'bg-red-500'} text-white`}>
                  Duration: {((new Date(trip.arrival_time).getTime() - new Date(trip.departure_time).getTime()) /
                    (1000 * 60 * 60)).toFixed(2)} hours
                </p>
              </>
              :
              <p className={`p-2 rounded text-white ${((new Date().getTime() - new Date(trip.departure_time).getTime()) / (1000 * 60 * 60)) <= Number(process.env.NEXT_PUBLIC_TRIP_WARNING)
                ? 'bg-green-400'
                : ((new Date().getTime() - new Date(trip.departure_time).getTime()) / (1000 * 60 * 60)) <= Number(process.env.NEXT_PUBLIC_TRIP_LIMIT)
                  ? 'bg-yellow-400'
                  : 'bg-red-400'
                }`}>
                Current Duration: {((new Date().getTime() - new Date(trip.departure_time).getTime()) /
                  (1000 * 60 * 60)).toFixed(2)} hours
              </p>
            }
            <p>Item Type: {trip.item_type_id}</p>
            <p>Unit Number: {trip.unit_number}</p>
            {mutate &&
              <button
                onClick={() => mutate(trip.id)}
                disabled={isPending}
                className="bg-buttoncolormain hover:bg-buttoncolorsecend text-white p-2 mt-auto md:w-full text-center mx-auto shadow-lg">
                {!isPending ? 'Mark Arrived' : 'Pending'}
              </button>
            }
          </div>
        ))
      ) : (
        <p className="bg-white p-4 rounded shadow-2xl w-full md:w-1/2 lg:w-1/3 xl:w-1/4">No one is on the water</p>
      )}
    </div>
  );
}