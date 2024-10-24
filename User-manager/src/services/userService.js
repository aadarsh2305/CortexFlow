import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const createUser = async (user) => {
  await axios.post(`${API_URL}/users`, user);
};

export const updateUser = async (user) => {
  await axios.put(`${API_URL}/users/${user.id}`, user);
}

export const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/users/${id}`);
};

export const saveUserComment = async (id, comment) => {
  await axios.post(`${API_URL}/users/${id}/comment`, { comment });
};

export const uploadExcel = async (formData) => {
  await axios.post(`${API_URL}/users/bulk-upload`, formData);
};
