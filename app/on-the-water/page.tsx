// 'use client' 
import { auth } from "@/auth";
import AuthButtons from "@/components/ui/buttons/auth-buttons";
import PageContainer from "@/components/ui/containers/page-container";
import DepartureForm from "@/components/ui/forms/departure-form";
import OnTheWater from "@/components/ui/on-the-water-component/on-the-water";
import Tab from "@/components/ui/tabs/tab";
// import { useState } from "react";

export default async function Page() {

    // const [tabSelected, setTabSelected] = useState('Current')
    const session = await auth();

    return (
        <PageContainer>
            <Tab></Tab>            
            <AuthButtons session={session} />
        </PageContainer>
    );
}
