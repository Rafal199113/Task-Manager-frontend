import {useQuery} from "@tanstack/react-query";
import api from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApp } from "../providers/AppProvider";
import { useNavigate } from "react-router-dom";

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





