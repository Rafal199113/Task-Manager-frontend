import api from "../../api/api";

export const auth = async (email, password) => {
  const res = await api.post("/login", { email, password });
  return res.data;
};

export const getMe = async () => {
    let user = (await api.get('/me'));
    return user;
}

export const logout = async () => {
  const response = await api.get('/logout');
  return response.data;
}

