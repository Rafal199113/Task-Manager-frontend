import { useQuery } from '@tanstack/react-query';
import api from '../api/api';
import { ToastContainer, toast, Bounce } from 'react-toastify';

export const useGitchub = () => {
    return useQuery({
        queryKey: ['gitchub-repositories'],
        queryFn: async () => {
            const response = await api.get('/gitchub/api/repositories');
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        onSuccess: (data) => {
            toast.success('Pobrano repozytoria', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    });
};