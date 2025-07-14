import PageContainer from "@/components/ui/containers/page-container";
import Tab from "@/components/ui/tabs/tab";
import { fetchItemTypes, fetchTrips } from "@/lib/utils/db";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;
    const rentedOutPage = params.rentedOutPage;    

    const itemTypesPromise = fetchItemTypes();
    const tripsPromise = fetchTrips(true, Number(rentedOutPage));
    
    return (
        <PageContainer>
            <Tab  rentedOutPage={Number(rentedOutPage) || 0} tripsPromise={tripsPromise} itemTypesPromise={itemTypesPromise} />
        </PageContainer>
    );
}
