'use client'
import { useAddRaftToWater } from "@/mutations/mutations";
import MainContainer from "../containers/main-container";
import { boatOptions } from "@/lib/utils/rafts";
import Inputs from "./inputs";

export default function DepartureForm() {
    const { mutate, isPending, isError } = useAddRaftToWater();

    return (
        <MainContainer>
            <h1 className="text-2xl">Show a guests departure </h1>
            <form
                action={mutate}
                className="flex flex-col gap-2 "
            >
                <Inputs boatOptions={boatOptions} isPending={isPending} />
                {isError && <p className="text-red-500">Error adding trip</p>}
            </form>
        </MainContainer>
    );
}

