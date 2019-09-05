import { axiosInstance } from "boot/axios";

const data = [null, null, null, null];
export async function registros() {
  console.log("entro a registros");
  const registro = await axiosInstance.post("/api/registros/listar", data);
  // console.log(registro.data);
  return registro.data;
}
// eslint-disable-next-line
