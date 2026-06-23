import {useQuery} from "@tanstack/react-query";
import api from "../api/api";

const fetchModules = async () => {
  const res = await api.get("/modules");
  return res.data;
};

const fetchModulesByPermission = async (id) => {
  const res = await api.get(`/modules/role/${id}`);
  return res.data;
};


export const useModules = () => {
  return useQuery({
    queryKey: ["modules"],
    queryFn: fetchModules,
  });
}; 

export const useModulesByRolePermission = (id) => {
    console.log("fetching modules for user id:", id);
  return useQuery({
    queryKey: ["modules"],
    queryFn: () => fetchModulesByPermission(id),
  });
}; 





