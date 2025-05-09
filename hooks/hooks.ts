import { useQuery } from '@tanstack/react-query';
import { Trip } from '@/types/types'
import { User } from "@auth/core/types";

const fetchTrips = async (): Promise<Array<Trip>> => {
  const response = await fetch(`/api/on-the-water`)
  return await response.json();
}

export const useGetTrips = () => {
  return useQuery({
    queryKey: ['trips',],
    queryFn: () => fetchTrips(),
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
