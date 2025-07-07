import { InputsProps } from "@/types/types";
import Select from "react-select";
import AddActiveTripButton from "../buttons/add-active-trip-button";
// import { useGetItemTypes } from "@/hooks/hooks";
import { use } from "react";



export default function Inputs({
    isPending,
    itemTypesPromise,
}: InputsProps) {
    // const { data, isError: isErrorData, isLoading: isLoadingData } = useGetItemTypes();
    const itemsTypes = use(itemTypesPromise);
    console.log("item types:", itemsTypes)
    return (
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col md:flex-row w-full p-2 gap-4 justify-center items-center">
                <input
                    className="border border-gray-300 rounded-sm h-10 w-full md:w-2/6 p-2"
                    type='text'
                    required
                    name="guest-name"
                    placeholder="Guests Name"
                />
                <Select
                    required
                    instanceId="raft-type-select"
                    name="item-type"
                    options={itemsTypes}
                    placeholder="Select Item"
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