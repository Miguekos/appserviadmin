<template>
  <div class="full-width">
    <!--    <q-markup-table dark class="bg-indigo-8">-->
    <div>
      <p class="bg-secondary shadow-5 text-center text-white">
        Estado
      </p>
    </div>
    <div class="q-pa-xs">
      <q-table
        dense
        :data="info"
        :columns="columns"
        row-key="no_sigsre"
        hide-bottom
        hide-header
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="no_sigsre" :props="props">
              &nbsp; {{ props.row.no_sigsre }}
            </q-td>
            <q-td key="no_estsre" :props="props">
              {{ props.row.no_estsre }}
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
          name: "no_sigsre",
          required: true,
          label: "Semaforo",
          align: "left",
          field: "no_sigsre",
          sortable: true
        },
        {
          name: "no_estsre",
          align: "center",
          label: "Cantidad",
          field: "no_estsre",
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
    ...mapActions("clientes", ["listar_estado_seguimiento_requerimiento"]),
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
    this.listar_estado_seguimiento_requerimiento()
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
