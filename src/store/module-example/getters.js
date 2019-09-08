export function registrosFiltroEstados(state) {
  const arrayRegistros = state.registros;
  // console.log(arrayRegistros);
  let estadoRegistro = [];
  for (let index = 0; index < arrayRegistros.length; index++) {
    const element = arrayRegistros[index];
    // console.log(element.no_client);
    estadoRegistro.push(element.no_estado);
  }
  const distintos = [...new Set(estadoRegistro)];
  // return distintos;
  return distintos;
}

export function getRegistros(state) {
  return state.registros;
}

export function getDialogCrear(state) {
  return state.dialogCrearRegistro;
}
