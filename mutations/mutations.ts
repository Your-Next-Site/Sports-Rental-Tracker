import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { addRentalStart, endRental } from "@/actions/trips"
import { toggleAdmin, toggleEmployee } from "@/actions/users";
import { Trip } from "@/types/types";

export const useAddRentalStart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (formData: FormData) => {
            return addRentalStart(formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trips'] });
        },
        onError: (error) => {
            console.error('Mutation error:', error);
        }
    });
};

export const useEndRental = (currentPage: number, setPage: (page: number) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (raftOnWaterId: number) => endRental(raftOnWaterId),
        onSuccess: (_, raftOnWaterId) => {
            // Remove trip locally before refetch
            queryClient.setQueryData(["trips", true, currentPage], (oldData: { trips: Trip[] }) => {
                if (!oldData) return oldData;
                const updatedTrips = oldData.trips.filter((trip) => trip.id !== raftOnWaterId);

                // If no trips remain, move to previous page
                if (updatedTrips.length === 0 && currentPage > 0) {
                    setPage(currentPage - 1);
                }

                return { ...oldData, trips: updatedTrips };
            });
            queryClient.clear();
        },
        onError: (error) => {
            console.error('Mutation error:', error);
        }
    });
};

export const useToggleAdmin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (email: string) => {
            return toggleAdmin(email);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error) => {
            console.error('Mutation error:', error);
        }
    });
};

export const useToggleEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (email: string) => {
            return toggleEmployee(email);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error) => {
            console.error('Mutation error:', error);
        }
    });
};

// export const useSearchTrips = () => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: ({ guestName, departureDate }: { guestName: string, departureDate: Date }) => {
//             return searchTrips(guestName, departureDate);
//         },
//         onSuccess: (data: Trip[]) => {
//             queryClient.invalidateQueries({ queryKey: ['searchPageTrips'] });
//         },
//         onError: (error) => {
//             console.error('Mutation error:', error);
//         }
//     });
// };


