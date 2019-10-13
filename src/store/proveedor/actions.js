import { axiosInstance } from "boot/axios";

export async function getProveedor({ commit }) {
  console.log("listar Proveedor");
  // Recordar cambiara metodo GET
  const response = await axiosInstance.post("/api/proveedors/listar");
  console.log(response.data);
  commit("setProveedor", response.data);
  // return response.data;
}

export async function contactoProveedor({ commit }, payload) {
  console.log("listar contacto_proveedor");
  const response = await axiosInstance.get(
    `/api/proveedors/contacto_proveedor/${payload}`
  );
  // console.log(response.data);
  commit("setContactoProveedor", response.data);
  // return response.data;
}

export async function direccionProveedor({ commit }, payload) {
  console.log("listar direccion_proveedor");
  const response = await axiosInstance.get(
    `/api/proveedors/direccion_proveedor/${payload}`
  );
  // console.log(response.data);
  commit("setDireccionProveedor", response.data);
  // return response.data;
}

// eslint-disable-next-line
export async function registrarProveedor({ commit }, payload) {
  console.log("registrar direccion_proveedor");
  console.log(payload);
  const response = await axiosInstance.post(
    `/api/proveedors/registrar`,
    payload
  );
  // console.log(response.data);
  // commit("setReg", response.data);
  return response.data;
}
// eslint-disable-next-line
export async function registrarProveContacto({ commit }, payload) {
  console.log("registrar direccion_proveedor");
  console.log(payload);
  const response = await axiosInstance.post(
    `/api/proveedors/registrarContactos`,
    payload
  );
  // console.log(response.data);
  // commit("setReg", response.data);
  return response.data;
}
// eslint-disable-next-line
export async function registrarProveDireccion({ commit }, payload) {
  console.log("registrar direccion_proveedor");
  console.log(payload);
  const response = await axiosInstance.post(
    `/api/proveedors/registrarDirecciones`,
    payload
  );
  // console.log(response.data);
  // commit("setReg", response.data);
  return response.data;
}

export async function pblistar_departamento({ commit }) {
  console.log("listar contacto_proveedor");
  const response = await axiosInstance.get(
    `/api/proveedors/pblistar_departamento`
  );
  commit("pblistar_departamento", response.data);
}
export async function pblistar_provincia({ commit }, payload) {
  console.log("listar contacto_proveedor");
  const response = await axiosInstance.get(
    `/api/proveedors/pblistar_provincia/${payload}`
  );
  commit("pblistar_provincia", response.data);
}
export async function pblistar_distrito({ commit }, payload) {
  console.log("listar contacto_proveedor");
  const response = await axiosInstance.get(
    `/api/proveedors/pblistar_distrito/${payload}`
  );
  commit("pblistar_distrito", response.data);
}

//
export async function addProduct({ commit }, payload) {
  console.log(payload);
  commit("setProduct", payload);
}
