import { axiosInstance } from "boot/axios";

// import { date } from "quasar";

export async function registros({ commit }, payload) {
  console.log("listarRegistros");
  const registro = await axiosInstance.post(
    "/api/cotizas/requerimiento_listar",
    payload
  );
  // console.log(registro.data);
  commit("setRegistros", registro.data);
  // return registro.data;
}

// eslint-disable-next-line
export async function registrarCotizacion({}, payload) {
  // let timeStamp = Date.now();
  // let formattedString = date.formatDate(timeStamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
  // let formattedString = date.formatDate(timeStamp, "YYYY-MM-DD");
  console.log("registrarCotizacion");
  console.log(payload);
  // const data = {
  //   p_id_client: payload.id_client,
  //   p_co_usuari: null,
  //   p_de_solcoc: payload.text,
  //   p_fe_requer: formattedString
  // };
  const data = {
    co_client: payload.co_client,
    r_fe_requer: payload.date,
    asunto: payload.asunto,
    detalle: payload.text,
    contacto: payload.contacto,
    direccion: 1
  };

  console.log(data);

  const regisCotiza = await axiosInstance.post("/api/cotizas/registrar", data);
  // console.log(registro.data);
  return regisCotiza.data;
}

// eslint-disable-next-line
export async function actualizarCotizacion({}, payload) {
  // let timeStamp = Date.now();
  // let formattedString = date.formatDate(timeStamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
  // let formattedString = date.formatDate(timeStamp, "YYYY-MM-DD");
  console.log("actualizarCotizacion");
  console.log(payload);
  // const data = {
  //   p_id_client: payload.id_client,
  //   p_co_usuari: null,
  //   p_de_solcoc: payload.text,
  //   p_fe_requer: formattedString
  // };
  const data = {
    p_id_reqcot: payload.id_reqcot,
    p_fe_reqcot: payload.date,
    p_no_asunto: payload.asunto,
    p_de_reqcot: payload.text,
    p_co_percon: payload.contacto
  };

  console.log(data);
  console.log("actualizarCotizacion");

  const actualizarCotiza = await axiosInstance.post(
    "/api/cotizas/actualizar",
    data
  );
  // console.log(registro.data);
  return actualizarCotiza.data;
}

export function dialogCreate({ commit }, payload) {
  commit("setDialogCreate", payload);
}

export async function getResumenVentas() {
  const regisCotiza = await axiosInstance.get("/api/ventas/resumen");
  // console.log(registro.data);
  return regisCotiza.data;
}

export async function seguimiento_cliente({ commit }, payload) {
  const response = await axiosInstance.get(
    `/api/ventas/seguimiento_cliente/${payload.cliente}/${
      payload.seguimiento
    }/${payload.economico}/${payload.semoforo}`
  );
  // console.log(registro.data);
  commit("setseguimiento_cliente", response.data);
  // return response.data;
}

export async function listar_estado_seguimiento({ commit }) {
  const response = await axiosInstance.get(
    "/api/ventas/listar_estado_seguimiento"
  );
  // console.log(registro.data);
  commit("setlistar_estado_seguimiento", response.data);
  // return response.data;
}

export async function listar_seguimientos_registrados({ commit }, payload) {
  const response = await axiosInstance.get(
    `/api/ventas/listar_seguimientos_registrados/${payload.cliente}/${
      payload.contacto
    }`
  );
  commit("setlistar_seguimientos_registrados", response.data);
  // return response.data;
}

// eslint-disable-next-line
export async function mantenimiento_seguimiento_cliente({}, payload) {
  const data = {
    codigoSeguimientoVenta: payload.codigoSeguimientoVenta,
    comentario: payload.comentario,
    fechaSeguimiento: payload.fechaSeguimiento
  };
  const response = await axiosInstance.post(
    `/api/ventas/mantenimiento_seguimiento_cliente/${payload.cliente}/${
      payload.contacto
    }`,
    data
  );
  // console.log(registro.data);
  // commit("setlistar_estado_seguimiento", response.data);
  return response.data;
}

export function dialogLlamadaCliente({ commit }, payload) {
  commit("setdialogLlamadaCliente", payload);
}

export function dialogRegistrarCitaCliente({ commit }, payload) {
  commit("setdialogRegistrarCitaCliente", payload);
}

// eslint-disable-next-line
export async function mantenimiento_citas_cliente({}, payload) {
  console.log("mantenimiento_citas_cliente", payload);
  let data;
  if (payload.tipo === "R") {
    data = {
      codigodireccion: payload.codigodireccion,
      comentario: payload.comentario,
      fechaCita: payload.fechaCita,
      horaCita: payload.horaCita,
      direccionAlternativa: payload.direccionAlternativa
    };
  } else if (payload.tipo === "E") {
    data = {
      codigoCita: payload.codigoCita,
      codigosAnulacion: payload.codigosAnulacion
    };
  } else if (payload.tipo === "C" || payload.tipo === "F") {
    data = {
      codigoCita: payload.codigoCita
    };
  }
  const response = await axiosInstance.post(
    `/api/ventas/mantenimiento_citas_cliente/${payload.tipo}/${
      payload.cliente
    }/${payload.contacto}`,
    data
  );
  // console.log(registro.data);
  // commit("setlistar_estado_seguimiento", response.data);
  return response.data;
}

export async function listar_citas({ commit }, payload) {
  console.log("listar_citas");
  console.log(payload.cliente);
  console.log(payload.contacto);
  const response = await axiosInstance.get(
    `/api/ventas/listar_citas/${payload.cliente}/${payload.contacto}`
  );
  commit("setlistar_citas", response.data);
  // return response.data;
}

