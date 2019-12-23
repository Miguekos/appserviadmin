import { axiosInstance } from "boot/axios";

/* eslint-disable */

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

// eslint-disable-next-line
export async function guardarDireccion({ commit }, payload) {
  console.log("listar direccion_cliente");
  const data = {
    codigoUbigeo: payload.codigoUbigeo,
    direccion: payload.direccion
  };
  const response = await axiosInstance.post(
    `/api/clientes/guardarDireccion/${payload.p_id}`,
    data
  );
  console.log("Respuesta de la direccion de cliente");
  console.log(response.data);
  // commit("guardarDireccion", response.data);
  return response.data;
}

// eslint-disable-next-line
export async function guardarContacto({ commit }, payload) {
  console.log("listar guardarContacto");
  const data = {
    tipoPersona: payload.tipoPersona,
    numeroDocumento: payload.numeroDocumento,
    apellidoPaterno: payload.apellidoPaterno,
    apellidoMaterno: payload.apellidoMaterno,
    nombres: payload.nombres,
    generoPersona: payload.generoPersona,
    tipoDocumento: payload.tipoDocumento,
    codigoAreaLaboral: payload.codigoAreaLaboral,
    correoElectronico: payload.correoElectronico,
    codigoSiglaProfesion: payload.codigoSiglaProfesion
  };
  const response = await axiosInstance.post(
    `/api/clientes/guardarContacto/${payload.p_id}`,
    data
  );
  console.log("Respuesta de la direccion de cliente");
  console.log(response.data);
  // commit("guardarDireccion", response.data);
  return response.data;
}

export async function eliminarCliente({ commit }, payload) {
  console.log("Eliminar Cliente");
  const data = {
    tipoPersona: "2",
    desactivarCliente: "S"
  };
  const response = await axiosInstance.post(
    `/api/clientes/eliminar/${payload.p_id}`,
    data
  );
  console.log("Respuesta de la direccion de cliente");
  console.log(response.data);
  // commit("guardarDireccion", response.data);
  return response.data;
}

// eslint-disable-next-line
export async function listar_genero_persona({ commit }) {
  console.log("listar Cliente");
  const response = await axiosInstance.get(
    "/api/clientes/listar_genero_persona"
  );
  // console.log(response.data);
  // commit("setClientes", response.data);
  return response.data;
}

// eslint-disable-next-line
export async function listar_area_laboral({ commit }) {
  console.log("listar Cliente");
  const response = await axiosInstance.get("/api/clientes/listar_area_laboral");
  // console.log(response.data);
  // commit("setClientes", response.data);
  return response.data;
}

// eslint-disable
export async function listar_sigla_profesion({ commit }) {
  console.log("listar Cliente");
  const response = await axiosInstance.get(
    `/api/clientes/listar_sigla_profesion`
  );
  // console.log(response.data);
  // commit("setClientes", response.data);
  return response.data;
}

export async function eliminarDireccion({ commit }, payload) {
  console.log("Eliminar Cliente");
  const data = {
    codigoDireccion: payload.codigoDireccion,
    desactivarDireccion: "S"
  };
  const response = await axiosInstance.post(
    `/api/clientes/eliminarDireccion/${payload.p_id}`,
    data
  );
  console.log("Respuesta de la direccion de cliente");
  console.log(response.data);
  // commit("guardarDireccion", response.data);
  return response.data;
}

export async function eliminarContacto({ commit }, payload) {
  console.log("Eliminar Cliente");
  const data = {
    tipoPersona: "2",
    desactivar: "S"
  };
  const response = await axiosInstance.post(
    `/api/clientes/eliminarContacto/${payload.p_id}/${payload.p_contacto}`,
    data
  );
  console.log("Respuesta de la direccion de cliente");
  console.log(response.data);
  // commit("guardarDireccion", response.data);
  return response.data;
}

export async function mantenimiento_telefono({ commit }, payload) {
  console.log("mantenimiento_telefono");
  const data = {
    tipoTelefono: "1",
    numeroTelefono: payload.numeroTelefono
  };
  const response = await axiosInstance.post(
    `/api/clientes/mantenimiento_telefono/${payload.p_id}`,
    data
  );
  console.log("Respuesta mantenimiento_telefono");
  console.log(response.data);
  // commit("guardarDireccion", response.data);
  return response.data;
}
