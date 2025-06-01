import { getRaftType } from "@/lib/utils/functions";
import { GuestOption, InputsProps } from "@/types/types";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import AddActiveTripButton from "../buttons/add-active-trip-button";

export default function Inputs({
    isPending,
    boatOptions,
}: InputsProps) {

    return (
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col md:flex-row w-full p-2 gap-4 justify-center items-center">
                <CreatableSelect
                    required
                    placeholder="Select Guest"
                    instanceId="guest-select"
                    name="guest-name"
                    className=" rounded-sm md:w-2/6 w-full"
                    classNames={{
                        control: () => "h-10 w-full",
                    }}
                />
                <Select
                    required
                    instanceId="raft-type-select"
                    name="item-type"
                    options={boatOptions}
                    placeholder="Select Raft"
                    className=" rounded-sm md:w-2/6 w-full"
                    classNames={{
                        control: () => "h-10 w-full",
                    }}
                />
                <input
                    className="border border-gray-300 rounded-sm h-10 w-full md:w-2/6 p-2"
                    name="unit-number"
                    type="number"
                    placeholder="Unit Number"
                    required
                />
            </div>
            < AddActiveTripButton isPending={isPending} />
        </div>
    );
}