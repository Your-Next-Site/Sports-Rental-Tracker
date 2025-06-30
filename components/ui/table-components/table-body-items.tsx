'use client'
import { useGetItems } from "@/hooks/hooks";

export default function TableBodyItems() {
    const { data, isError, isLoading } = useGetItems();
    if (isLoading) {
        return (
            <tbody>
                <tr>
                    <td colSpan={4} className="border border-gray-300 px-4 py-2 text-center">
                        Loading...
                    </td>
                </tr>
            </tbody>
        );
    }

    if (isError) {
        return (
            <tbody>
                <tr>
                    <td colSpan={4} className="border border-gray-300 px-4 py-2 text-center text-red-500">
                        Error loading data
                    </td>
                </tr>
            </tbody>
        );
    }

    return (
        <tbody>
            {data?.map((item, index) => (
                <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{item.unitnumber}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.type}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.rented ? 'Yes' : 'No'}</td>
                    <td className="border border-gray-300 px-4 py-2">
                        <select  className="w-full" defaultValue={item.status ? "available" : "unavailable"}>
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                        </select>
                    </td>
                    {/* <td className="border border-gray-300 px-4 py-2">{item.email}</td> */}
                </tr>
            ))}
        </tbody>
    );
}