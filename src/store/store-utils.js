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
