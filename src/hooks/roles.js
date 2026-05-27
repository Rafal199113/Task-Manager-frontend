import {useQuery} from "@tanstack/react-query";
import api from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApp } from "../providers/AppProvider";
import { useNavigate } from "react-router-dom";

const fetchRoles = async () => {
  const res = await api.get("/roles");
  return res.data;
};

const fetchRole = async (id) => {
  const res = await api.get(`/roles/${id}`);
  return res.data;
};



export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: fetchRoles,
  });
}; 


export const useRole = (id) => {
  return useQuery({
    queryKey: ["role", id],
    enabled: !!id,
    queryFn: () => fetchRole(id),
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();
  const {setMessage} = useApp();

  return useMutation({
    mutationFn: ({ id, roleData }) =>
      api.put(`/roles/${id}`, roleData),

    onSuccess: (_, variables) => {
      setMessage({
        type: "success",
        text: "Zaktualizowano",
      });

      const timeout = setTimeout(() => {
        setMessage("");
      }, 5000);

      queryClient.invalidateQueries({
        queryKey: ["role", variables.id],
      });
    },
  });
};

