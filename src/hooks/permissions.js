import {useQuery} from "@tanstack/react-query";
import api from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApp } from "../providers/AppProvider";
import { useNavigate } from "react-router-dom";

const fetchPermissions = async () => {
  const res = await api.get("/permissions");
  return res.data;
};


export const usePermissions = () => {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: fetchPermissions,
  });
}; 



