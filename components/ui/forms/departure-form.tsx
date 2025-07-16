'use client'
import { useAddRentalStart } from "@/mutations/mutations";
import Inputs from "./inputs";
import { ItemTypes } from "@/types/types";


export default function DepartureForm({ itemTypesPromise }: { itemTypesPromise: Promise<ItemTypes[]> }) {
    const { mutate, isPending, isError } = useAddRentalStart();
    return (
        <>
            <h1 className="text-2xl">Show a guests departure </h1>
            <form
                action={mutate}
                className="flex flex-col gap-2 "
            >
                <Inputs itemTypesPromise={itemTypesPromise} isPending={isPending} />
                {isError && <p className="text-red-500">Error adding trip</p>}
            </form>
        </>
    );
}

