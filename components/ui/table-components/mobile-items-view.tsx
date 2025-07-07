'use client'
import { useToggleAvailability } from "@/mutations/mutations";
import { Items } from "@/types/types";
import { use } from "react";

export default function MobileItemsView({itemPromise}:{itemPromise: Promise<Items[]>}) {
    
    const { mutate } = useToggleAvailability();
     const items = use(itemPromise);
   
    return (
        <div className="md:hidden block">
            {items?.map((item, index) => (
                <div key={index} className="border border-gray-300 p-4">
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