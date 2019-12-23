<template>
  <div class="q-pt-sm q-pr-md q-pl-md">
    <div>
      <TituloTabla titulo="Direcciones" />
    </div>
    <div class="q-pb-md">
      <div class="row no-wrap shadow-1 bg-grey-4">
        <q-toolbar class="q-gutter-sm">
          <q-input
            v-if="$q.screen.gt.xs"
            borderless
            class="full-width q-pl-xs"
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
            class="q-pa-xs"
            dense
            no-wrap
            size="sm"
            color="red"
            no-caps
            outline
            label="Eliminar Direccion"
            @click="eliminarDireccionF()"
          ></q-btn>
          <q-btn
            class="q-pa-xs"
            dense
            no-wrap
            size="sm"
            no-caps
            outline
            color="positive"
            label="Agregar Direccion"
            @click="crearDireccion()"
          ></q-btn>
          <!--          <q-btn-->
          <!--            flat-->
          <!--            dense-->
          <!--            no-wrap-->
          <!--            color="primary"-->
          <!--            icon="cloud_upload"-->
          <!--            no-caps-->
          <!--            label="Exportar"-->
          <!--            class="q-ml-sm q-px-md"-->
          <!--          />-->
        </q-toolbar>
      </div>
    </div>
    <!--    {{ datafld }}-->
    <q-table
      dense
      :data="datafld"
      :columns="columns"
      row-key="co_direcc"
      :filter="filter"
      :loading="loading"
      :pagination.sync="pagination"
      selection="multiple"
      :selected.sync="selected"
      :selected-rows-label="getSelectedString"
    >
    </q-table>
    <q-dialog v-model="prompt" persistent>
      <q-card style="width: 100%;">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-card-section>
            <div class="text-h6">Agregar Direccion</div>
          </q-card-section>
          <q-card-section>
            <div class="q-gutter-sm">
              <div>
                <q-select
                  outlined
                  dense
                  required
                  @input="provincia()"
                  v-model="fieldDepartamento"
                  :options="getDepartamento"
                  option-value="no_ubigeo"
                  option-label="nu_depart"
                  emit-value
                  map-options
                  label="Departamento"
                />
              </div>
              <div>
                <q-select
                  @input="distrito()"
                  outlined
                  dense
                  required
                  v-model="fieldProvincia"
                  :options="getProvincia"
                  option-value="no_ubigeo"
                  option-label="no_provin"
                  emit-value
                  map-options
                  label="Provincia"
                />
              </div>
              <div>
                <q-select
                  outlined
                  dense
                  required
                  v-model="form.codigoUbigeo"
                  :options="getDistrito"
                  option-value="no_ubigeo"
                  option-label="no_provin"
                  emit-value
                  map-options
                  label="Distrito"
                />
              </div>
              <div>
                <q-input
                  dense
                  outlined
                  required
                  label="Direccion del Proveedor"
                  v-model="form.direccion"
                  @keyup.enter="prompt = false"
                />
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" type="reset" />
            <q-btn flat label="Agregar Direccion" type="submit" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
    <!--    {{ $data }}-->
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["datafld", "id_pro"],
  computed: {
    ...mapGetters("proveedor", [
      "getDepartamento",
      "getProvincia",
      "getDistrito"
    ])
  },
  data() {
    return {
      selected: [],
      fieldDepartamento: "",
      fieldProvincia: "",
      fieldDistrito: "",
      model: "",
      form: {
        id_pro: this.id_pro,
        codigoUbigeo: "",
        codigoDireccion: "",
        direccion: ""
      },
      prompt: false,
      pagination: {
        sortBy: "id",
        descending: false,
        page: 2,
        rowsPerPage: 3,
        rowsNumber: 3,
        pagesNumber: 3
      },
      info: [],
      loading: false,
      filter: "",
      columns: [
        {
          name: "no_depart",
          required: true,
          label: "Departamento",
          align: "left",
          field: "no_depart",
          sortable: true
        },
        {
          name: "no_provin",
          align: "left",
          label: "Provincia",
          field: "no_provin",
          sortable: true
        },
        {
          name: "no_distri",
          align: "left",
          label: "Distrito",
          field: "no_distri",
          sortable: true
        },
        {
          name: "no_direcc",
          align: "left",
          label: "Direccion",
          field: "no_direcc",
          sortable: true
        }
      ]
    };
  },
  methods: {
    ...mapActions("proveedor", [
      "registrarProveDireccion",
      "direccionProveedor",
      "pblistar_departamento",
      "pblistar_provincia",
      "pblistar_distrito"
    ]),
    async onSubmit() {
      this.loading = true;
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "fas fa-check-circle",
        message: "Submitted"
      });
      this.registrarProveDireccion(this.form).then(result => {
        console.log(result);
        this.fieldDepartamento = "";
        this.fieldProvincia = "";
        this.form.codigoUbigeo = "";
        this.form.direccion = "";
        this.direccionProveedor(this.id_pro).then(result => {
          console.log(result);
          this.loading = false;
          this.prompt = false;
        });
      });
      // this.reload();
      // this.$route.push(`/proveedores/detalle/${this.$route.params.id}`)
    },
    reload: function() {
      this.$router.go(this.$router.currentRoute);
    },
    onReset() {
      this.prompt = false;
      this.name = null;
      this.age = null;
      this.accept = false;
    },
    crearDireccion() {
      this.prompt = true;
    },
    provincia() {
      console.log(this.fieldDepartamento);
      this.pblistar_provincia(this.fieldDepartamento);
      this.fieldProvincia = "";
    },
    distrito() {
      console.log(this.fieldProvincia);
      this.pblistar_distrito(this.fieldProvincia);
      this.form.p_co_ubigeo = this.fieldProvincia;
      this.fieldDistrito = "";
    },
    getSelectedString() {
      return this.selected.length === 0 ? "" : `${this.selected.length}`;
    }
  },
  components: {
    TituloTabla: () => import("../../components/TituloTablas")
  },
  async mounted() {
    this.loading = true;
    this.form.p_id_provee = await this.id_pro;
    this.form.id_pro = await this.id_pro;
    await this.pblistar_departamento();
    this.loading = false;
    // await this.getClientes();
    // this.info = this.Clientes;
  },
  watch: {}
};
</script>
