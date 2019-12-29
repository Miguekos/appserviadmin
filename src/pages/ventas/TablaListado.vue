<template>
  <div class="q-pa-md">
    <div>
      <p
        class="bg-secondary   shadow-5 text-center text-white text-subtitle1"
      >
        Cuadro de Resumen
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
          <q-td key="no_sigcli" :props="props">
            {{ props.row.no_sigcli }}
          </q-td>
          <q-td key="no_percon" :props="props">
            {{ props.row.no_percon }}
          </q-td>
          <q-td key="co_semsve" :props="props">
            <q-btn
              class=" "
              round
              size="xs"
              :color="semaforo(props.row.co_semsve)"
            />
          </q-td>
          <q-td key="no_arelab" :props="props">
            {{ props.row.no_arelab }}
          </q-td>
          <q-td key="no_depart" :props="props">
            {{ props.row.no_depart }}
          </q-td>
          <q-td key="no_provin" :props="props">
            {{ props.row.no_provin }}
          </q-td>
          <q-td key="no_distri" :props="props">
            {{ props.row.no_distri }}
          </q-td>
          <q-td key="no_sececo" :props="props">
            {{ props.row.no_sececo }}
          </q-td>
          <q-td key="ca_segven" :props="props">
            {{ props.row.ca_segven }}
          </q-td>
          <q-td key="no_coment" :props="props">
            {{ props.row.no_coment }}
          </q-td>
          <q-td key="no_sigsve" :props="props">
            {{ props.row.no_sigsve }}
          </q-td>
          <q-td key="botones" :props="props">
            <div class="q-gutter-xs">
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

                color="primary"
                icon="local_phone"
              />
              <q-btn dense size="sm"   color="positive" icon="email" />
              <q-btn
                size="sm"
                dense
                color="amber"

                text-color="black"
                icon="email"
              />
              <q-btn
                dense

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
    name: "no_sigcli",
    align: "left",
    sortable: true,
    label: "Cliente",
    field: "no_sigcli",
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
    label: "Sem.",
    field: "co_semsve"
  },
  {
    name: "no_arelab",
    align: "left",
    sortable: true,
    label: "Area",
    field: "no_arelab"
  },
  {
    name: "no_depart",
    align: "left",
    sortable: true,
    label: "Departamento",
    field: "no_depart"
  },
  {
    name: "no_provin",
    align: "left",
    sortable: true,
    label: "Provincia",
    field: "no_provin"
  },
  {
    name: "no_distri",
    align: "left",
    sortable: true,
    label: "Distrito",
    field: "no_distri"
  },
  {
    name: "no_sececo",
    align: "left",
    sortable: true,
    label: "Sector",
    field: "no_sececo"
  },
  {
    name: "ca_segven",
    align: "center",
    sortable: true,
    label: "Cant. Consul",
    field: "ca_segven"
  },
  {
    name: "no_coment",
    align: "left",
    sortable: true,
    label: "Comentario",
    field: "no_coment"
  },
  {
    name: "no_sigsve",
    align: "left",
    sortable: true,
    label: "Estados",
    field: "no_sigsve",
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
    await this.seguimiento_cliente({
      cliente: null,
      seguimiento: null,
      economico: null,
      semoforo: null
    });
    await this.listar_estado_seguimiento();
  }
};
</script>
