import {useQuery} from "@tanstack/react-query";
import api from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApp } from "../providers/AppProvider";
import { useNavigate } from "react-router-dom";

const fetchUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

const fetchUser = async (id) => {
    const res = await api.get(`/users/${id}`);
    return res.data;
};

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
}; 



export const useAddUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {setMessage} = useApp();
  return useMutation({
    mutationFn: (userData) => api.post("/users", userData),

    onSuccess: () => {
      setMessage({
        type: "success",
        text: "Dodano nowego użytkownika",
      });
      navigate('/users')
      setTimeout(() => {
        setMessage("");
      }, 5000);
      queryClient.invalidateQueries(["users"]);
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const {setMessage} = useApp();

  return useMutation({
    mutationFn: ({ id, userData }) =>
      api.put(`/users/${id}`, userData),

    onSuccess: (_, variables) => {
      setMessage({
        type: "success",
        text: "Zaktualizowano",
      });

      setTimeout(() => {
        setMessage("");
      }, 5000);

      queryClient.invalidateQueries({
        queryKey: ["user", variables.id],
      });
    },
  });
};

export const useEditUser = (id) => {
  return useQuery({
    queryKey: ["git", id],
    queryFn: () => fetchUser(id),
  });
}; 

export const useSearchUsers = (filters) => {
    return useQuery({
        queryKey: ['users', filters],
        queryFn: () =>
  api.get('/users', { params: filters }).then(res => res.data)
    });
};  

export const useUpdateModulesPermissions = () => {
    const queryClient = useQueryClient();
    const { setMessage } = useApp();

    return useMutation({
        mutationFn: ({ id, userData }) =>
           { 
            api.put(`/users/${id}/permissions`, userData)},

        onSuccess: (_, variables) => {
            setMessage({
                type: "success",
                text: "Zaktualizowano",
            });

            queryClient.invalidateQueries({
                queryKey: ["user", variables.id],
            });
        },
    });
};