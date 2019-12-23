<template>
  <div class="q-pa-md">
    <div>
      <p
        class="bg-secondary glossy shadow-5 text-center text-white text-subtitle1"
      >
        Requerimientos
      </p>
    </div>
    <div class="q-pb-md">
      <div class="row no-wrap shadow-1 bg-grey-4">
        <q-toolbar>
          <q-input
            v-if="$q.screen.gt.xs"
            borderless
            class="full-width"
            placeholder="Buscar"
            dense
            color="primary"
            v-model="filter"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-input
            v-else
            class="full-width"
            borderless
            placeholder="Buscar"
            dense
            color="primary"
            v-model="filter"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-space />

          <!--          <q-btn-->
          <!--            flat-->
          <!--            dense-->
          <!--            no-wrap-->
          <!--            color="positive"-->
          <!--            icon="add"-->
          <!--            no-caps-->
          <!--            label="Nuevo"-->
          <!--            class="q-ml-sm q-px-md"-->
          <!--          />-->
          <!--          <q-btn-->
          <!--            flat-->
          <!--            dense-->
          <!--            no-wrap-->
          <!--            color="negative"-->
          <!--            icon="remove"-->
          <!--            no-caps-->
          <!--            label="Eliminar"-->
          <!--            class="q-ml-sm q-px-md"-->
          <!--          />-->
          <q-btn
            flat
            dense
            no-wrap
            color="primary"
            icon="cloud_upload"
            no-caps
            label="Exportar"
            class="q-ml-sm q-px-md"
          />
        </q-toolbar>
      </div>
    </div>
    <q-table
      dense
      :separator="separator"
      :filter="filter"
      :data="getseguimiento_cliente"
      :columns="columns"
      row-key="co_client"
      :pagination.sync="pagination"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="co_client" :props="props">
            {{ props.row.co_client }}
          </q-td>
          <q-td key="no_client" :props="props">
            {{ props.row.no_client }}
          </q-td>
          <q-td key="no_percon" :props="props">
            {{ props.row.no_percon }}
          </q-td>
          <q-td key="co_semsve" :props="props">
            <q-btn
              class="glossy"
              round
              size="xs"
              :color="semaforo(props.row.co_semsve)"
            />
          </q-td>
          <q-td key="no_corele" :props="props">
            {{ props.row.no_corele }}
          </q-td>
          <q-td key="no_arelab" :props="props">
            {{ props.row.no_arelab }}
          </q-td>
          <q-td key="no_distri" :props="props">
            {{ props.row.no_distri }}
          </q-td>
          <q-td key="calcium" :props="props">
            {{ props.row.calcium }}
          </q-td>
          <q-td key="ca_segven" :props="props">
            {{ props.row.ca_segven }}
          </q-td>
          <q-td key="no_coment" :props="props">
            {{ props.row.no_coment }}
          </q-td>
          <q-td key="co_estsve" :props="props">
            <q-select
              dense
              options-dense
              v-model="props.row.co_estsve"
              :options="getlistar_estado_seguimiento"
              option-label="no_estsve"
              option-value="co_estsve"
              map-options
              emit-value
              @change="update(props.row.co_estsve)"
              transition-show="flip-up"
              transition-hide="flip-down"
            />
          </q-td>
          <q-td key="botones" :props="props">
            <div class="q-pa-xs q-gutter-xs">
              <q-btn
                dense
                @click="
                  dialogLlamadaCliente({
                    estado: true,
                    cliente: props.row.co_client,
                    contacto: props.row.co_percon
                  })
                "
                size="sm"
                glossy
                color="primary"
                icon="local_phone"
              />
              <q-btn dense size="sm" glossy color="positive" icon="email" />
              <q-btn
                size="sm"
                dense
                color="amber"
                glossy
                text-color="black"
                icon="email"
              />
              <q-btn
                dense
                glossy
                @click="
                  dialogRegistrarCitaCliente({
                    estado: true,
                    cliente: props.row.co_client,
                    contacto: props.row.co_percon
                  })
                "
                size="sm"
                color="brown-5"
                icon="edit"
              />
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog full-width v-model="dialogLlamadaEstado">
      <Llamadas
        :cliente="dialogLlamada.cliente"
        :contacto="dialogLlamada.contacto"
      />
    </q-dialog>
    <q-dialog full-width v-model="dialogRegistrarCitaEstado">
      <RegistrarCita
        :cliente="dialogRegistrarCita.cliente"
        :contacto="dialogRegistrarCita.contacto"
      />
    </q-dialog>
    <!--    {{ Clientes }}-->
    <!--    {{ dialogRegistrarCita }}-->
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
const columns = [
  {
    name: "co_client",
    align: "left",
    label: "Nro",
    sortable: true,
    field: "co_client",
    style: "width: 1%"
  },
  {
    name: "no_client",
    align: "left",
    sortable: true,
    label: "Cliente",
    field: "no_client",
    style: "width: 15%"
  },
  {
    name: "no_percon",
    align: "left",
    sortable: true,
    label: "Contacto",
    field: "no_percon"
  },
  {
    name: "co_semsve",
    align: "left",
    sortable: true,
    label: "Semaf.",
    field: "co_semsve"
  },
  {
    name: "no_corele",
    align: "left",
    sortable: true,
    label: "Correo",
    field: "no_corele"
  },
  {
    name: "no_arelab",
    align: "left",
    sortable: true,
    label: "Area",
    field: "no_arelab"
  },
  {
    name: "no_distri",
    align: "left",
    sortable: true,
    label: "Distrito",
    field: "no_distri"
  },
  {
    name: "calcium",
    align: "left",
    sortable: true,
    label: "Sector",
    field: "calcium"
  },
  {
    name: "ca_segven",
    align: "left",
    sortable: true,
    label: "Can. Consultas",
    field: "ca_segven"
  },
  {
    name: "no_coment",
    align: "left",
    sortable: true,
    label: "Comentarios",
    field: "no_coment"
  },
  {
    name: "co_estsve",
    align: "left",
    sortable: true,
    label: "Estados",
    field: "co_estsve",
    style: "width: 15%"
  },
  {
    name: "botones",
    align: "center",
    sortable: true,
    label: "Accions",
    field: "botones",
    style: "width: 5%"
  }
];

