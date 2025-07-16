import { InputsProps } from "@/types/types";
import Select from "react-select";
import AddActiveTripButton from "../buttons/add-active-trip-button";
import { Suspense } from "react";
import { Selector } from "../inputs/selector";



export default function Inputs({
    isPending,
    itemTypesPromise,
}: InputsProps) {    

    return (
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col md:flex-row w-full p-2 gap-4 justify-center items-center">
                <input
                    className="border border-gray-300 bg-white rounded-sm h-10 w-full md:w-2/6 p-2"
                    type='text'
                    required
                    name="guest-name"
                    placeholder="Guests Name"
                />
                <Suspense fallback={
                    <Select
                        required
                        instanceId="raft-type-select"
                        name="item-type"
                        placeholder="Select Item"
                        className=" rounded-sm md:w-2/6 w-full"
                        classNames={{
                            control: () => "h-10 w-full",
                        }}
                    />}>
                    <Selector itemTypesPromise={itemTypesPromise} />
                </Suspense>
                <input
                    className="border border-gray-300 bg-white rounded-sm h-10 w-full md:w-2/6 p-2"
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

