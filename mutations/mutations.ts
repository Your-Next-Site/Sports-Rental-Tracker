import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { addRaftToWater } from "@/actions/trips"

export const useAddRaftToWater = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ( formData: FormData) => {
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

// export const useAddTrip = (driverEmail: string) => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: ({ formData, driverEmail }: { formData: FormData, driverEmail: string }) => {
//             const bindWithDriverEmail = addTrip.bind(null, driverEmail);
//             return bindWithDriverEmail(formData);
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ['trips', driverEmail] });
//         },
//         onError: (error) => {
//             console.error('Mutation error:', error);
//         }
//     });
// };
