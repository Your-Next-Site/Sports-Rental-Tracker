import PageContainer from "@/components/ui/containers/page-container";
import DepartureForm from "@/components/ui/forms/departure-form";
import OnTheWater from "@/components/ui/on-the-water-component/on-the-water";

export default async function Page() {

    return (
        <PageContainer>
            <DepartureForm />
            <OnTheWater />
        </PageContainer>
    );
}
