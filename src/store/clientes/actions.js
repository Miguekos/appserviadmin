import { axiosInstance } from "boot/axios";

export async function getClientes({ commit }) {
  console.log("listar Cliente");
  const response = await axiosInstance.post("/api/clientes/listar");
  // console.log(response.data);
  commit("setClientes", response.data);
  // return response.data;
}
// eslint-disable-next-line
export async function createCleintes({ commit }, payload) {
  // const data = {
  //   p_no_client: payload.name,
  //   p_nu_docide: payload.dni,
  //   p_no_corele: payload.email,
  //   p_nu_telefo: payload.telf,
  //   p_no_direcc: payload.direccion
  // };
  // const data = {
  //   "tipoPersona" : "J",
  //   "numeroDocumento" : "",
  //   "apellidoPaterno" : "",
  //   "apellidoMaterno" : "",
  //   "nombres" : payload.name,
  //   "tipoDocumento" : "1",
  //   "codigoNacionalidad" : "1",
  //   "fechaNacimiento" : "1990-10-10",
  //   "generoPersona" : payload.genero,
  //   "estadoCivil" : payload.estadoCivil,
  //   "documentoTributario" : payload.ruc_cliente,
  //   "razonSocial" : "Razon Social" ,
  //   "nombreComercial" : "Siglas"
  // };
  console.log("crear cliente");
  // console.log(payload);
  const response = await axiosInstance.post("/api/clientes/registrar_new/R", payload);
  console.log(response.data);
  return response.data;
  // commit("setUsers", response.data);
  // return response.data;
}
