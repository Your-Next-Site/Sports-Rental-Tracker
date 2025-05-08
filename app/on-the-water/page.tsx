'use client'
import MainContainer from "@/components/ui/containers/main-container";
import PageContainer from "@/components/ui/containers/page-container";
import DepartureForm from "@/components/ui/forms/departure-form";
import { useGetTrips } from "@/hooks/hooks";

export default function Page() {

    const trips = useGetTrips();
    return (
        <PageContainer>
            <MainContainer>
                <DepartureForm />
            </MainContainer>
            <MainContainer>
                <div className="flex flex-col gap-8">
                    <h1 className="text-2xl">Guests on the Water</h1>
                    <div className="flex flex-wrap justify-center gap-4">
                        {trips.data?.map((trip, index) => (
                            <div key={index} className="bg-white p-4 rounded shadow-2xl md:w-1/2 lg:w-1/3 xl:w-1/4">
                                <h2 className="text-lg">{trip.guest_name}</h2>
                                <p>Departure Time: {trip.departure_time}</p>
                                <p>Raft Size: {trip.raft_type_name}</p>
                                <p>Unit Number: {trip.id}</p>
                                <button className="bg-buttoncolormain hover:bg-buttoncolorsecend hover:text-white p-4 mt-auto md:w-full text-center mx-auto">
                                    Mark Arrived
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </MainContainer>
        </PageContainer>
    );
}
