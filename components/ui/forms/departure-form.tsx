'use client'
import { useAddRaftToWater } from "@/mutations/mutations";
import MainContainer from "../containers/main-container";
import { useGetBookings } from "@/hooks/hooks";
import Select from 'react-select';
import CreatableSelect from "react-select/creatable";
import { useState } from 'react';


const boatOptions = [
    { value: 'single-kayak', label: 'Single Kayak' },
    { value: 'double-kayak', label: 'Double Kayak' },
    { value: 'small-raft', label: 'Small Raft' },
    { value: 'round-raft', label: 'Round Raft' },
    { value: 'medium-raft', label: 'Medium Raft' },
    { value: 'large-raft', label: 'Large Raft' }
];

interface Booking {
    customer_name: string;
    booking_id: number;
    summary: string;
}

interface GuestOption {
    value: number;
    label: string;
    summary: string;
}

interface RaftOption {
    value: string;
    label: string;
}

export default function DepartureForm() {
    const { data, isLoading, isError, refetch } = useGetBookings();
    const [selectedGuest, setSelectedGuest] = useState<{ bookingId: number | null; name: string } | null>(null);
    const [raftType, setRaftType] = useState<RaftOption | null>(null);
    const [unitNumber, setUnitNumber] = useState('');

    const { mutate, isPending } = useAddRaftToWater();

    const guests = data
        ? data.map((booking) => ({
            name: booking.customer_name,
            bookingId: booking.booking_id,
            summary: booking.summary.replace(/Sit-on-top /i, ''),
        }))
        : [];


    console.log(data)
    console.log(guests);

    return (
        <MainContainer>
            <h1 className="text-2xl">Show a guests departure </h1>
            <button className='border rounded-sm md:w-1/6 w-2/6 mx-auto hover:bg-gray-100' onClick={() => refetch()}>Refetch Bookings</button>
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
                className="flex flex-col gap-8 "
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

function Inputs({
    isPending,
    guests,
    boatOptions,
    selectedGuest,
    setSelectedGuest,
    raftType,
    setRaftType,
    unitNumber,
    setUnitNumber
}: {
    isPending: boolean,
    guests: { name: string, bookingId: number, summary: string }[],
    boatOptions: RaftOption[],
    selectedGuest: { bookingId: number | null; name: string } | null,
    setSelectedGuest: (guest: { bookingId: number | null; name: string } | null) => void,
    raftType: RaftOption | null,
    setRaftType: (raftType: RaftOption | null) => void,
    unitNumber: string,
    setUnitNumber: (unitNumber: string) => void
}) {

    const getRaftType = (summary: string) => {
        summary = summary.toLowerCase();
        if (summary.includes('single')) {
            return 'single-kayak';
        } else if (summary.includes('double')) {
            return 'double-kayak';
        } else if (summary.includes('small raft')) {
            return 'small-raft';
        } else if (summary.includes('round raft')) {
            return 'round-raft';
        } else if (summary.includes('medium raft')) {
            return 'medium-raft';
        } else if (summary.includes('large raft')) {
            return 'large-raft';
        } else {
            return '';
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col md:flex-row w-full p-2 gap-4 justify-center items-center">
                <CreatableSelect
                    required
                    instanceId="guest-select"
                    options={guests.map(guest => ({
                        value: guest.bookingId,
                        label: guest.name,
                        summary: guest.summary
                    })) as GuestOption[]}
                    value={selectedGuest ? { value: selectedGuest.bookingId, label: selectedGuest.name } : null}
                    onChange={(selectedOption: any) => {
                        if (selectedOption) {
                            const guest = guests.find(g => g.bookingId === selectedOption.value);
                            if (guest) {
                                setSelectedGuest({
                                    bookingId: guest.bookingId,
                                    name: guest.name,
                                });
                                const raftTypeValue = getRaftType(guest.summary);
                                setRaftType(boatOptions.find(option => option.value === raftTypeValue) || null);
                            } else {
                                setSelectedGuest({
                                    bookingId: null,
                                    name: selectedOption.label,
                                });
                                setRaftType(null);
                            }
                        }
                    }}
                    className=" rounded-sm md:w-2/6 w-full"
                    classNames={{
                        control: () => "h-10 w-full",
                    }}
                />
                <Select
                    required
                    instanceId="raft-type-select"
                    options={boatOptions}
                    value={raftType}
                    onChange={(selectedOption: any) => {
                        setRaftType(selectedOption);
                    }}
                    placeholder="Select Raft Type"
                    className=" rounded-sm md:w-2/6 w-full"
                    classNames={{
                        control: () => "h-10 w-full",
                    }}
                />
                <input
                    className="border border-gray-300 rounded-sm h-10 w-full md:w-2/6 p-2"
                    type="number"
                    value={unitNumber}
                    onChange={(e) => setUnitNumber(e.target.value)}
                    placeholder="Unit Number"
                    required
                />
            </div>
            <button
                disabled={isPending}
                className="bg-buttoncolormain hover:bg-buttoncolorsecend p-2 hover:text-white md:w-2/6 text-center shadow-lg">
                {!isPending ?
                    'Mark Guest on The Water' : 'pending'
                }
            </button>
        </div>
    );
}