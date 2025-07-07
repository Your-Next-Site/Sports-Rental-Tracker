'use client'
import { useToggleAvailability } from "@/mutations/mutations";
import { Items } from "@/types/types";
import { use } from "react";

export default function TableBodyItems({
    itemPromise,
}: { itemPromise: Promise<Items[]> }) {

    const { mutate } = useToggleAvailability();   
    const items = use(itemPromise);
    
    return (
        <tbody>
            {items?.map((item, index) => (
                <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{item.unitnumber}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.type}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.rented ? 'Yes' : 'No'}</td>
                    <td className="border border-gray-300 px-4 py-2">
                        <select
                            className="w-full"
                            defaultValue={item.rented ? "unavailable" : "available"}
                            onChange={() => mutate(item.unitnumber)}
                        >
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                        </select>
                    </td>
                </tr>
            ))}
        </tbody>
    );
}