'use client'
import { useGetItems } from "@/hooks/hooks";
import { useToggleAvailability } from "@/mutations/mutations";

export default function MobileItemsView() {
    const { data, isError, isLoading } = useGetItems();
    const { mutate } = useToggleAvailability();
    
    if (isLoading) {
        return (
            <div >
                Loading data
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-red-500">
                Error loading data
            </div>
        );
    }
    return (
        <div className="md:hidden block">
            {data?.map((item, index) => (
                <div key={index} className="border-b border-gray-300 p-4">
                    <div><span className="font-bold">Unit Number:</span> {item.unitnumber}</div>
                    <div><span className="font-bold">Type:</span> {item.type}</div>
                    <div><span className="font-bold">Rented:</span> {item.rented ? 'Yes' : 'No'}</div>
                    <div>
                        <span className="font-bold">
                            <select
                                className="w-full"
                                defaultValue={item.status ? "available" : "unavailable"}
                                onChange={() => mutate(item.unitnumber)}
                            >
                                <option value="available">Available</option>
                                <option value="unavailable">Unavailable</option>
                            </select>
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}