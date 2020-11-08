<template>
  <div class="full-width">
    <!--    <q-markup-table dark class="bg-indigo-8">-->
    <div>
      <p class="bg-secondary   shadow-5 text-center text-white">
        Sector Economico
      </p>
    </div>
    <div class="q-pa-xs">
      <q-table
        dense
        :data="info"
        :columns="columns"
        row-key="co_semsve"
        hide-bottom
        hide-header
        :pagination.sync="pagination"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="co_sigc01" :props="props">
              <q-badge :style="coloreando(props.row.no_colhe1)">
                {{ props.row.co_sigc01 }}
              </q-badge>
            </q-td>
            <q-td key="no_sigc01" :props="props">
              {{ props.row.no_sigc01 }}
            </q-td>

            <q-td key="co_sigc02" :props="props">
              <q-badge :style="coloreando(props.row.no_colhe2)">
                {{ props.row.co_sigc02 }}
              </q-badge>
            </q-td>
            <q-td key="no_sigc02" :props="props">
              {{ props.row.no_sigc02 }}
            </q-td>

            <q-td key="co_sigc03" :props="props">
              <q-badge
                text-color="white"
                :style="coloreando(props.row.no_colhe3)"
              >
                {{ props.row.co_sigc03 }}
              </q-badge>
            </q-td>
            <q-td key="no_sigc03" :props="props">
              {{ props.row.no_sigc03 }}
            </q-td>

            <q-td key="co_sigc04" :props="props">
              <q-badge
                text-color="white"
                :style="coloreando(props.row.no_colhe4)"
              >
                {{ props.row.co_sigc04 }}
              </q-badge>
            </q-td>
            <q-td key="no_sigc04" :props="props">
              {{ props.row.no_sigc04 }}
            </q-td>

            <q-td key="co_sigc05" :props="props">
              <q-badge
                text-color="white"
                :style="coloreando(props.row.no_colhe5)"
              >
                {{ props.row.co_sigc05 }}
              </q-badge>
            </q-td>
            <q-td key="no_sigc05" :props="props">
              {{ props.row.no_sigc05 }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <!--    {{ info }}-->
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      active: true,
      pagination: {
        page: 1,
        rowsPerPage: 3
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "co_sigc01",
          required: true,
          label: "COD",
          align: "left",
          field: "co_sigc01",
          sortable: true
        },
        {
          name: "no_sigc01",
          required: true,
          label: "DESCRIPCION",
          align: "left",
          field: "no_sigc01",
          sortable: true
        },
        {
          name: "co_sigc02",
          required: true,
          label: "COD",
          align: "left",
          field: "co_sigc02",
          sortable: true
        },
        {
          name: "no_sigc02",
          required: true,
          label: "DESCRIPCION",
          align: "left",
          field: "no_sigc02",
          sortable: true
        },
        {
          name: "co_sigc03",
          required: true,
          label: "COD",
          align: "left",
          field: "co_sigc03",
          sortable: true
        },
        {
          name: "no_sigc03",
          required: true,
          label: "DESCRIPCION",
          align: "left",
          field: "no_sigc03",
          sortable: true
        },
        {
          name: "co_sigc04",
          required: true,
          label: "COD",
          align: "left",
          field: "co_sigc04",
          sortable: true
        },
        {
          name: "no_sigc04",
          required: true,
          label: "DESCRIPCION",
          align: "left",
          field: "no_sigc04",
          sortable: true
        },
        {
          name: "co_sigc05",
          required: true,
          label: "COD",
          align: "left",
          field: "co_sigc05",
          sortable: true
        },
        {
          name: "no_sigc05",
          required: true,
          label: "DESCRIPCION",
          align: "left",
          field: "no_sigc05",
          sortable: true
        }
      ],
      info: [
        {
          co_sigc01: "AC",
          no_sigc01: "Actualziar Cotizacion",
          no_colhe1: "#",
          co_sigc02: "CP",
          no_sigc02: "Corregir la direccion de producto",
          no_colhe2: "#",
          co_sigc03: "ME",
          no_sigc03: "Mejorar Tiempo de Entrega",
          no_colhe3: "#",
          co_sigc04: "RI",
          no_sigc04: "Requiere Producto Igual",
          no_colhe4: "#"
        },
        {
          co_sigc01: "AI",
          no_sigc01: "Agergar mas Item",
          no_colhe1: "#",
          co_sigc02: "DC",
          no_sigc02: "Dividir Cotizacion en varios",
          no_colhe2: "#",
          co_sigc03: "MP",
          no_sigc03: "Mejora Precio",
          no_colhe3: "#",
          co_sigc04: "UC",
          no_sigc04: "Unir Cotizacion",
          no_colhe4: "#"
        },
        {
          co_sigc01: "CM",
          no_sigc01: "Cambiar de Moneda",
          no_colhe1: "#",
          co_sigc02: "EI",
          no_sigc02: "Eliminar Item",
          no_colhe2: "#",
          co_sigc03: "MT",
          no_sigc03: "Mejorar Precio y Tiempo de Entrga",
          no_colhe3: "#"
        }
      ],
      resumen: {},
      model: null,
      separator: "cell"
    };
  },
  methods: {
    ...mapActions("example", ["leyenda_seguimiento_cliente"]),
    coloreando(arg) {
      console.log(arg);
      return `background-color: ${arg}`;
    },
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
    }
  },
  mounted() {
    console.log("se cargo el created de resumen");
    // this.leyenda_seguimiento_cliente()
    //   .then(resp => {
    //     console.log(resp);
    //     this.info = resp;
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // this.$q.loading.show({ delay: 400 });
  }
};
</script>
