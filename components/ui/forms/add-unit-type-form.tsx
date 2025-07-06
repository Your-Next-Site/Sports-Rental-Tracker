'use client'
import { useAddInventoryType } from "@/mutations/mutations";

export default function AddUnitTypeForm({
    child1,
    child2,
    child3,
    child4,
}: {
    child1: React.ReactNode;
    child2: React.ReactNode;
    child3: React.ReactNode;
    child4: React.ReactNode;
}) {
    const { mutate, isError: isErrorMutate } = useAddInventoryType();
    return (
        <form
            action={mutate}
            className="flex flex-1 flex-col min-w-full border border-gray-300"
        >
            <div className="w-full border-b border-gray-300">
            {child1}
            </div>
            <div className="flex flex-col md:flex-row w-full">
            <div className="flex-1 flex flex-col md:flex-row">
                {child2}
                {child3}
                 {isErrorMutate && <p className="text-red-500">Error Adding Item</p>}
            </div>
            {child4}
            </div>
           
        </form>

    );
}


