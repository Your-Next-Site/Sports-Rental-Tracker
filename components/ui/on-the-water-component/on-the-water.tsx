'use client'
import { useRemoveRaftFromWater } from "@/mutations/mutations";
import MainContainer from "../containers/main-container";
import { useGetTrips } from "@/hooks/hooks";
import { useState } from "react";

export default function OnTheWater() {

    const [displayTripsContext, setDisplayTripsContext] = useState("current")

    const { data, isLoading } = useGetTrips(displayTripsContext === "current");
    const { mutate, isPending, isError } = useRemoveRaftFromWater();   
    

    if (isLoading) return <MainContainer> Loading.... </MainContainer>
    if (isError) return <MainContainer>Error loading trips</MainContainer>

    return (
        <MainContainer>
            <div className="flex flex-col gap-8">
                <h1 className="text-2xl">Guests{displayTripsContext === "current" ? " on " : " off "} the Water</h1>
                <div className="flex justify-between items-center">
                    <div></div> {/* Empty div for spacing */}
                    <button
                        onClick={() => setDisplayTripsContext(displayTripsContext === "current" ? "past" : "current")}
                        className="bg-buttoncolormain hover:bg-buttoncolorsecend hover:text-white p-2 rounded">
                        Show {displayTripsContext === "current" ? "Past" : "Current"} Trips
                    </button>
                </div></div>
            {displayTripsContext === "current" ?
                <Trips isError={isError} data={data} isPending={isPending} mutate={mutate} /> :
                <Trips isError={isError} data={data} isPending={isPending} />
            }
        </MainContainer >
    );
}

function Trips({ isError, data, isPending, mutate }: {
    isError: boolean;
    data: any[] | undefined;
    isPending: boolean;
    mutate?: (id: number) => void
}) {
    return (
        <div className="flex flex-wrap justify-center gap-4">
            {isError && <p className="text-red-500">Error marking raft arrived</p>}
            {data && data.length > 0 ? (
                data.map((trip, index) => (
                    <div key={index} className="bg-white p-4 rounded shadow-2xl md:w-1/2 lg:w-1/3 xl:w-1/4">
                        <h2 className="text-lg">{trip.guest_name}</h2>
                        <p>Departure Time: {new Intl.DateTimeFormat('en-CA', { hour: '2-digit', minute: '2-digit' }).format(new Date(trip.departure_time))}</p>
                        {trip.arrival_time !== null &&
                           <p>Arrival Time: {new Intl.DateTimeFormat('en-CA', { hour: '2-digit', minute: '2-digit' }).format(new Date(trip.arrival_time))}</p>
                        }
                        <p>Raft Size: {trip.raft_type_name}</p>
                        <p>Unit Number: {trip.unit_number}</p>
                        {mutate &&
                            <button
                                onClick={() => mutate(trip.id)}
                                disabled={isPending}
                                className="bg-buttoncolormain hover:bg-buttoncolorsecend hover:text-white p-4 mt-auto md:w-full text-center mx-auto shadow-lg">
                                Mark Arrived
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


function PastTrips({ isError, data, isPending }: {
    isError: boolean;
    data: any[] | undefined;
    isPending: boolean;
}) {
    return (
        <div>test</div>
    )
}