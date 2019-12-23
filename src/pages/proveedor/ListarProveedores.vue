<template>
  <div class="full-width">
    <div>
      <p class="bg-secondary shadow-5 text-center text-white text-subtitle1">
        Proveedores
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
      @click-row="loading = true"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      :selected.sync="selected"
      :data="Proveedores"
      :columns="columns"
      row-key="co_provee"
      :filter="filter"
      :loading="loading"
      class="cursor-pointer"
    >
      <template v-slot:body-cell="props">
        <q-td :props="props" @click.native="rowClick(props.row)">
          <div>{{ props.value }}</div>
        </q-td>
      </template>
    </q-table>
    <q-separator />
    <q-toolbar class="text-center">
      <q-toolbar-title class="q-pa-md row justify-around">
        <!-- <q-toolbar-title class="q-pa-md q-gutter-md"> -->
        <q-btn
          size="sm"
          color="positive"
          text-color="white"
          label="Nuevo"
          @click="URL('/proveedores/create')"
        />
        <q-btn
          size="sm"
          color="negative"
          text-color="white"
          label="Eliminar"
          @click="eliminarRow()"
        />
      </q-toolbar-title>
    </q-toolbar>
    <!--    {{ $data.filter }}-->
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("proveedor", ["Proveedores"])
  },
  data() {
    return {
      selected: [],
      pagination: {
        sortBy: "id",
        descending: false,
        page: 2,
        rowsPerPage: 3,
        rowsNumber: 3,
        pagesNumber: 3
      },
      loading: false,
      filter: "",
      columns: [
        {
          name: "no_provee",
          required: true,
          label: "Proveedor",
          align: "left",
          field: "no_provee",
          sortable: true
        },
        {
          name: "nu_docpro",
          align: "left",
          label: "Nro. Documento",
          field: "nu_docpro",
          sortable: true
        },
        {
          name: "no_tipdoc",
          align: "left",
          label: "Tipo Documento",
          field: "no_tipdoc",
          sortable: true
        },
        {
          name: "no_sigpro",
          align: "left",
          label: "Sigla",
          field: "no_sigpro",
          sortable: true
        },
        {
          name: "no_sececo",
          align: "left",
          label: "Sector",
          field: "no_sececo",
          sortable: true
        },
        {
          name: "ca_percon",
          align: "center",
          label: "Cant. Pers.",
          field: "ca_percon",
          sortable: true
        },
        {
          name: "ca_direcc",
          align: "center",
          label: "Cant. Direc.",
          field: "ca_direcc",
          sortable: true
        }
      ]
    };
  },
  methods: {
    getSelectedString() {
      return this.selected.length === 0 ? "" : `${this.selected.length}`;
    },
    URL(arg) {
      this.$router.push(arg);
    },
    rowClick(val) {
      console.log(val);
      this.$router.push(`/proveedores/detalle/${val.co_provee}`);
    },
    ...mapActions("proveedor", ["getProveedor"])
  },
  async mounted() {
    await this.getProveedor();
  }
};
</script>
