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

export function pblistar_departamento(state, payload) {
  state.pblistar_departamento = payload;
}

export function pblistar_provincia(state, payload) {
  state.pblistar_provincia = payload;
}

export function pblistar_distrito(state, payload) {
  state.pblistar_distrito = payload;
}

export function setProduct(state, payload) {
  state.productosSeleccionados.push(payload);
}
