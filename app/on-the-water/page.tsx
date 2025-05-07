import MainContainer from "@/components/ui/containers/main-container";
import PageContainer from "@/components/ui/containers/page-container";
import DepartureForm from "@/components/ui/forms/departure-form";

const dummyData = [
    { name: "John Doe", raftSize: "single-kayak", unit: 101, time: "9:00 AM" },
    { name: "Jane Smith", raftSize: "medium-raft", unit: 102, time: "9:30 AM" },
    { name: "Mike Johnson", raftSize: "double-kayak", unit: 103, time: "10:00 AM" },
    { name: "Sarah Williams", raftSize: "large-raft", unit: 104, time: "10:30 AM" },
    { name: "Tom Brown", raftSize: "single-kayak", unit: 105, time: "11:00 AM" },
    { name: "Emily Davis", raftSize: "medium-raft", unit: 106, time: "11:30 AM" },
    { name: "Robert Wilson", raftSize: "double-kayak", unit: 107, time: "12:00 PM" },
    { name: "Lisa Anderson", raftSize: "large-raft", unit: 108, time: "12:30 PM" },
    { name: "David Taylor", raftSize: "single-kayak", unit: 109, time: "1:00 PM" },
    { name: "Mary Martinez", raftSize: "medium-raft", unit: 110, time: "1:30 PM" }
]

export default function Page() {
    return (
        <PageContainer>
            <MainContainer>
                <DepartureForm />
            </MainContainer>
            <MainContainer>
                <div className="flex flex-col gap-8">
                    <h1 className="text-2xl">Guests on the Water</h1>
                    <div className="flex flex-wrap justify-center gap-4">
                        {dummyData.map((trip, index) => (
                            <div key={index} className="bg-white p-4 rounded shadow-xl md:w-1/2 lg:w-1/3 xl:w-1/4">
                                <h2 className="text-lg">{trip.name}</h2>
                                <p>Departure Time: {trip.time}</p>
                                <p>Raft Size: {trip.raftSize}</p>
                                <p>Unit Number: {trip.unit}</p>
                                <button className="bg-buttoncolormain hover:bg-buttoncolorsecend hover:text-white p-4 mt-auto md:w-full text-center mx-auto">
                                    Arrived
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </MainContainer>
        </PageContainer>
    );
}
