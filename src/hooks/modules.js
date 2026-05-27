import {useQuery} from "@tanstack/react-query";
import api from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApp } from "../providers/AppProvider";
import { useNavigate } from "react-router-dom";

const fetchModules = async () => {
  const res = await api.get("/modules");
  return res.data;
};


export const useModules = () => {
  return useQuery({
    queryKey: ["modules"],
    queryFn: fetchModules,
  });
}; 



