import MainContainer from "@/components/ui/containers/main-container";
import DepartureForm from "@/components/ui/forms/departure-form";
import InventoryLink from "@/components/ui/inventory/inventroy-link";
import RentedOut from "@/components/ui/rented-out/rented-out";
import SearchHistory from "@/components/ui/search-history-component/search-history";
import Tab from "@/components/ui/tabs/tab";
import { fetchItemTypes, fetchTrips, searchTripsDB } from "@/lib/utils/db";
import { Suspense } from "react";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

    const params = await searchParams;
    const searchPage = params.searchPage || 0
    const rentedOutPage = params.rentedOutPage || 0
    const guestName = params.guestName || ""
    const selectedTab = (params.currentTab)

    const departureDate = (Array.isArray(params.departureDate) ? params.departureDate[0] : params.departureDate) || new Date().toISOString();
    let departureDateTime = new Date(departureDate);
    const offsetTimeValue = Number(process.env.NEXT_PUBLIC_OFFSET || 6);
    departureDateTime.setHours(departureDateTime.getHours() - offsetTimeValue);

    //Start fetching data on page load instead of waterfall
    const itemTypesPromise = fetchItemTypes();
    const tripsPromise = fetchTrips(true, Number(rentedOutPage));
    const searchTripsPromise = searchTripsDB(guestName.toString(), departureDate.toString(), Number(searchPage))

    return (
        <>
            <Tab>
                <MainContainer>
                    {selectedTab === "Departure" && <DepartureForm itemTypesPromise={itemTypesPromise} />}
                    {selectedTab === "Rented Out" && <RentedOut tripsPromise={tripsPromise} />}
                    {selectedTab === "Search" && <SearchHistory searchTripsPromise={searchTripsPromise} />}
                </MainContainer>
            </Tab>
            <Suspense>
                <InventoryLink />
            </Suspense>
        </>
    );
}
