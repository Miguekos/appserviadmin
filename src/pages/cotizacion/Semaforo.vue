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
            <q-td key="ca_semafo" :props="props">
              <!-- {{ props.row.ca_semafo }} -->
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
      info: [],
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
      }
      return respuesta;
    }
  },
  created() {
    console.log("se cargo el created de resumen");
    this.getResumenVentas()
      .then(resp => {
        console.log("Resumen de Seguimiento");
        console.log(resp);
        this.info = resp;
        console.log("Resumen de Seguimiento");
      })
      .catch(err => {
        console.log(err);
      });
    // this.$q.loading.show({ delay: 400 });
  }
};
</script>
