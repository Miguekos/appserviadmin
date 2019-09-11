export function setProveedor(state, payload) {
  console.log("mutaciones");
  state.proveedores = payload;
}

export function setContactoProveedor(state, payload) {
  state.proveedorContactos = payload;
}

export function setDireccionProveedor(state, payload) {
  state.proveedorDirecciones = payload;
}
