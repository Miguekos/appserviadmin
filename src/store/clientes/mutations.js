export function setClientes(state, payload) {
  state.clientes = payload;
}

export function setContactoCliente(state, payload) {
  console.log("Data de mutacion");
  console.log(payload);
  state.clienteContactos = payload;
}

export function setDireccionCliente(state, payload) {
  state.clienteDirecciones = payload;
}

export function setCatalogosEnviar(state, payload) {
  state.setCatalogosEnviar = payload;
}

export function setClientesEnviar(state, payload) {
  state.setClientesEnviar = payload;
}

export function setClientesEnviarMasivos(state, payload) {
  state.setClientesEnviarMasivos = payload;
}
