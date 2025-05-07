import MainContainer from "@/components/ui/containers/main-container";
import PageContainer from "@/components/ui/containers/page-container";
import DepartureForm from "@/components/ui/forms/departure-form";



export default function Page() {
    return (
        <PageContainer>
            <MainContainer>
                <DepartureForm />
            </MainContainer>
            <MainContainer>
                <div className="flex flex-col gap-8  ">
                    <h1 className="text-2xl">Guests on the Water</h1>
                </div>
            </MainContainer>
        </PageContainer>
    );
}
