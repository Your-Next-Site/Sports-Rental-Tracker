import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Trip, ItemTypes, Items } from '@/types/types'
import { User } from "@auth/core/types";

export const fetchItemTypes = async (): Promise<ItemTypes[]> => {
  const response = await fetch(`/api/item-types`)
  return await response.json();
}

export const useGetItemTypes = () => {
  return useQuery<ItemTypes[]>({
    queryKey: ['item-types'],
    queryFn: fetchItemTypes,
  })
}

export const fetchItems = async (): Promise<Items[]> => {
  const response = await fetch(`/api/items`)
  return await response.json();
}

export const useGetItems = () => {
  return useQuery<Items[]>({
    queryKey: ['items'],
    queryFn: fetchItems,
  })
}

export const fetchTrips = async (currentTrip: boolean, currentPage: number): Promise<{ trips: Trip[], hasMore: boolean, totalPages: number }> => {
  const response = await fetch(`/api/rented-out?currentTrip=${currentTrip}&page=${currentPage}`)
  return await response.json();
}

export const useGetTrips = (currentTrip: boolean, pageNumber: number) => {
  return useQuery({
    queryKey: ['trips', currentTrip, pageNumber],
    queryFn: () => fetchTrips(currentTrip, pageNumber),
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

export const searchTrips = async (guestName: string, departureTime: any, page: number): Promise<{ trips: Trip[], hasMore: boolean, totalPages: number }> => {
  const response = await fetch(`/api/search-trips?guestName=${guestName}&departureTime=${departureTime}&page=${page}`)
  return await response.json();
}

export const useGetSearchPageTrips = ({ guestName, departureDate, page }: { guestName: string, departureDate: Date, page: number }) => {
  return useQuery({
    queryKey: ['searchPageTrips', guestName, departureDate, page],
    queryFn: () => searchTrips(guestName, departureDate, page),
    placeholderData: keepPreviousData,

  })
}





