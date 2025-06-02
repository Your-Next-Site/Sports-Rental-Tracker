'use client'
import { useAddRentalStart} from "@/mutations/mutations";
import MainContainer from "../containers/main-container";
import Inputs from "./inputs";

export default function DepartureForm() {
    const { mutate, isPending, isError } = useAddRentalStart();

    return (
        <MainContainer>
            <h1 className="text-2xl">Show a guests departure </h1>
            <form
                action={mutate}
                className="flex flex-col gap-2 "
            >
                <Inputs  isPending={isPending} />
                {isError && <p className="text-red-500">Error adding trip</p>}
            </form>
        </MainContainer>
    );
}

