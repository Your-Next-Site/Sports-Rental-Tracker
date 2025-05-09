'use client'
import { useRemoveRaftFromWater } from "@/mutations/mutations";
import MainContainer from "../containers/main-container";
import { useGetTrips } from "@/hooks/hooks";

export default function OnTheWater() {

    const { data, isLoading } = useGetTrips();
    const { mutate, isPending, isError } = useRemoveRaftFromWater();

    if (isLoading) return <MainContainer> Loading.... </MainContainer>

    return (
        <MainContainer>
            <div className="flex flex-col gap-8">
                <h1 className="text-2xl">Guests on the Water</h1>
                <div className="flex flex-wrap justify-center gap-4">
                    {isError &&
                        <p className="text-red-500">Error marking raft arrived</p>
                    }
                    {data && data.length > 0 ? (
                        data.map((trip, index) => (
                            <div key={index} className="bg-white p-4 rounded shadow-2xl md:w-1/2 lg:w-1/3 xl:w-1/4">
                                <h2 className="text-lg">{trip.guest_name}</h2>
                                <p>Departure Time:{new Date(trip.departure_time).toLocaleString('en-CA', { dateStyle: 'short', timeStyle: 'short' })} </p>
                                <p>Raft Size: {trip.raft_type_name}</p>
                                <p>Unit Number: {trip.unit_number}</p>
                                <button
                                    onClick={trip_id => mutate(trip.id)}
                                    disabled={isPending}
                                    className="bg-buttoncolormain hover:bg-buttoncolorsecend hover:text-white p-4 mt-auto md:w-full text-center mx-auto shadow-lg">
                                    Mark Arrived
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="bg-white p-4 rounded shadow-2xl md:w-1/2 lg:w-1/3 xl:w-1/4">No one is on the water</p>
                    )}
                </div>
            </div>
        </MainContainer >
    );
}