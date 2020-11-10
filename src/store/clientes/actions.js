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
  console.log(payload);
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

export async function actualizarDireccion({ commit }, payload) {
  console.log("listar direccion_cliente");
  console.log(payload);
  console.log("listar direccion_cliente");
  const data = {
    codigoUbigeo: payload.codigoUbigeo,
    direccion: payload.direccion,
    codigoDireccion: payload.codigoDireccion
  };
  const response = await axiosInstance.post(
    `/api/clientes/actualizarDireccion/${payload.p_id}`,
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

// eslint-disable-next-line
export async function actualizarContacto({ commit }, payload) {
  console.log("listar guardarContacto");
  const idCliente = payload.p_id;
  delete payload.p_id;
  delete payload.codigoUbigeo;
  // const data = {
  //   tipoPersona: payload.tipoPersona,
  //   numeroDocumento: payload.numeroDocumento,
  //   apellidoPaterno: payload.apellidoPaterno,
  //   apellidoMaterno: payload.apellidoMaterno,
  //   nombres: payload.nombres,
  //   generoPersona: payload.generoPersona,
  //   tipoDocumento: payload.tipoDocumento,
  //   codigoAreaLaboral: payload.codigoAreaLaboral,
  //   correoElectronico: payload.correoElectronico,
  //   codigoSiglaProfesion: payload.codigoSiglaProfesion
  // };
  console.log(" PARA ACTUALIZAR CONTACTO data", payload);
  const response = await axiosInstance.post(
    `/api/clientes/actualizarContacto/${idCliente}/${payload.persona}`,
    payload
  );
  console.log("Respuesta de la direccion de cliente");
  console.log(response.data);
  // commit("guardarDireccion", response.data);
  return response.data;
}

// eslint-disable-next-line
export async function actualizarContactoDireccion({ commit }, payload) {
  console.log("actualizarContactoDireccion", payload);

  // console.log(" PARA ACTUALIZAR CONTACTO data", data);
  const response = await axiosInstance.post(
    `/api/clientes/actualizarContactoDireccion`,
    payload
  );
  console.log("Respuesta de la direccion de cliente");
  console.log(response.data);
  // commit("guardarDireccion", response.data);
  return response.data;
}

export async function eliminarCliente({ commit }, payload) {
  console.log("Eliminar Cliente");
  const id = payload.codigoDeCliente;
  delete payload.codigoDeCliente;
  console.log("payload", payload);
  const response = await axiosInstance.post(
    `/api/clientes/eliminar/${id}`,
    payload
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
    `/api/clientes/mantenimiento_telefono/${payload.p_id}/${
      payload.p_co_percon
    }`,
    data
  );
  console.log("Respuesta mantenimiento_telefono");
  console.log(response.data);
  // commit("guardarDireccion", response.data);
  return response.data;
}

export async function percon_direccion_telefono({ commit }, payload) {
  const data = {
    p_co_percon: payload.p_co_percon,
    p_co_direcc: payload.p_co_direcc,
    p_co_telefo: payload.p_co_telefo
  };
  console.log(data);
  const response = await axiosInstance.get(
    `/api/ventas/percon_direccion_telefono/${payload.p_co_percon}/${
      payload.p_co_direcc
    }/${payload.p_co_telefo}`
  );
  console.log("Respuesta percon_direccion_telefono");
  console.log(response.data);
  // commit("guardarDireccion", response.data);
  return response.data;
}

// eslint-disable
export async function listar_catalogos({ commit }) {
  console.log("listar_catalogos");
  const response = await axiosInstance.get(`/api/clientes/listar_catalogos`);
  // console.log(response.data);
  // commit("setClientes", response.data);
  return response.data;
}

// eslint-disable
export async function listar_clientes({ commit }, payload) {
  console.log("listar_clientes");
  console.log(payload);
  console.log("listar_clientes");
  const response = await axiosInstance.get(
    `/api/clientes/listar_clientes/${payload.id}`
  );
  // console.log(response.data);
  // commit("setClientes", response.data);
  return response.data;
}

// eslint-disable
export async function listar_personas_contacto({ commit }, payload) {
  console.log("listar_personas_contacto");
  console.log(payload);
  console.log("listar_personas_contacto");
  const response = await axiosInstance.get(
    `/api/clientes/listar_personas_contacto/${payload.id}`
  );
  return response.data;
}

// eslint-disable
export async function listar_estado_seguimiento_requerimiento({ commit }) {
  console.log("listar_estado_seguimiento_requerimiento");
  const response = await axiosInstance.get(
    `/api/clientes/listar_estado_seguimiento_requerimiento`
  );
  return response.data;
}

// eslint-disable
export async function listar_motivo_seguimiento_requerimiento({ commit }) {
  console.log("listar_motivo_seguimiento_requerimiento");
  const response = await axiosInstance.get(
    `/api/clientes/listar_motivo_seguimiento_requerimiento`
  );
  return response.data;
}

// eslint-disable
export async function listar_evaluacion_seguimiento_requerimiento({ commit }) {
  console.log("listar_evaluacion_seguimiento_requerimiento");
  const response = await axiosInstance.get(
    `/api/clientes/listar_evaluacion_seguimiento_requerimiento`
  );
  return response.data;
}

// eslint-disable
export async function seguimiento_cotizacion({ commit }) {
  console.log("seguimiento_cotizacion");
  const response = await axiosInstance.get(
    `/api/clientes/seguimiento_cotizacion`
  );
  return response.data;
}

// eslint-disable
export async function listar_motivo_seguimiento_requerimientov1({ commit }) {
  console.log("listar_motivo_seguimiento_requerimientov1");
  const response = await axiosInstance.get(
    `/api/clientes/listar_motivo_seguimiento_requerimientov1`
  );
  return response.data;
}

// eslint-disable
export async function listar_estado_seguimiento_requerimientov1({ commit }) {
  console.log("listar_estado_seguimiento_requerimientov1");
  const response = await axiosInstance.get(
    `/api/clientes/listar_estado_seguimiento_requerimientov1`
  );
  return response.data;
}

// eslint-disable
export async function listar_evaluacion_seguimiento_requerimientov1({
  commit
}) {
  console.log("listar_evaluacion_seguimiento_requerimientov1");
  const response = await axiosInstance.get(
    `/api/clientes/listar_evaluacion_seguimiento_requerimientov1`
  );
  return response.data;
}

// eslint-disable
export async function listar_rechazo_citas({ commit }) {
  console.log("listar_rechazo_citas");
  const response = await axiosInstance.get(
    `/api/clientes/listar_rechazo_citas`
  );
  return response.data;
}

// eslint-disable
export async function listar_citas_todas({ commit }) {
  console.log("listar_citas_todas");
  const response = await axiosInstance.get(`/api/clientes/listar_citas_todas`);
  return response.data;
}

// eslint-disable
export async function listar_citas_historico({ commit }) {
  console.log("listar_citas_historico");
  const response = await axiosInstance.get(
    `/api/clientes/listar_citas_historico`
  );
  return response.data;
}

// eslint-disable-next-line
export async function mantenimiento_textos_correo({}, payload) {
  console.log("mantenimiento_textos_correo");
  const data = {
    nombreTextoCorreo: payload.nombreTextoCorreo,
    textoCorreo: payload.textoCorreo
  };
  const response = await axiosInstance.post(
    `/api/clientes/mantenimiento_textos_correo`,
    data
  );
  // console.log(response.data);
  // commit("tipoDePersona", response.data);
  return response.data;
}

// eslint-disable
export async function listar_texto_correos({ commit }) {
  console.log("listar_texto_correos");
  const response = await axiosInstance.get(
    `/api/clientes/listar_texto_correos`
  );
  return response.data;
}

export async function mantenimiento_textos_correo_update({}, payload) {
  console.log("mantenimiento_textos_correo_update");
  const data = {
    nombreTextoCorreo: payload.nombreTextoCorreo,
    textoCorreo: payload.textoCorreo
  };
  const response = await axiosInstance.post(
    `/api/clientes/mantenimiento_textos_correo_update/${payload.id}`,
    data
  );
  // console.log(response.data);
  // commit("tipoDePersona", response.data);
  return response.data;
}
