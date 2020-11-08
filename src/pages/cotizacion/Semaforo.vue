<template>
  <div class="full-width">
    <!--    <q-markup-table dark class="bg-indigo-8">-->
    <div>
      <p class="bg-secondary shadow-5 text-center text-white">
        Semaforo
      </p>
    </div>
    <div class="q-pa-xs">
      <q-table
        dense
        :data="info"
        :columns="columns"
        row-key="co_semsve"
        :pagination="pagination"
        hide-bottom
        hide-header
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="co_semsve" :props="props">
              <q-btn
                push
                class=" "
                round
                size="xs"
                :color="semaforo(props.row.co_semsve)"
              />
              &nbsp; {{ props.row.no_semsve }}
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
        sortBy: "no_sigmot",
        descending: false,
        page: 1,
        rowsPerPage: 15
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "co_semsve",
          required: true,
          label: "Semaforo",
          align: "left",
          field: "co_semsve",
          sortable: true
        },
        {
          name: "ca_semafo",
          align: "center",
          label: "Cantidad",
          field: "ca_semafo",
          sortable: true
        }
      ],
      info: [
        { co_semsve: 1, no_semsve: "Orden de compra", ca_semafo: 0 },
        {
          co_semsve: 2,
          no_semsve: "Pre-aprobado",
          ca_semafo: 0
        },
        { co_semsve: 6, no_semsve: "Seguimiento", ca_semafo: 0 },
        {
          co_semsve: 3,
          no_semsve: "03 dias sin seguimiento",
          ca_semafo: 0
        },
        { co_semsve: 4, no_semsve: "07 dias sin seguimiento", ca_semafo: 4 },
        {
          co_semsve: 5,
          no_semsve: "Sin seguimiento",
          ca_semafo: 0
        },
        {
          co_semsve: 7,
          no_semsve: "Se dejo de seguir",
          ca_semafo: 0
        }
      ],
      resumen: {},
      model: null,
      separator: "cell"
    };
  },
  methods: {
    ...mapActions("example", ["getResumenVentas"]),
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
      } else if (arg == 6) {
        respuesta = "light-green-13";
      } else if (arg == 7) {
        respuesta = "black";
      }
      return respuesta;
    }
  },
  created() {
    console.log("se cargo el created de resumen");
    // this.getResumenVentas()
    //   .then(resp => {
    //     console.log("Resumen de Seguimiento");
    //     console.log(resp);
    //     this.info = resp;
    //     console.log("Resumen de Seguimiento");
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // this.$q.loading.show({ delay: 400 });
  }
};
</script>
