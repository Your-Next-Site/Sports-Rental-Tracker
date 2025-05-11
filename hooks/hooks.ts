import { useQuery } from '@tanstack/react-query';
import { Trip } from '@/types/types'
import { User } from "@auth/core/types";

const fetchTrips = async (currentTrip: boolean): Promise<Array<Trip>> => {
  const response = await fetch(`/api/on-the-water?currentTrip=${currentTrip}`)
  return await response.json();
}

export const useGetTrips = (currentTrip: boolean) => {
  return useQuery({
    queryKey: ['trips', currentTrip],
    queryFn: () => fetchTrips(currentTrip),
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
