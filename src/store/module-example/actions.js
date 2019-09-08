import { axiosInstance } from "boot/axios";
import { date } from "quasar";

export async function registros({ commit }) {
  const data = [null, null, null, null];
  console.log("listarRegistros");
  const registro = await axiosInstance.post("/api/registros/listar", data);
  console.log(registro.data);
  commit("setRegistros", registro.data);
  // return registro.data;
}

// eslint-disable-next-line
export async function registrarCotizacion({}, payload) {
  let timeStamp = Date.now();
  // let formattedString = date.formatDate(timeStamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
  let formattedString = date.formatDate(timeStamp, "YYYY-MM-DD");
  console.log("registrarCotizacion");
  console.log(payload);
  const data = {
    p_id_client: payload.id_client,
    p_co_usuari: null,
    p_de_solcoc: payload.text,
    p_fe_requer: formattedString
  };
  const regisCotiza = await axiosInstance.post(
    "/api/registros/registrar",
    data
  );
  // console.log(registro.data);
  return regisCotiza.data;
}
