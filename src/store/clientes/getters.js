export function Clientes(state) {
  return state.clientes;
}

export function ClientesFiltro(state) {
  const arrayClienteName = state.clientes;
  // console.log(arrayClienteName);
  let nameCliente = [];
  for (let index = 0; index < arrayClienteName.length; index++) {
    const element = arrayClienteName[index];
    // console.log(element.no_client);
    nameCliente.push(element.no_client);
  }
  return nameCliente;
}

export function asdClientes(state) {
  return state.clientes;
}

export function getClieDireccion(state) {
  return state.clienteDirecciones;
}

export function getClieContactos(state) {
  console.log("data del estado");
  console.log(state.clienteContactos);
  return state.clienteContactos;
}
