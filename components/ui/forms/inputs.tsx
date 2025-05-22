import { getRaftType } from "@/lib/utils/functions";
import { GuestOption, InputsProps } from "@/types/types";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const guests = [
    { bookingId: 1, name: 'John Doe', summary: 'Some summary' },
    { bookingId: 2, name: 'Jane Smith', summary: 'Another summary' },
    { bookingId: 3, name: 'Bob Johnson', summary: 'Summary 3' },
    { bookingId: 4, name: 'Alice Brown', summary: 'Summary 4' },
    { bookingId: 5, name: 'Mike Davis', summary: 'Summary 5' },
    { bookingId: 6, name: 'Emily Taylor', summary: 'Summary 6' },
    { bookingId: 7, name: 'David Lee', summary: 'Summary 7' },
    { bookingId: 8, name: 'Sarah Kim', summary: 'Summary 8' },
    { bookingId: 9, name: 'Kevin White', summary: 'Summary 9' },
    { bookingId: 10, name: 'Olivia Martin', summary: 'Summary 10' },
    { bookingId: 11, name: 'William Harris', summary: 'Summary 11' },
    { bookingId: 12, name: 'Ava Thompson', summary: 'Summary 12' },
    { bookingId: 13, name: 'James Wilson', summary: 'Summary 13' },
    { bookingId: 14, name: 'Isabella Garcia', summary: 'Summary 14' },
    { bookingId: 15, name: 'George Miller', summary: 'Summary 15' },
    { bookingId: 16, name: 'Sophia Martinez', summary: 'Summary 16' },
    { bookingId: 17, name: 'Robert Anderson', summary: 'Summary 17' },
    { bookingId: 18, name: 'Mia Thomas', summary: 'Summary 18' },
    { bookingId: 19, name: 'Richard Jackson', summary: 'Summary 19' },
    { bookingId: 20, name: 'Charlotte Lewis', summary: 'Summary 20' },
    { bookingId: 21, name: 'Charles Hall', summary: 'Summary 21' },
    { bookingId: 22, name: 'Amelia Walker', summary: 'Summary 22' },
    { bookingId: 23, name: 'Joseph Allen', summary: 'Summary 23' },
    { bookingId: 24, name: 'Harper Young', summary: 'Summary 24' },
    { bookingId: 25, name: 'Thomas Scott', summary: 'Summary 25' },
    { bookingId: 26, name: 'Evelyn King', summary: 'Summary 26' },
    { bookingId: 27, name: 'Christopher Jenkins', summary: 'Summary 27' },
    { bookingId: 28, name: 'Abigail Russell', summary: 'Summary 28' },
    { bookingId: 29, name: 'Daniel Sanchez', summary: 'Summary 29' },
    { bookingId: 30, name: 'Lily Brooks', summary: 'Summary 30' },
    { bookingId: 31, name: 'Matthew Price', summary: 'Summary 31' },
    { bookingId: 32, name: 'Madison Lopez', summary: 'Summary 32' },
    { bookingId: 33, name: 'Joshua Fisher', summary: 'Summary 33' },
    { bookingId: 34, name: 'Sydney Richardson', summary: 'Summary 34' },
    { bookingId: 35, name: 'Andrew Cooper', summary: 'Summary 35' },
];

export default function Inputs({
    isPending,
    boatOptions,
    selectedGuest,
    setSelectedGuest,
    raftType,
    setRaftType,
    unitNumber,
    setUnitNumber
}: InputsProps) {

    return (
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col md:flex-row w-full p-2 gap-4 justify-center items-center">
                <CreatableSelect
                    required
                    placeholder="Select Guest"
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
                            document.getElementById('target-element')?.scrollIntoView({ behavior: 'smooth' });
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
                    placeholder="Select Raft"
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