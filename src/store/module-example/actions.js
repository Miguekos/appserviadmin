import { axiosInstance } from "boot/axios";
// import { date } from "quasar";

export async function registros({ commit }) {
  const data = {
    p_co_estreq: "null",
    p_fe_inireq: "null",
    p_fe_finreq: "null"
  };
  console.log("listarRegistros");
  const registro = await axiosInstance.post(
    "/api/cotizas/requerimiento_listar",
    data
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
    r_fe_requer: "2019-11-11",
    asunto: payload.asunto,
    detalle: payload.text,
    contacto: payload.contacto,
    direccion: payload.direccion
  };

  console.log(data);

  const regisCotiza = await axiosInstance.post("/api/cotizas/registrar", data);
  // console.log(registro.data);
  return regisCotiza.data;
}

export function dialogCreate({ commit }, payload) {
  commit("setDialogCreate", payload);
}

export async function getResumenVentas() {
  const regisCotiza = await axiosInstance.get("/api/ventas/resumen");
  // console.log(registro.data);
  return regisCotiza.data;
}

export function dialogLlamadaCliente({ commit }, payload) {
  commit("setdialogLlamadaCliente", payload);
}

export function dialogRegistrarCitaCliente({ commit }, payload) {
  commit("setdialogRegistrarCitaCliente", payload);
}
