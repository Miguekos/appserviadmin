import { axiosInstance } from "boot/axios";
const state = {};

const mutations = {};

const actions = {
  async listar_evaluacion() {
    console.log("listar_evaluacion");
    const response = await axiosInstance.get(
      `/api/requerimientos/listar_evaluacion`
    );
    console.log(response.data);
    // commit("setUsers", response.data);
    return response.data;
  },

  async listar_estado_seguimiento() {
    console.log("listar_estado_seguimiento");
    const response = await axiosInstance.get(
      `/api/requerimientos/listar_estado_seguimiento`
    );
    console.log(response.data);
    // commit("setUsers", response.data);
    return response.data;
  },

  async listar_motivo_seguimiento() {
    console.log("listar_motivo_seguimiento");
    const response = await axiosInstance.get(
      `/api/requerimientos/listar_motivo_seguimiento`
    );
    console.log(response.data);
    // commit("setUsers", response.data);
    return response.data;
  },

  async listar_actualizacion_oferta() {
    console.log("listar_actualizacion_oferta");
    const response = await axiosInstance.get(
      `/api/requerimientos/listar_actualizacion_oferta`
    );
    console.log(response.data);
    // commit("setUsers", response.data);
    return response.data;
  },

  async seguimiento_cotizacion() {
    console.log("seguimiento_cotizacion");
    const response = await axiosInstance.get(
      `/api/requerimientos/seguimiento_cotizacion`
    );
    console.log(response.data);
    // commit("setUsers", response.data);
    return response.data;
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
