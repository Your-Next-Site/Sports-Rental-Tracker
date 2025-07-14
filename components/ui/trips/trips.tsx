import { Trip } from "@/types/types";

export function Trips({ trips }: { trips: Trip[] }) {
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
