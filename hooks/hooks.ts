// import { keepPreviousData, useQuery } from '@tanstack/react-query';
// import { Trip, ItemTypes, Items } from '@/types/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

// export const fetchItemTypes = async (): Promise<ItemTypes[]> => {
//   const response = await fetch(`/api/item-types`)
//   return await response.json();
// }

// export const useGetItemTypes = () => {
//   return useQuery<ItemTypes[]>({
//     queryKey: ['item-types'],
//     queryFn: fetchItemTypes,
//   })
// }

// export const fetchItems = async (): Promise<Items[]> => {
//   const response = await fetch(`/api/items`)
//   return await response.json();
// }

// export const useGetItems = () => {
//   return useQuery<Items[]>({
//     queryKey: ['items'],
//     queryFn: fetchItems,
//   })
// }

// export const fetchTrips = async (currentTrip: boolean, currentPage: number): Promise<{ trips: Trip[], hasMore: boolean, totalPages: number }> => {
//   const response = await fetch(`/api/rented-out?currentTrip=${currentTrip}&page=${currentPage}`)
//   return await response.json();
// }

// export const useGetTrips = (currentTrip: boolean, pageNumber: number) => {
//   return useQuery({
//     queryKey: ['trips', currentTrip, pageNumber],
//     queryFn: () => fetchTrips(currentTrip, pageNumber),
//     placeholderData: keepPreviousData,

//   })
// }

// export const searchTrips = async (guestName: string, departureTime: any, page: number): Promise<{ trips: Trip[], hasMore: boolean, totalPages: number }> => {
//   const response = await fetch(`/api/search-trips?guestName=${guestName}&departureTime=${departureTime}&page=${page}`)
//   return await response.json();
// }

// export const useGetSearchPageTrips = ({ guestName, departureDate, page }: { guestName: string, departureDate: Date, page: number }) => {
//   return useQuery({
//     queryKey: ['searchPageTrips', guestName, departureDate, page],
//     queryFn: () => searchTrips(guestName, departureDate, page),
//     placeholderData: keepPreviousData,

//   })
// }

export function useTabNavigation(tabs: string[], defaultTab: string) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentTab = searchParams.get("currentTab");
  const rentedOutPage = searchParams.get("rentedOutPage");
  const searchPage = searchParams.get("searchPage") || 0;

  const [selectedTab, setSelectedTab] = useState(currentTab || defaultTab);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      // Ensure rentedOutPage is set to 0 if not present
      if (!params.has("rentedOutPage")) {
        params.set("rentedOutPage", "0");
      }
      return params.toString();
    },
    [searchParams]
  );

  // Set default tab and rentedOutPage in URL if either is missing
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    let needsUpdate = false;

    if (!currentTab) {
      setSelectedTab(defaultTab);
      params.set("currentTab", defaultTab);
      needsUpdate = true;
    }

    if (!rentedOutPage) {
      params.set("rentedOutPage", "0");
      needsUpdate = true;
    }

    if (!searchPage) {
      params.set("searchPage", "0");
      needsUpdate = true
    }

    if (needsUpdate) {
      router.push(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    }
  }, [currentTab, rentedOutPage, pathname, router, defaultTab]);

  const handleTabClick = useCallback(
    (tab: string) => {
      setSelectedTab(tab);
      router.push(`${pathname}?${createQueryString("currentTab", tab)}`, {
        scroll: false,
      });
    },
    [pathname, router, createQueryString]
  );

  return { selectedTab, handleTabClick };
}