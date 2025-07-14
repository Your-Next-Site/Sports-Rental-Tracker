import PageContainer from "@/components/ui/containers/page-container";
import Tab from "@/components/ui/tabs/tab";
import { fetchItemTypes, fetchTrips, searchTripsDB } from "@/lib/utils/db";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;
    const rentedOutPage = params.rentedOutPage || 0
    const guestName = params.guestName || ""
    const departureDate = params.departureDate || new Date().toLocaleDateString('en-CA') //date here
    const searchPage = params.searchPage || 0

    const itemTypesPromise = fetchItemTypes();
    const tripsPromise = fetchTrips(true, Number(rentedOutPage));
    const searchTripsPromise = searchTripsDB(guestName.toString(),departureDate.toString(), Number(searchPage))

    return (
        <PageContainer>
            <Tab
                tripsPromise={tripsPromise}
                itemTypesPromise={itemTypesPromise}
                searchTripsPromise={searchTripsPromise}
            />
        </PageContainer>
    );
}
// /api/search-trips?guestName=${guestName}&departureTime=${departureTime}&page=${page}