import MainContainer from "@/components/ui/containers/main-container";
import DepartureForm from "@/components/ui/forms/departure-form";



export default function Page() {
    return (
        <div className="flex flex-col p-2 gap-4 items-center">
            <MainContainer>
                <DepartureForm />
            </MainContainer>
        </div>
    );
}
