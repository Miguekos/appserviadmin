import { axiosInstance } from "boot/axios";

export async function getProveedor({ commit }) {
  console.log("listar Proveedor");
  const response = await axiosInstance.post("/api/proveedors/listar");
  // console.log(response.data);
  commit("setProveedor", response.data);
  // return response.data;
}

export async function contactoProveedor({ commit }, payload) {
  console.log("listar contacto_proveedor");
  const response = await axiosInstance.get(`/api/proveedors/contacto_proveedor/${payload}`);
  // console.log(response.data);
  commit("setContactoProveedor", response.data);
  // return response.data;
}

export async function direccionProveedor({ commit }, payload) {
  console.log("listar direccion_proveedor");
  const response = await axiosInstance.get(`/api/proveedors/direccion_proveedor/${payload}`);
  // console.log(response.data);
  commit("setDireccionProveedor", response.data);
  // return response.data;
}
