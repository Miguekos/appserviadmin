export function setUsers(state, payload) {
  console.log("Mutacion");
  console.log(payload);
  state.users = payload;
}
