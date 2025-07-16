'use client'
import { ItemTypes } from "@/types/types";
import { use } from "react";
import Select from "react-select";

export function Selector({ itemTypesPromise }: { itemTypesPromise: Promise<ItemTypes[]> }) {
    const itemsTypes = use(itemTypesPromise);
    return (
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
    );
}