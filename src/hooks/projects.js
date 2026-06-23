import {useQuery} from "@tanstack/react-query";
import api from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApp } from "../providers/AppProvider";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from 'react-toastify';

const fetchProjects = async () => {
  const res = await api.get("/projects");
  return res.data;
};

const fetchProject = async (id) => {
    const res = await api.get(`/projects/${id}`);
    return res.data;
};

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
}; 



export const useAddProject = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {setMessage} = useApp();
  return useMutation({
    mutationFn: (userData) => api.post("/projects", userData),

    onSuccess: () => {
        toast.success('Dodano nowy projekt', {
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
      setMessage({
        type: "success",
        text: "Dodano nowy projekt",
      });
      navigate('/projects')
      setTimeout(() => {
        setMessage("");
      }, 5000);
      queryClient.invalidateQueries(["projects"]);
    },
  });
};

export const useUpdateProjct = () => {
  const queryClient = useQueryClient();
  const {setMessage} = useApp();

  return useMutation({
    mutationFn: ({ id, projectData }) =>
      {
        console.log(id, projectData)
        api.put(`/projects/${id}`, projectData)},

    onSuccess: (_, variables) => {
      setMessage({
        type: "success",
        text: "Zaktualizowano",
      });

      setTimeout(() => {
        setMessage("");
      }, 5000);

      queryClient.invalidateQueries({
        queryKey: ["project", variables.id],
      });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const { setMessage } = useApp();
const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ id }) => api.delete(`/projects/${id}`),

    onSuccess: () => {
        console.log("usunieto")
        navigate('/projects')
        toast.success('Usunieto projekt', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        style:{
            backgroundColor: "#1E2939"
        }
        });
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
};

export const useProject = (id) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => fetchProject(id),
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