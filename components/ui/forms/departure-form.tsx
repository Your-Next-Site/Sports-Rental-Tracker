'use client'
import { useAddRaftToWater } from "@/mutations/mutations";
import MainContainer from "../containers/main-container";
import { useGetBookings } from "@/hooks/hooks";

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
    const { data } = useGetBookings();
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

            <form
                action={mutate}
                className="flex flex-col gap-8  "
            >
                <h1 className="text-2xl">Show a guests departure </h1>
                <Inputs isPending={isPending} guests={guests} boatOptions={boatOptions} />
            </form>
        </MainContainer>
    );
}

function Inputs({ isPending, guests, boatOptions }: { isPending: boolean, guests: { name: string, bookingId: number, summary: string }[], boatOptions: { value: string, label: string }[] }) {
    const handleGuestChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedGuest = guests.find(guest => guest.bookingId.toString() === event.target.value);
        if (selectedGuest) {
            (document.querySelector('select[name="raft-type"]') as HTMLSelectElement).value = getRaftType(selectedGuest.summary);
            (document.querySelector('input[name="guest-name"]') as HTMLInputElement).value = selectedGuest.name;
        }
    };

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
            <input
                list="guests"
                name="guest-name"
                className="border p-2 rounded-sm md:w-1/6 appearance-none"
                placeholder="Type or select guest name"
                onChange={(event) => {
                    const selectedGuest = guests.find(guest => guest.name.toLowerCase() === event.target.value.toLowerCase());
                    if (selectedGuest) {
                        (document.querySelector('select[name="raft-type"]') as HTMLSelectElement).value = getRaftType(selectedGuest.summary);
                        (document.querySelector('input[name="booking-id"]') as HTMLInputElement).value = selectedGuest.bookingId.toString();
                    }
                }}
            />
            <datalist id="guests">
                {guests.map(guest => (
                    <option key={guest.bookingId} value={guest.name} />
                ))}
            </datalist>
            <input type="hidden" name="booking-id" />
            <select name="raft-type" className="border p-2  rounded-sm md:w-1/6">
                {boatOptions.map(boat => (
                    <option key={boat.value} value={boat.value}>
                        {boat.label}
                    </option>
                ))}
            </select>
            <input
                className="border rounded-sm md:w-2/6 p-2"
                type="number"
                name="unit-number"
                placeholder="Unit Number"
                required
            />
            <button
                disabled={isPending}
                className="bg-buttoncolormain hover:bg-buttoncolorsecend hover:text-white p-4 md:w-1/6 text-center shadow-lg">
                {!isPending ?
                    'Mark Guest on The Water' : 'pending'
                }
            </button>
        </div>
    );
}