'use client'
import { useAddRaftToWater } from "@/mutations/mutations";
import MainContainer from "../containers/main-container";

const boatOptions = [
    { value: 'single-kayak', label: 'Single Kayak' },
    { value: 'double-kayak', label: 'Double Kayak' },
    { value: 'small-raft', label: 'Small Raft' },
    { value: 'round-raft', label: 'Round Raft' },
    { value: 'medium-raft', label: 'Medium Raft' },
    { value: 'large-raft', label: 'Large Raft' }
];

export default function DepartureForm() {
    const { mutate, isPending } = useAddRaftToWater();
    return (
        <MainContainer>
            <form
                action={mutate}
                className="flex flex-col gap-8  "
            >
                <h1 className="text-2xl">Show a guests departure </h1>
                <Inputs isPending={isPending} />
            </form>
        </MainContainer>
    );
}

function Inputs({ isPending }: { isPending: boolean }) {
    return (
        <div className="flex flex-col md:flex-row gap-4">
            <input
                className="border rounded-sm md:w-2/6 p-2"
                type="text"
                name="guest-name"
                placeholder=" Guest Name"
                required
            />
            <select name="raft-type" className="border rounded-sm md:w-1/6">
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