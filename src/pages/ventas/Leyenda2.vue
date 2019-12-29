<template>
  <div class="full-width">
    <!--    <q-markup-table dark class="bg-indigo-8">-->
    <div>
      <p class="bg-secondary   shadow-5 text-center text-white">
        Area
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
            <q-td key="no_sigare" :props="props">
              <q-badge color="yellow-10">
                {{ props.row.no_sigare }}
              </q-badge>
            </q-td>
            <q-td key="no_arelab" :props="props">
              {{ props.row.no_arelab }}
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
      pagination: {
        descending: false,
        page: 1,
        rowsPerPage: 6
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "co_emotic",
          required: true,
          label: "COD",
          align: "left",
          field: "co_emotic",
          sortable: true
        },
        {
          name: "no_emotic",
          required: true,
          label: "DESCRIPCION",
          align: "left",
          field: "no_emotic",
          sortable: true
        },
        {
          name: "no_sigsec",
          required: true,
          label: "COD",
          align: "left",
          field: "no_sigsec",
          sortable: true
        },
        {
          name: "no_sececo",
          required: true,
          label: "SECTOR",
          align: "left",
          field: "no_sececo",
          sortable: true
        },
        {
          name: "no_sigare",
          required: true,
          label: "COD",
          align: "left",
          field: "no_sigare",
          sortable: true
        },
        {
          name: "no_arelab",
          required: true,
          label: "AREA",
          align: "left",
          field: "no_arelab",
          sortable: true
        },
        {
          name: "no_sigsve",
          required: true,
          label: "COD",
          align: "left",
          field: "no_sigsve",
          sortable: true
        },
        {
          name: "no_estsve",
          align: "left",
          label: "ESTADO",
          field: "no_estsve",
          sortable: true
        }
      ],
      info: [],
      resumen: {},
      model: null,
      separator: "cell"
    };
  },
  methods: {
    ...mapActions("example", ["leyenda_seguimiento_cliente"]),
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
    this.leyenda_seguimiento_cliente()
      .then(resp => {
        console.log(resp);
        this.info = resp;
      })
      .catch(err => {
        console.log(err);
      });
    // this.$q.loading.show({ delay: 400 });
  }
};
</script>
