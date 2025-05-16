'use client'
import { useAddRaftToWater } from "@/mutations/mutations";
import MainContainer from "../containers/main-container";
import { useGetBookings } from "@/hooks/hooks";
import Select from 'react-select';
import CreatableSelect from "react-select/creatable";


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

export default function DepartureForm() {
    const { data, isLoading, isError, refetch } = useGetBookings();
    const { mutate, isPending } = useAddRaftToWater();

    const guests = data && data["booking/index"]
        ? Object.values(data["booking/index"]).map((booking) => ({
            name: (booking as Booking).customer_name,
            bookingId: (booking as Booking).booking_id,
            summary: (booking as Booking).summary.replace(/Sit-on-top /i, ''),
        }))
        : [];

    console.log(data)
    console.log(guests);

    return (
        <MainContainer>
            <h1 className="text-2xl">Show a guests departure </h1>
            <button className='border rounded-sm md:w-1/6 w-2/6 mx-auto hover:bg-gray-100' onClick={() => refetch}>Refetch Bookings</button>
            {isLoading && <p>Loading bookings...</p>}
            {isError && <p className="text-red-500">Error loading bookings!</p>}
            <form
                action={mutate}
                className="flex flex-col gap-8 "
            >
                <Inputs isPending={isPending} guests={guests} boatOptions={boatOptions} />
            </form>
        </MainContainer>
    );
}

function Inputs({ isPending, guests, boatOptions }: { isPending: boolean, guests: { name: string, bookingId: number, summary: string }[], boatOptions: { value: string, label: string }[] }) {

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
                    instanceId="guest-select"
                    options={guests.map(guest => ({
                        value: guest.bookingId,
                        label: guest.name
                    }))}
                    onChange={(selectedOption) => {
                        if (selectedOption) {
                            const guest = guests.find(g => g.bookingId === selectedOption.value);
                            if (guest) {
                                (document.querySelector('select[name="raft-type"]') as HTMLSelectElement).value = getRaftType(guest.summary);
                                (document.querySelector('input[name="booking-id"]') as HTMLInputElement).value = guest.bookingId.toString();
                                (document.querySelector('input[name="guest-name"]') as HTMLInputElement).value = guest.name;
                            } else {
                                (document.querySelector('input[name="guest-name"]') as HTMLInputElement).value = selectedOption.label;
                                (document.querySelector('input[name="booking-id"]') as HTMLInputElement).value = '';
                            }
                        }
                    }}
                    className=" rounded-sm md:w-2/6 w-full"
                    classNames={{
                        control: () => "h-10 w-full",
                    }}
                />
                <input type="hidden" name="booking-id" />
                <input type="hidden" name="guest-name" />
                <select name="raft-type" className="border p-2 h-10 rounded-sm w-full md:w-2/6">
                    {boatOptions.map(boat => (
                        <option key={boat.value} value={boat.value}>
                            {boat.label}
                        </option>
                    ))}
                </select>
                <input
                    className="border rounded-sm h-10 w-full md:w-2/6 p-2"
                    type="number"
                    name="unit-number"
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