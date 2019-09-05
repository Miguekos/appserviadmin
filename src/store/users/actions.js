import { axiosInstance } from "boot/axios";

export async function getUsers({ commit }) {
  console.log("listar Usuarios");
  const response = await axiosInstance.get("/api/tbusers");
  console.log(response.data);
  commit("setUsers", response.data);
  // return response.data;
}
// eslint-disable-next-line
export async function createUsers({ commit }, payload) {
  console.log("crear usuario");
  console.log(payload);
  const response = await axiosInstance.post("/api/tbusers", payload);
  console.log(response.data);
  return response.data;
  // commit("setUsers", response.data);
  // return response.data;
}
