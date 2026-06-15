import {useQuery} from "@tanstack/react-query";
import api from "../api/api";

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



