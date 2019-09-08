export function setRegistros(state, payload) {
  console.log("Mutacion de registros");
  console.log(payload);
  state.registros = payload;
}
