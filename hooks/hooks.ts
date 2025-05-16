import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Trip } from '@/types/types'
import { User } from "@auth/core/types";

const fetchTrips = async (currentTrip: boolean, currentPage:number): Promise<{ trips: Trip[], hasMore: boolean, totalPages:number }> => {
  const response = await fetch(`/api/on-the-water?currentTrip=${currentTrip}&page=${currentPage}`)
  return await response.json();
}

export const useGetTrips = (currentTrip: boolean, pageNumber:number) => {
  return useQuery({
    queryKey: ['trips', currentTrip, pageNumber],
    queryFn: () => fetchTrips(currentTrip, pageNumber),
    // queryKey: ['trips', currentTrip],
    // queryFn: () => fetchTrips(currentTrip),
    placeholderData: keepPreviousData,

  })
}

const fetchUsers = async (): Promise<Array<User>> => {
  const response = await fetch(`/api/emails`)
  return await response.json();
}

export const useGetUser = () => {
  return useQuery({
    queryKey: ['users',],
    queryFn: () => fetchUsers(),
  })
}

const searchTrips = async (guestName:string, departureTime:any): Promise<Array<Trip>> => {
  const response = await fetch(`/api/search-trips?guestName=${guestName}&departureTime=${departureTime}`)
  return await response.json();
}

export const useGetSearchPageTrips = ({ guestName, departureDate }: { guestName: string, departureDate: Date }) => {
  return useQuery({
    queryKey: ['searchPageTrips'],
    queryFn: () => searchTrips(guestName, departureDate),
  })
}


