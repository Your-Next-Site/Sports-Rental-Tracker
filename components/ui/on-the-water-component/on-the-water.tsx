'use client'
import MainContainer from "../containers/main-container";
import { useGetTrips } from "@/hooks/hooks";

export default function OnTheWater() { 

const { data } = useGetTrips();
console.log(data)

    return (
        <MainContainer>
            <div className="flex flex-col gap-8">
                <h1 className="text-2xl">Guests on the Water</h1>
                <div className="flex flex-wrap justify-center gap-4">
                    {data?.map((trip, index) => (
                        <div key={index} className="bg-white p-4 rounded shadow-2xl md:w-1/2 lg:w-1/3 xl:w-1/4">
                            <h2 className="text-lg">{trip.guest_name}</h2>
                            {/* <p>{trip.departure_time}</p> */}
                            {/* <p>Departure Time: {new Date(trip.departure_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p> */}
                            <p>{new Date(trip.departure_time).toLocaleString()}</p>
                            <p>Raft Size: {trip.raft_type_name}</p>
                            <p>Unit Number: {trip.id}</p>
                            <button className="bg-buttoncolormain hover:bg-buttoncolorsecend hover:text-white p-4 mt-auto md:w-full text-center mx-auto shadow-lg">
                                Mark Arrived
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </MainContainer>
    );
}