import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import example from "./module-example";
import users from "./users";
import clientes from "./clientes";
import proveedor from "./proveedor";
import reque from "./store-reque";
import utils from "./store-utils";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      example,
      auth,
      users,
      clientes,
      proveedor,
      reque,
      utils
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
