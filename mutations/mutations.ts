import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { addRentalStart, endRental } from "@/actions/trips"
import { addInventory, addInventoryType, toggleAvailability, removeInventoryType, removeInventory } from "@/actions/inventory";
import revalidatePathAction from "@/actions/revalidatePath";

export const useAddInventory = () => {
    return useMutation({
        mutationFn: (formData: FormData) => {
            return addInventory(formData);
        },
        onSuccess: () => {
            revalidatePathAction("/admin/inventory")
        },
        onError: (error) => {
            console.error('Mutation error:', error);
        }
    });
};

export const useRemoveInventory = () => {
    return useMutation({
        mutationFn: (id: number) => {
            return removeInventory(id);
        },
        onSuccess: () => {
            revalidatePathAction("/admin/inventory")
        },
        onError: (error) => {
            console.error('Mutation error:', error);
        }
    });
};


export const useRemoveInventoryType = () => {
    return useMutation({
        mutationFn: (itemTypeId: number) => {
            return removeInventoryType(itemTypeId);
        },
        onSuccess: () => {
            revalidatePathAction("/admin/inventory")
        },
        onError: (error) => {
            console.error('Mutation error:', error);
        }
    });
};

export const useAddInventoryType = () => {
    return useMutation({
        mutationFn: (formData: FormData) => {
            return addInventoryType(formData);
        },
        onSuccess: () => {
            revalidatePathAction("/admin/inventory")
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

export const useEndRental = (currentPage: number) => { 
    return useMutation({
        mutationFn: (raftOnWaterId: number) => endRental(raftOnWaterId),
        onSuccess: () => {
            revalidatePathAction("/main-rental-page")
        },
        onError: (error) => {
            console.error('Mutation error:', error);
        }
    });
};


