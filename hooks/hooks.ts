import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ItemTypes, Items } from '@/types/types'
import { fetchItems, fetchItemTypes, fetchTrips, searchTrips } from '@/lib/utils/fetchData';


// export const useGetItemTypes = () => {
//   return useQuery<ItemTypes[]>({
//     queryKey: ['item-types'],
//     queryFn: fetchItemTypes,
//   })
// }


export const useGetItems = () => {
  return useQuery<Items[]>({
    queryKey: ['items'],
    queryFn: fetchItems,
  })
}

export const useGetTrips = (currentTrip: boolean, pageNumber: number) => {
  return useQuery({
    queryKey: ['trips', currentTrip, pageNumber],
    queryFn: () => fetchTrips(currentTrip, pageNumber),
    placeholderData: keepPreviousData,

  })
}

export const useGetSearchPageTrips = ({ guestName, departureDate, page }: { guestName: string, departureDate: Date, page: number }) => {
  return useQuery({
    queryKey: ['searchPageTrips', guestName, departureDate, page],
    queryFn: () => searchTrips(guestName, departureDate, page),
    placeholderData: keepPreviousData,

  })
}





