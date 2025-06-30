import { InputsProps } from "@/types/types";
import Select from "react-select";
import AddActiveTripButton from "../buttons/add-active-trip-button";
import { useGetItemTypes } from "@/hooks/hooks";

const boatOptions = [
    { value: 'single-kayak', label: 'Single Kayak' },
    { value: 'double-kayak', label: 'Double Kayak' },
    { value: 'small-raft', label: 'Small Raft' },
    { value: 'round-raft', label: 'Round Raft' },
    { value: 'medium-raft', label: 'Medium Raft' },
    { value: 'large-raft', label: 'Large Raft' }

];
 
export default function Inputs({
    isPending,
}: InputsProps) {
  const { data, isError: isErrorData, isLoading: isLoadingData } = useGetItemTypes();
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
                    options={data}
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