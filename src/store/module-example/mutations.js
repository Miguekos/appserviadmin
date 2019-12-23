export function setRegistros(state, payload) {
  console.log("Mutacion de registros");
  console.log(payload);
  state.registros = payload;
}

export function setDialogCreate(state, payload) {
  state.dialogCrearRegistro = payload;
}

export function setdialogLlamadaCliente(state, payload) {
  console.log(payload);
  state.dialogLlamadaCliente = payload;
}

export function setdialogRegistrarCitaCliente(state, payload) {
  state.dialogRegistrarCitaCliente = payload;
}

export function setseguimiento_cliente(state, payload) {
  state.seguimiento_cliente = payload;
}

export function setlistar_estado_seguimiento(state, payload) {
  state.listar_estado_seguimiento = payload;
}

export function setlistar_seguimientos_registrados(state, payload) {
  state.listar_seguimientos_registrados = payload;
}

export function setlistar_citas(state, payload) {
  state.listar_citas = payload;
}

export function setlistar_direccion(state, payload) {
  state.listar_direccion = payload;
}
