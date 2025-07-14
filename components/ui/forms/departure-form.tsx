'use client'
import { useAddRentalStart } from "@/mutations/mutations";
import MainContainer from "../containers/main-container";
import Inputs from "./inputs";
import { ItemTypes } from "@/types/types";
import { Suspense } from "react";

export default function DepartureForm({ itemTypesPromise }: { itemTypesPromise: Promise<ItemTypes[]> }) {
    const { mutate, isPending, isError } = useAddRentalStart();

    return (<>
        <h1 className="text-2xl">Show a guests departure </h1>
        <form
            action={mutate}
            className="flex flex-col gap-2 "
        >
            <Suspense fallback={
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col md:flex-row w-full p-2 gap-4 justify-center items-center">
                        <h1>Loading...</h1>
                    </div>
                </div>}
            >
                <Inputs itemTypesPromise={itemTypesPromise} isPending={isPending} />
            </Suspense>
            {isError && <p className="text-red-500">Error adding trip</p>}
        </form>
    </>
    );
}

