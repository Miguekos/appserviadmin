// export function registrosFiltroEstados(state) {
//   const arrayRegistros = state.registros;
//   // console.log(arrayRegistros);
//   let estadoRegistro = [];
//   for (let index = 0; index < arrayRegistros.length; index++) {
//     const element = arrayRegistros[index];
//     // console.log(element.no_client);
//     estadoRegistro.push(element.no_estado);
//   }
//   const distintos = [...new Set(estadoRegistro)];
//   // return distintos;
//   return distintos;
// }

export function getRegistros(state) {
  return state.registros;
}

export function getDialogCrear(state) {
  return state.dialogCrearRegistro;
}

export function registrosFiltroEstados(state) {
  // console.log("Cargando los filtros desde stored")
  return state.estadoFiltros;
}

export function dialogLlamada(state) {
  console.log(state.dialogLlamadaCliente);
  return state.dialogLlamadaCliente;
}

export function dialogLlamadaEstado(state) {
  return state.dialogLlamadaCliente.estado;
}

export function dialogRegistrarCita(state) {
  console.log(state.dialogRegistrarCitaCliente);
  return state.dialogRegistrarCitaCliente;
}

export function dialogRegistrarCitaEstado(state) {
  return state.dialogRegistrarCitaCliente.estado;
}

export function getseguimiento_cliente(state) {
  return state.seguimiento_cliente;
}

export function getlistar_estado_seguimiento(state) {
  return state.listar_estado_seguimiento;
}

export function getlistar_seguimientos_registrados(state) {
  return state.listar_seguimientos_registrados;
}

export function getlistar_citas(state) {
  return state.listar_citas;
}

export function getlistar_direccion(state) {
  return state.listar_direccion;
}

export function get_listar_catalogos_new(state) {
  return state.set_listar_catalogos_new;
}
