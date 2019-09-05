import { axiosInstance } from "boot/axios";
import { Cookies } from "quasar";
import { Notify } from "quasar";
//
// const REGISTER_ROUTE = "/auth/register";
// const VERIFICATION_ROUTE = "/auth/verify";
const LOGOUT_ROUTE = "/api/logout";
const LOGIN_ROUTE = "/api/tbusers";
const VALIDAR_USER = "/api/user";
// const FETCH_USER_ROUTE = "/auth/user";
// const PASSWORD_FORGOT_ROUTE = "/auth/password/forgot";
// const PASSWORD_RESET_ROUTE = "/auth/password/reset";
export async function validarUser() {
  const validandoUser = await axiosInstance.get(VALIDAR_USER);
  return validandoUser.data.user;
}
// eslint-disable-next-line
export async function login({}, payload) {
  try {
    const login = await axiosInstance.get(
      `${LOGIN_ROUTE}?filter={"where":{"and":[{"email":"${
        payload.email
      }"},{"password":"${payload.password}"}]}}`
    );
    return login.data;
  } catch (e) {
    console.log(e);
    console.log("Error de Conexion");
    Notify.create({
      message: "Error de Conexion",
      color: "red"
    });
  }
}

export async function logout() {
  localStorage.removeItem("jwt");
  localStorage.removeItem("datadelusuario");
  Cookies.remove("accToken");
  const logout = await axiosInstance.get(LOGOUT_ROUTE);
  return logout;
}
