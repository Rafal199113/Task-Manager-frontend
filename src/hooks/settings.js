import {useQuery} from "@tanstack/react-query";
import api from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApp } from "../providers/AppProvider";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from 'react-toastify';

const getSettingsPositons = async () => {
  const res = await api.get("/settings_positions");
  return res.data;
};

const getUserSettings = async (id_user) => {
    const res = await api.get(`/settings/${id_user}`);
    return res.data;
};

export const useUserSettings = (id_user) => {
    return useQuery({
        queryKey: ['settings', id_user],
        queryFn: () => getUserSettings(id_user),
        enabled: !!id_user,
    });
};

export const useSettingsPositions = () => {
  return useQuery({
    queryKey: ["settingPositions"],
    queryFn: getSettingsPositons,
  });
}; 

export const useStoreSettings = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (settings) => api.post("/settings", settings).then(res => {
      console.log(res, settings)
    }),

    onSuccess: () => {
        toast.success('Zapisano ustawienia', {
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
    
      navigate('/settings')

      queryClient.invalidateQueries(["settings"]);
    },
  });
};

