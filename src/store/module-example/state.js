export default {
  registros: [],
  dialogCrearRegistro: false,
  estadoFiltros: [
    {
      co_estreq: 1,
      no_estreq: "PENDIENTE"
    },
    {
      co_estreq: 2,
      no_estreq: "ACEPTADO"
    },
    {
      co_estreq: 3,
      no_estreq: "RECHAZADO"
    },
    {
      co_estreq: 4,
      no_estreq: "FINALIZADO"
    },
    {
      co_estreq: 5,
      no_estreq: "PROCESANDO"
    }
  ],
  dialogLlamadaCliente: {
    estado: false,
    cliente: null,
    contacto: null
  },
  dialogRegistrarCitaCliente: {
    estado: false,
    cliente: null,
    contacto: null
  },
  seguimiento_cliente: [],
  listar_estado_seguimiento: [],
  listar_seguimientos_registrados: [],
  listar_citas: [],
  listar_direccion: [],
  set_listar_catalogos_new: []
};
