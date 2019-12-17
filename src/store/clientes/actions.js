import { axiosInstance } from "boot/axios";

export async function getClientes({ commit }) {
  console.log("listar Cliente");
  const response = await axiosInstance.post("/api/clientes/listar");
  // console.log(response.data);
  commit("setClientes", response.data);
  // return response.data;
}

// eslint-disable-next-line
export async function tipoDePersona({ commit }) {
  console.log("listar Cliente");
  const response = await axiosInstance.post("/api/clientes/tipoDePersona");
  // console.log(response.data);
  // commit("tipoDePersona", response.data);
  return response.data;
}

// eslint-disable-next-line
export async function TipoDeDocumento({ commit }) {
  console.log("listar Cliente");
  const response = await axiosInstance.post("/api/clientes/TipoDeDocumento");
  // console.log(response.data);
  // commit("TipoDeDocumento", response.data);
  return response.data;
}
// eslint-disable-next-line
export async function createCleintes({ commit }, payload) {
  console.log("crear cliente");
  // console.log(payload);
  const response = await axiosInstance.post(
    "/api/clientes/registrar_new/R",
    payload
  );
  console.log(response.data);
  return response.data;
  // commit("setUsers", response.data);
  // return response.data;
}

export async function contactoCliente({ commit }, payload) {
  console.log("listar contacto_cliente");
  const response = await axiosInstance.get(
    `/api/clientes/contacto_cliente/${payload}`
  );
  console.log("Respuesta de la Contactos de cliente");
  console.log(response.data);
  commit("setContactoCliente", response.data);
  // return response.data;
}

export async function direccionCliente({ commit }, payload) {
  console.log("listar direccion_cliente");
  const response = await axiosInstance.get(
    `/api/clientes/direccion_cliente/${payload}`
  );
  console.log("Respuesta de la direccion de cliente");
  console.log(response.data);
  commit("setDireccionCliente", response.data);
  // return response.data;
}
