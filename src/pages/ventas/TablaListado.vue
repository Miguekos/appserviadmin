<template>
  <div class="q-pa-md">
    <div>
      <p class="bg-secondary shadow-5 text-center text-white text-subtitle1">
        Clientes
      </p>
    </div>
    <q-table
      dense
      :data="Clientes"
      :columns="columns"
      :rows-per-page-options="[]"
      row-key="name"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="desc" :props="props">
            {{ props.row.co_client }}
          </q-td>
          <q-td key="no_razsoc" :props="props">
            {{ props.row.no_razsoc }}
            <q-popup-edit v-model="props.row.no_razsoc">
              <q-input v-model="props.row.no_razsoc" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="fat" :props="props">
            {{ props.row.fat }}
            <q-popup-edit v-model="props.row.fat">
              <q-input v-model="props.row.fat" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="semaforo" :props="props">
            {{ props.row.semaforo }}
            <q-popup-edit v-model="props.row.semaforo">
              <q-input v-model="props.row.semaforo" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="carbs" :props="props">
            {{ props.row.carbs }}
            <q-popup-edit v-model="props.row.carbs" disable>
              <q-input v-model="props.row.carbs" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="protein" :props="props">
            {{ props.row.protein }}
            <q-popup-edit v-model="props.row.protein">
              <q-input v-model="props.row.protein" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="sodium" :props="props">
            {{ props.row.sodium }}
            <q-popup-edit v-model="props.row.sodium">
              <q-input v-model="props.row.sodium" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="calcium" :props="props">
            {{ props.row.calcium }}
            <q-popup-edit v-model="props.row.calcium">
              <q-input v-model="props.row.calcium" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="iron" :props="props">
            {{ props.row.iron }}
            <q-popup-edit v-model="props.row.iron">
              <q-input v-model="props.row.iron" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="commend" :props="props">
            {{ props.row.commend }}
            <q-popup-edit v-model="props.row.commend">
              <q-input v-model="props.row.commend" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="estado" :props="props">
            <q-select
              dense
              options-dense
              v-model="props.row.estado"
              :options="options"
              @change="update(props.row.estado)"
              transition-show="flip-up"
              transition-hide="flip-down"
            />
          </q-td>
          <q-td key="botones" :props="props">
            <div class="q-pa-xs q-gutter-xs">
              <q-btn
                dense
                @click="dialogLlamadaCliente(true)"
                size="sm"
                color="primary"
                icon="local_phone"
              />
              <q-btn dense size="sm" color="positive" icon="email" />
              <q-btn
                size="sm"
                dense
                color="amber"
                glossy
                text-color="black"
                icon="email"
              />
              <q-btn dense @click="dialogRegistrarCitaCliente(true)" size="sm" color="brown-5" icon="edit" />
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog full-width v-model="dialogLlamada">
      <Llamadas />
    </q-dialog>
    <q-dialog full-width v-model="dialogRegistrarCita">
      <RegistrarCita />
    </q-dialog>
<!--    {{ Clientes }}-->
<!--    {{ dialogLlamada }}-->
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
const columns = [
  {
    name: "desc",
    align: "right",
    label: "Nro",
    field: "name"
  },
  { name: "no_razsoc", align: "left", label: "Cliente", field: "no_razsoc" },
  { name: "fat", align: "left", label: "Contacto", field: "fat" },
  { name: "semaforo", align: "left", label: "S", field: "semaforo" },
  { name: "carbs", align: "left", label: "Correo", field: "carbs" },
  { name: "protein", align: "left", label: "Area", field: "protein" },
  { name: "sodium", align: "left", label: "Distrito", field: "sodium" },
  { name: "calcium", align: "left", label: "Sector", field: "calcium" },
  { name: "iron", align: "left", label: "Can. Consultas", field: "iron" },
  { name: "commend", align: "left", label: "Comentarios", field: "commend" },
  { name: "estado", align: "left", label: "Estados", field: "estado" },
  { name: "botones", align: "left", label: "Accions", field: "botones" }
];

export default {
  computed: {
    ...mapGetters("example", ["dialogLlamada", "dialogRegistrarCita"]),
    ...mapGetters("clientes", ["Clientes"])
  },
  data() {
    return {
      columns,
      alert: false,
      options: [
        "CA - Cita Anulada",
        "CC - Cita Concretada",
        "CP - Cliente Potencial",
        "NC - No Contesta",
        "NR - No Requieren",
        "OC - Otorga Cita",
        "TF - Todo Fisico",
        "TC - Todo por Correo"
      ]
    };
  },
  methods: {
    ...mapActions("clientes", ["getClientes"]),
    ...mapActions("example", [
      "dialogLlamadaCliente",
      "dialogRegistrarCitaCliente"
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
  created() {
    this.getClientes();
  }
};
</script>
