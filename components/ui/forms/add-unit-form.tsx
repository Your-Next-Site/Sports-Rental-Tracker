'use client'
import { useGetItemTypes } from "@/hooks/hooks";
import SimpleSubmitButton from "../buttons/simple-submit-button";

export default function AddUnitForm() {

    const { data, isError: isErrorData, isLoading: isLoadingData } = useGetItemTypes();
    return (
        <form className="flex flex-col min-w-full border border-gray-300">
            <div className="bg-gray-100 w-full border-b border-gray-300">
                <div className="px-4 py-2 text-center font-semibold">Add Unit</div>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-300">
                    <input
                        className="px-4 py-2 w-full h-full"
                        placeholder="Unit Number"
                        type="number"
                        name="unit-number"
                        required
                    />
                </div>
                <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-300">
                    <select
                        className="px-4 py-2 w-full h-full"
                        name="unit-type"
                        required
                        defaultValue={isLoadingData ? "isLoading" : isErrorData ? "isError" : ""}
                        disabled={isLoadingData}
                    >
                        {isLoadingData ? (
                            <option value="isLoading" disabled hidden>Loading Types of Units</option>
                        ) : isErrorData ? (
                            <option value="isError" disabled hidden>Error loading unit types</option>
                        ) : (
                            <>
                                <option value="" disabled hidden>Select Unit Type</option>
                                {data?.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </>
                        )}
                    </select>
                </div>
                <div className="px-4 py-2 flex items-center justify-center">
                    <SimpleSubmitButton />
                </div>
            </div>
        </form>

    );
}