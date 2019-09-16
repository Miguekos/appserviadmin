<template>
  <div class="q-pa-md">
    <!--    {{ datafld }}-->
    <q-table
      :data="datafld"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :loading="loading"
      :pagination.sync="pagination"
    >
      <template v-slot:top>
        <img
          style="height: 50px; width: 50px"
          src="/statics/minilogoservi.png"
        />
        <q-space />
        <q-btn outline color="positive" @click="crearDireccion()">
          Agregar Direccion
        </q-btn>
      </template>
    </q-table>
    <q-dialog full-width v-model="prompt" persistent>
      <q-card>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-card-section>
            <div class="text-h6">Agregar Direccion</div>
          </q-card-section>

          <q-card-section>
            <div class="q-gutter-sm">
              <div>
                <q-input
                  dense
                  outlined
                  required
                  label="Direccion del Proveedor"
                  v-model="form.p_no_direcc"
                  @keyup.enter="prompt = false"
                />
              </div>
              <!--              <div>-->
              <!--                <q-input-->
              <!--                  dense-->
              <!--                  outlined-->
              <!--                  required-->
              <!--                  label="Codigo de Ubigeo"-->
              <!--                  v-model="form.p_co_ubigeo"-->
              <!--                  @keyup.enter="prompt = false"-->
              <!--                />-->
              <!--              </div>-->
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
                  v-model="fieldDistrito"
                  :options="getDistrito"
                  option-value="no_ubigeo"
                  option-label="no_provin"
                  emit-value
                  map-options
                  label="Distrito"
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
      fieldDepartamento: "",
      fieldProvincia: "",
      fieldDistrito: "",
      model: "",
      form: {
        p_id_provee: null,
        p_no_direcc: "",
        p_co_ubigeo: ""
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
          name: "id",
          required: true,
          label: "Nro.",
          align: "left",
          field: "id_provee",
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "direccion",
          align: "left",
          label: "Direccion",
          field: "no_direcc",
          sortable: true
        },
        {
          name: "codigoubigeo",
          align: "left",
          label: "Codigo Ubigeo",
          field: "co_ubigeo",
          sortable: true
        },
        {
          name: "id_provee",
          align: "left",
          label: "id_provee",
          field: "id_provee",
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
        this.direccionProveedor(this.form.p_id_provee).then(result => {
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
    }
  },
  async mounted() {
    this.loading = true;
    this.form.p_id_provee = this.id_pro;
    this.pblistar_departamento();
    this.loading = false;

    // await this.getClientes();
    // this.info = this.Clientes;
  },
  watch: {}
};
</script>
