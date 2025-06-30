import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { addRentalStart, endRental } from "@/actions/trips"
import { toggleAdmin, toggleEmployee } from "@/actions/users-old";
import { Trip } from "@/types/types";
import { addInventory, toggleAvailability } from "@/actions/inventory";

export const useAddInventory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (formData: FormData) => {
            return addInventory(formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
        },
        onError: (error) => {
            console.error('Mutation error:', error);
        }
    });
};

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


export const useToggleAvailability = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (unitNumber: number) => {
            return toggleAvailability(unitNumber);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
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
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["trips", true, currentPage] });
        },
        onError: (error) => {
            console.error('Mutation error:', error);
        }
    });
};


