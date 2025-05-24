'use client'
import { useAddRaftToWater } from "@/mutations/mutations";
import MainContainer from "../containers/main-container";
import { useGetBookings } from "@/hooks/hooks";
import { useState } from 'react';
import { BookingData, GuestData, RaftOption } from "@/types/types";
import { boatOptions } from "@/lib/utils/rafts";
import Inputs from "./inputs";

export default function DepartureForm() {
    const [selectedGuest, setSelectedGuest] = useState<{ bookingId: number | null; name: string } | null>(null);
    const [raftType, setRaftType] = useState<RaftOption | null>(null);
    const [unitNumber, setUnitNumber] = useState('');
    const [date, setDate] = useState(new Date())

    const { data, isLoading, isError, refetch } = useGetBookings(date);
    const { mutate, isPending } = useAddRaftToWater();

    if(data) {
        const guests: GuestData[] = [];
        const uniqueGuestsMap = new Map<string, GuestData>(); // Use a Map to track unique guest names

        (data as BookingData[]).forEach((booking: BookingData) => {
            const guestName = booking.customer_name;
            // Only add the guest if their name hasn't been added yet
            if (!uniqueGuestsMap.has(guestName)) {
                uniqueGuestsMap.set(guestName, {
                    name: guestName,
                    bookingId: booking.booking_id,
                    // Ensure summary is handled if it can be null
                    summary: booking.summary?.replace(/Sit-on-top /i, '') || '',
                });
            }
        });
        // Convert the Map values back to an array
        guests.push(...Array.from(uniqueGuestsMap.values()));
    }

    function onRefetch() {
        setDate(new Date)
        refetch();
    }

    return (
        <MainContainer>
            <h1 className="text-2xl">Show a guests departure </h1>
            <button className='border rounded-sm md:w-1/6 w-2/6 mx-auto hover:bg-gray-100' onClick={() => onRefetch()}>Refetch Bookings</button>
            {isLoading && <p>Loading bookings...</p>}
            {isError && <p className="text-red-500">Error loading bookings!</p>}
            <form
                action={(formData: FormData) => {
                    formData.append('booking-id', selectedGuest?.bookingId?.toString() || '');
                    formData.append('guest-name', selectedGuest?.name || '');
                    formData.append('raft-type', raftType?.value || '');
                    formData.append('unit-number', unitNumber);
                    mutate(formData);
                    setSelectedGuest(null);
                    setRaftType(null);
                    setUnitNumber('');
                }}
                className="flex flex-col gap-2 "
            >
                <Inputs
                    isPending={isPending}
                    guests={guests}
                    boatOptions={boatOptions}
                    selectedGuest={selectedGuest}
                    setSelectedGuest={setSelectedGuest}
                    raftType={raftType}
                    setRaftType={setRaftType}
                    unitNumber={unitNumber}
                    setUnitNumber={setUnitNumber}
                />
            </form>
        </MainContainer>
    );
}

