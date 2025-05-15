import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { addRaftToWater, addRemoveRaftFromWater } from "@/actions/trips"
import { toggleAdmin, toggleEmployee } from "@/actions/users";
import { searchTrips } from "@/lib/utils/db-server-action";
import { Trip } from "@/types/types";

export const useAddRaftToWater = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (formData: FormData) => {
            return addRaftToWater(formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trips'] });
        },
        onError: (error) => {
            console.error('Mutation error:', error);
        }
    });
};

export const useRemoveRaftFromWater = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (raftOnWaterId: number) => {
            return addRemoveRaftFromWater(raftOnWaterId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trips'] });
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