export default {
  computed: {
    ...mapGetters("example", [
      "dialogLlamada",
      "dialogRegistrarCita",
      "getseguimiento_cliente",
      "getlistar_estado_seguimiento",
      "dialogLlamadaEstado",
      "dialogRegistrarCitaEstado"
    ]),
    ...mapGetters("clientes", ["Clientes"])
  },
  data() {
    return {
      pagination: {
        sortBy: "co_client",
        descending: false,
        page: 1,
        rowsPerPage: 7
        // rowsNumber: xx if getting data from a server
      },
      separator: "horizontal",
      // separator: "cell",
      filter: "",
      search: "",
      columns,
      alert: false
    };
  },
  methods: {
    semaforo(arg) {
      let respuesta = "";
      if (arg == 0) {
        respuesta = "black";
      } else if (arg == 1) {
        respuesta = "blue";
      } else if (arg == 2) {
        respuesta = "green";
      } else if (arg == 3) {
        respuesta = "yellow";
      } else if (arg == 4) {
        respuesta = "amber";
      } else if (arg == 5) {
        respuesta = "red";
      }
      return respuesta;
    },
    test(arg) {
      console.log(arg);
    },
    ...mapActions("clientes", ["getClientes"]),
    ...mapActions("example", [
      "dialogLlamadaCliente",
      "dialogRegistrarCitaCliente",
      "seguimiento_cliente",
      "listar_estado_seguimiento"
    ]),
    update(val) {
      console.log(val);
    }
  },
  components: {
    Llamadas: () => import("./Llamadas"),
    RegistrarCita: () => import("./RegistrarCita")
    // TablaFiltro: () => import("./TablaFiltro"),
    // CuadroResumen: () => import("./CuadroResumen")
    // AddRegistro: () => import("./Create")
  },
  async mounted() {
    // await this.getClientes();
    await this.seguimiento_cliente();
    await this.listar_estado_seguimiento();
  }
};
</script>
