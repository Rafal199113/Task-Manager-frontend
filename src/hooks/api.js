import {useQuery} from "@tanstack/react-query";
import api from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApp } from "../providers/AppProvider";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from 'react-toastify';


export const useDelete = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ id, url }) => {
           return api.delete(`${url}${id}`);
        },

        onSuccess: (_, variables) => {
            navigate(variables.navigateTo);

            toast.success(`Usunięto ${variables.element}`, {
            theme: "dark",
            transition: Bounce,
            style: {
                backgroundColor: "#1E2939",
            },
            });

            queryClient.invalidateQueries({
            queryKey: [variables.returnElement],
            });
        },
        });
};