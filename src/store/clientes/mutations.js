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
