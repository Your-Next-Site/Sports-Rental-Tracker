'use client'
import { useRemoveRaftFromWater } from "@/mutations/mutations";
import MainContainer from "../containers/main-container";
import { useGetTrips } from "@/hooks/hooks";
import { useState } from "react";

export default function SearchHistory() {

    const [displayTripsContext, setDisplayTripsContext] = useState("current")

    const { data, isLoading, isError: isErrorData } = useGetTrips(displayTripsContext === "current");
    const { mutate, isPending, isError: isErrorMutate } = useRemoveRaftFromWater();


    if (isLoading) return <MainContainer> Loading.... </MainContainer>
    if (isErrorData) return <MainContainer>Error loading trips</MainContainer>

    return (
        <MainContainer>
            <div className="flex flex-col gap-8">
                <h1 className="text-2xl">Guests{displayTripsContext === "current" ? " on " : " off "} the Water</h1>
                <div className="flex justify-between items-center">
                    <div></div> {/* Empty div for spacing */}
                    <button
                        onClick={() => setDisplayTripsContext(displayTripsContext === "current" ? "past" : "current")}
                        className="bg-buttoncolormain hover:bg-buttoncolorsecend hover:text-white p-2 rounded mr-4">
                        Show {displayTripsContext === "current" ? "off" : "on"} the Water
                    </button>
                </div>
            </div>
            {displayTripsContext === "current" ?
                <Trips isError={isErrorMutate} data={data} isPending={isPending} mutate={mutate} /> 
                :
                <Trips isError={isErrorMutate} data={data} isPending={isPending} />
            }
        </MainContainer>
    );
}

function Trips({ isError, data, isPending, mutate }: {
    isError: boolean;
    data: any[] | undefined;
    isPending: boolean;
    mutate?: (id: number) => void
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
                        <p>Raft Size: {trip.raft_type_name}</p>
                        <p>Unit Number: {trip.unit_number}</p>
                        {mutate &&
                            <button
                                onClick={() => mutate(trip.id)}
                                disabled={isPending}
                                className="bg-buttoncolormain hover:bg-buttoncolorsecend hover:text-white p-4 mt-auto md:w-full text-center mx-auto shadow-lg">
                                {!isPending ? 'Mark Arrived' : 'Pending'}
                            </button>
                        }
                    </div>
                ))
            ) : (
                <p className="bg-white p-4 rounded shadow-2xl md:w-1/2 lg:w-1/3 xl:w-1/4">No one is on the water</p>
            )}
        </div>
    );
}


