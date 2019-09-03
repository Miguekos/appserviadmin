import axios from "axios";
//
// const REGISTER_ROUTE = "/auth/register";
// const VERIFICATION_ROUTE = "/auth/verify";
// const FETCH_USER_ROUTE = "/auth/user";
// const PASSWORD_FORGOT_ROUTE = "/auth/password/forgot";
// const PASSWORD_RESET_ROUTE = "/auth/password/reset";
const data = [null, null, null, null];
export async function registros() {
  console.log("entro a registros");
  const registro = await axios.post(
    "http://localhost:4100/api/apis/registros",
    data
  );
  // console.log(registro.data);
  return registro.data;
}
// eslint-disable-next-line
