<template>
  <div class="q-pa-md">
    <div>
      <p class="bg-secondary shadow-5 text-center text-white text-subtitle1">
        Clientes
      </p>
    </div>

    <div class="q-pb-md">
      <div class="row no-wrap shadow-1 bg-grey-4">
        <q-toolbar class="GPL__toolbar">
          <q-input
            class="GPL__toolbar-input"
            dense
            standout="bg-primary"
            v-model="search"
            placeholder="Buscar"
          >
            <template v-slot:prepend>
              <q-icon v-if="search === ''" name="search" />
              <q-icon
                v-else
                name="clear"
                class="cursor-pointer"
                @click="search = ''"
              />
            </template>
          </q-input>

          <q-space />

          <q-option-group
            v-if="$q.screen.gt.xs"
            v-model="separator"
            inline
            class="q-ma-sm"
            :options="[
              { label: 'Horiz.', value: 'horizontal' },
              { label: 'Cell', value: 'cell' }
            ]"
          />

          <!--          <q-btn-->
          <!--            v-if="$q.screen.gt.xs"-->
          <!--            flat-->
          <!--            dense-->
          <!--            no-wrap-->
          <!--            color="primary"-->
          <!--            icon="add"-->
          <!--            no-caps-->
          <!--            label="Correo"-->
          <!--            class="q-ml-sm q-px-md"-->
          <!--          >-->
          <!--          </q-btn>-->

          <q-btn
            v-if="$q.screen.gt.xs"
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
      :separator="separator"
      :filter="search"
      dense
      :data="Clientes"
      :columns="columns"
      :rows-per-page-options="[]"
      row-key="name"
      :pagination.sync="pagination"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="desc" :props="props">
            {{ props.row.co_client }}
          </q-td>
          <q-td key="no_razsoc" :props="props">
            {{ props.row.no_razsoc }}
          </q-td>
          <q-td key="fat" :props="props">
            {{ props.row.fat }}
          </q-td>
          <q-td key="semaforo" :props="props">
            {{ props.row.semaforo }}
          </q-td>
          <q-td key="carbs" :props="props">
            {{ props.row.carbs }}
          </q-td>
          <q-td key="protein" :props="props">
            {{ props.row.protein }}
          </q-td>
          <q-td key="sodium" :props="props">
            {{ props.row.sodium }}
          </q-td>
          <q-td key="calcium" :props="props">
            {{ props.row.calcium }}
          </q-td>
          <q-td key="iron" :props="props">
            {{ props.row.iron }}
          </q-td>
          <q-td key="commend" :props="props">
            {{ props.row.commend }}
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
                @click="dialogRegistrarCitaCliente(true)"
                size="sm"
                color="brown-5"
                icon="edit"
              />
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
    align: "left",
    label: "Nro",
    sortable: true,
    field: "name",
    style: "width: 1%"
  },
  {
    name: "no_razsoc",
    align: "left",
    sortable: true,
    label: "Cliente",
    field: "no_razsoc",
    style: "width: 15%"
  },
  {
    name: "fat",
    align: "left",
    sortable: true,
    label: "Contacto",
    field: "fat"
  },
  {
    name: "semaforo",
    align: "left",
    sortable: true,
    label: "S",
    field: "semaforo"
  },
  {
    name: "carbs",
    align: "left",
    sortable: true,
    label: "Correo",
    field: "carbs"
  },
  {
    name: "protein",
    align: "left",
    sortable: true,
    label: "Area",
    field: "protein"
  },
  {
    name: "sodium",
    align: "left",
    sortable: true,
    label: "Distrito",
    field: "sodium"
  },
  {
    name: "calcium",
    align: "left",
    sortable: true,
    label: "Sector",
    field: "calcium"
  },
  {
    name: "iron",
    align: "left",
    sortable: true,
    label: "Can. Consultas",
    field: "iron"
  },
  {
    name: "commend",
    align: "left",
    sortable: true,
    label: "Comentarios",
    field: "commend"
  },
  {
    name: "estado",
    align: "left",
    sortable: true,
    label: "Estados",
    field: "estado",
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
    ...mapGetters("example", ["dialogLlamada", "dialogRegistrarCita"]),
    ...mapGetters("clientes", ["Clientes"])
  },
  data() {
    return {
      pagination: {
        page: 1,
        rowsPerPage: 5
        // rowsNumber: xx if getting data from a server
      },
      separator: "horizontal",
      search: "",
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
<style lang="sass">
.GPL
  &__toolbar
    height: 54px
  &__toolbar-input
    width: 35%
  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px
    .q-item__section--avatar
      padding-left: 12px
      .q-icon
        color: #5f6368
    .q-item__label:not(.q-item__label--caption)
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem
    &--storage
      border-radius: 0
      margin-right: 0
      padding-top: 24px
      padding-bottom: 24px
  &__side-btn
    &__label
      font-size: 12px
      line-height: 24px
      letter-spacing: .01785714em
      font-weight: 500
  @media (min-width: 1024px)

    &__page-container
      padding-left: 94px
</style>
<!--<style>-->
<!--@media (min-width: 1024px) {-->
<!--  .GPL__toolbar-input {-->
<!--    width: 100%;-->
<!--  }-->
<!--}-->
<!--</style>-->
