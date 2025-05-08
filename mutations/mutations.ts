import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { addRaftToWater, addRemoveRaftFromWater } from "@/actions/trips"

export const useAddRaftToWater = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (formData: FormData) => {
            return addRaftToWater(formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trips'] });
            // queryClient.invalidateQueries({ queryKey: ['trips', driverEmail] });
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
