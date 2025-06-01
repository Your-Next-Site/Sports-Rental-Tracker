import { getRaftType } from "@/lib/utils/functions";
import { GuestOption, InputsProps } from "@/types/types";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import AddActiveTripButton from "../buttons/add-active-trip-button";

export default function Inputs({
    isPending,
    guests,
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
            < AddActiveTripButton isPending={isPending}/>
        </div>
    );
}