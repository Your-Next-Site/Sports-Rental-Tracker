'use client'
import { auth } from "@/auth";
import AuthButtons from "@/components/ui/buttons/auth-buttons";
import PageContainer from "@/components/ui/containers/page-container";
import DepartureForm from "@/components/ui/forms/departure-form";
import OnTheWater from "@/components/ui/on-the-water-component/on-the-water";

export default async function Page() {
    const session = await auth();

    return (
        <PageContainer>
            <DepartureForm />
            <OnTheWater />
            <AuthButtons session={session} />
        </PageContainer>
    );
}
