'use client'
// import { useGetItemTypes } from "@/hooks/hooks";
import { useAddInventory } from "@/mutations/mutations";
import { ItemTypes } from "@/types/types";
import { use } from "react";

export default function AddUnitForm({
    itemTypesPromise,
    child1,
    child2,
    child3,
}: {
    itemTypesPromise: Promise<ItemTypes[]>
    child1: React.ReactNode;
    child2: React.ReactNode;
    child3: React.ReactNode;
}) {

    // const { data, isError: isErrorData, isLoading: isLoadingData } = useGetItemTypes();
    const { mutate, isError: isErrorMutate } = useAddInventory();
    const itemsTypes = use(itemTypesPromise);
    
    return (
        <form
            action={mutate}
            className="flex flex-col min-w-full border border-gray-300">
            {child1}
            <div className="flex flex-col md:flex-row">
                {child2}
                <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-300">
                    <select
                        className="px-4 py-2 w-full h-full"
                        name="item-type"
                        required                       
                    >
                       
                            <>
                                <option value="" disabled hidden>Select Unit Type</option>
                                {itemsTypes?.map((item) => (
                                    <option key={item.id} value={item.value}>
                                        {item.label}
                                    </option>
                                ))}
                            </>                      
                    </select>
                </div>
                {child3}
            </div>
            {isErrorMutate && <p className="text-red-500">Error Adding Item</p>}
        </form>

    );
}