export async function listar_direccion({ commit }, payload) {
  const response = await axiosInstance.get(
    `/api/ventas/listar_direccion/${payload.cliente}`
  );
  commit("setlistar_direccion", response.data);
  // return response.data;
}

// eslint-disable-next-line
export async function listar_estado_seguimiento_cliente({}) {
  const response = await axiosInstance.get(
    `/api/ventas/listar_estado_seguimiento_cliente`
  );
  // commit("setlistar_direccion", response.data);
  return response.data;
}

// eslint-disable-next-line
export async function listar_sector_economico({}) {
  const response = await axiosInstance.get(
    `/api/ventas/listar_sector_economico`
  );
  // commit("setlistar_direccion", response.data);
  return response.data;
}

// eslint-disable-next-line
export async function semaforo_seguimiento_cliente({}) {
  const response = await axiosInstance.get(
    `/api/ventas/semaforo_seguimiento_cliente`
  );
  // commit("setlistar_direccion", response.data);
  return response.data;
}

// eslint-disable-next-line
export async function leyenda_seguimiento_cliente({}) {
  const response = await axiosInstance.get(
    `/api/ventas/leyenda_seguimiento_cliente`
  );
  // commit("setlistar_direccion", response.data);
  return response.data;
}

// eslint-disable-next-line
export async function emoticon_cliente({}) {
  const response = await axiosInstance.get(`/api/ventas/emoticon_cliente`);
  // commit("setlistar_direccion", response.data);
  return response.data;
}

// eslint-disable-next-line
export async function listar_area_laboral({}) {
  const response = await axiosInstance.get(`/api/ventas/listar_area_laboral`);
  // commit("setlistar_direccion", response.data);
  return response.data;
}

// eslint-disable-next-line
export async function listar_personas_contacto({}, payload) {
  const response = await axiosInstance.get(
    `/api/ventas/listar_personas_contacto/${payload.persona}`
  );
  // commit("setlistar_direccion", response.data);
  return response.data;
}

// eslint-disable-next-line
export async function actualizar_emoticon({}, payload) {
  const response = await axiosInstance.get(
    `/api/ventas/actualizar_emoticon/${payload.persona}/${payload.emoti}`
  );
  // commit("setlistar_direccion", response.data);
  return response.data;
}

// eslint-disable-next-line
export async function listar_catalogos({}) {
  const response = await axiosInstance.get(`/api/ventas/listar_catalogos`);
  // commit("setlistar_direccion", response.data);
  return response.data;
}

// eslint-disable-next-line
export async function cuadro_resumen_estado_requerimiento({}) {
  const response = await axiosInstance.get(
    `/api/cotizas/cuadro_resumen_estado_requerimiento`
  );
  // commit("setlistar_direccion", response.data);
  return response.data;
}

// eslint-disable-next-line
export async function listar_catalogos_new({ commit }) {
  const response = await axiosInstance.get(
    `/api/catalogos/listar_catalogos_new`
  );
  commit("set_listar_catalogos_new", response.data);
  // return response.data;
}

// eslint-disable-next-line
export async function guardarCatalogos({}, payload) {
  console.log(payload);
  const data = {
    nombreCatalogo: payload.nombreCatalogo,
    codigoArchivoAdjunto: payload.codigoArchivoAdjunto,
    ordenCatalogo: payload.ordenCatalogo
  };
  const response = await axiosInstance.post(
    `/api/catalogos/guardarCatalogos/`,
    data
  );
  return response.data;
}

// eslint-disable-next-line
export async function mantenimiento_catalogos({}, payload) {
  console.log(payload);
  const response = await axiosInstance.get(
    `/api/clientes/mantenimiento_catalogos/${payload}`
  );
  return response.data;
}

// eslint-disable-next-line
export async function enviarEmailVerde({}, payload) {
  console.log("enviarEmailVerde - payload", payload);
  const responseCorreo = await axiosInstance.get(
    `/api/clientes/correo_consulta/${payload}/1/null`
  );
  console.log("enviarEmailVerde", responseCorreo.data);
  const response = await axiosInstance.get(`/v1.0/correos/${payload}/1`);
  return response.data;
}

// eslint-disable-next-line
export async function correo_consulta({}, payload) {
  const responseCorreo = await axiosInstance.get(
    `/api/clientes/correo_consulta/${payload.co_person}/${payload.id}/null`
  );
  return responseCorreo.data;
}

// eslint-disable-next-line
export async function enviarEmailMasicoAmber({}, payload) {
  console.log("enviarEmailMasicoAmber - payload", payload);
  const response = await axiosInstance.post(`/v1.0/correos`, payload);
  return response.data;
}

// eslint-disable-next-line
export async function correosMasivoSimple({}, payload) {
  // console.log(payload);
  // const data = {
  //   nombreCatalogo: payload.nombreCatalogo,
  //   codigoArchivoAdjunto: payload.codigoArchivoAdjunto,
  //   ordenCatalogo: payload.ordenCatalogo
  // };
  const response = await axiosInstance.post(
    `/v1.0/correosMasivoSimple`,
    payload
  );
  return response.data;
}

// eslint-disable-next-line
export async function eliminar_requerimiento_cotizacion({}, payload) {
  // console.log(payload);
  // const data = {
  //   nombreCatalogo: payload.nombreCatalogo,
  //   codigoArchivoAdjunto: payload.codigoArchivoAdjunto,
  //   ordenCatalogo: payload.ordenCatalogo
  // };
  const response = await axiosInstance.get(
    `/api/cotizas/eliminar_requerimiento_cotizacion/${payload}`
  );
  return response.data;
}
