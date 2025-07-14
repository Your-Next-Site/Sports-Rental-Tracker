import SiteNavButton from "@/components/ui/buttons/site-nav-button";
import Tab from "@/components/ui/tabs/tab";
import { fetchItemTypes, fetchTrips, searchTripsDB } from "@/lib/utils/db";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;

    const searchPage = params.searchPage || 0
    const rentedOutPage = params.rentedOutPage || 0
    const guestName = params.guestName || ""

    const departureDate = (Array.isArray(params.departureDate) ? params.departureDate[0] : params.departureDate) || new Date().toISOString();
    let departureDateTime = new Date(departureDate);
    const offsetTimeValue = Number(process.env.NEXT_PUBLIC_OFFSET || 6);
    departureDateTime.setHours(departureDateTime.getHours() - offsetTimeValue);

    const itemTypesPromise = fetchItemTypes();
    const tripsPromise = fetchTrips(true, Number(rentedOutPage));
    const searchTripsPromise = searchTripsDB(guestName.toString(), departureDate.toString(), Number(searchPage))


    return (
        <>
            <Tab
                tripsPromise={tripsPromise}
                itemTypesPromise={itemTypesPromise}
                searchTripsPromise={searchTripsPromise}
            />
            <div className="justify-center flex w-full mt-4">
                <SiteNavButton text="Go to Inventory Page" path="/admin/inventory" />
            </div>
        </>
    );
}
// /api/search-trips?guestName=${guestName}&departureTime=${departureTime}&page=${page}