<template>
  <div class="q-pa-md">
    <!--    {{ `ID proveedor ${id_pro}` }}-->
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
        <q-btn outline color="secondary" @click="crearDireccion()"
          >Agregar Contacto</q-btn
        >
      </template>
    </q-table>
    <q-dialog full-width v-model="prompt" persistent>
      <q-card>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-card-section>
            <div class="text-h6">Agregar Contacto</div>
          </q-card-section>

          <q-card-section>
            <div class="q-gutter-sm">
              <div>
                <q-input
                  ref="form.apellidoPaterno"
                  dense
                  outlined
                  required="true"
                  label="Apellido Paterno"
                  v-model="form.apellidoPaterno"
                  autofocus
                  @keyup.enter="prompt = false"
                  :rules="[val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div>
                <q-input
                  ref="form.apellidoMaterno"
                  dense
                  outlined
                  required="true"
                  label="Apellido Materno"
                  v-model="form.apellidoMaterno"
                  autofocus
                  @keyup.enter="prompt = false"
                  :rules="[val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div>
                <q-input
                  ref="form.nombres"
                  dense
                  outlined
                  required="true"
                  label="Nombre"
                  v-model="form.nombres"
                  autofocus
                  @keyup.enter="prompt = false"
                  :rules="[val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div>
                <q-select
                  :options="generoOption"
                  option-label="no_genero"
                  option-value="ti_genero"
                  emit-value
                  map-options
                  ref="sexo"
                  dense
                  outlined
                  required
                  label="Sexo"
                  v-model="form.generoPersona"
                />
              </div>
              <div>
                <q-select
                  :options="areaOption"
                  option-label="no_arelab"
                  option-value="co_arelab"
                  emit-value
                  map-options
                  ref="area"
                  dense
                  outlined
                  required
                  label="Area"
                  v-model="form.codigoAreaLaboral"
                  @keyup.enter="prompt = false"
                  :rules="[val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div>
                <q-select
                  :options="siglaOption"
                  option-label="no_sigpro"
                  option-value="co_sigpro"
                  emit-value
                  map-options
                  ref="siglas"
                  dense
                  outlined
                  required
                  label="Siglas"
                  v-model="form.codigoSiglaProfesion"
                  @keyup.enter="prompt = false"
                  :rules="[val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div>
                <q-input
                  ref="telefono"
                  dense
                  outlined
                  required
                  label="Telefono"
                  v-model="form.p_nu_telefo"
                  @keyup.enter="prompt = false"
                  :rules="[val => val.length == 9 || 'Debe tener 9 digitos']"
                />
              </div>
              <div>
                <q-input
                  ref="correo"
                  dense
                  outlined
                  required
                  label="Correo"
                  type="email"
                  v-model="form.correoElectronico"
                  @keyup.enter="prompt = false"
                  :rules="[val => !!val || 'El campo es obligatorio']"
                />
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" @click="reset()" type="reset" />
            <q-btn flat label="Agregar Contacto" type="submit" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
    <!-- {{ $data.form }} -->
    <!-- {{ $data.generoOption }} -->
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: ["datafld", "id_pro"],
  computed: {
    // ...mapGetters("clientes", ["Clientes"])
  },
  data() {
    return {
      generos: ["M", "F"],
      loading: false,
      generoOption: [],
      areaOption: [],
      siglaOption: [],
      form: {
        tipoPersona: "1",
        numeroDocumento: "72232762",
        apellidoPaterno: "",
        apellidoMaterno: "",
        nombres: "",
        generoPersona: "",
        tipoDocumento: "1",
        codigoAreaLaboral: "",
        correoElectronico: "",
        codigoSiglaProfesion: "",
        p_id: null
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
      filter: "",
      columns: [
        {
          name: "no_percon",
          required: true,
          label: "Nombre.",
          align: "left",
          field: "no_percon",
          sortable: true
        },
        {
          name: "nu_doccon",
          align: "left",
          label: "Documento",
          field: "nu_doccon",
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
          name: "no_corele",
          align: "left",
          label: "Correo",
          field: "no_corele",
          sortable: true
        },
        {
          name: "nu_telefo",
          align: "left",
          label: "Telefono",
          field: "nu_telefo",
          sortable: true
        }
      ]
    };
  },
  methods: {
    reset() {
      // this.$refs.p_no_nombre.resetValidation();
      // this.$refs.telefono.resetValidation();
      // this.$refs.correo.resetValidation();
      // this.$refs.genero.resetValidation();
    },
    async onSubmit() {
      this.loading = true;
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "fas fa-check-circle",
        message: "Submitted"
      });
      this.guardarContacto(this.form).then(() => {
        console.log("Se ejecuto Guardar Contacto");
        this.contactoCliente(this.form.p_id).then(() => {
          console.log("Se ejecuto Guardar clienteContacto");
          this.prompt = false;
          this.loading = false;
        });
      });
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
    ...mapActions("proveedor", ["registrarProveContacto", "contactoProveedor"]),
    // eslint-disable-next-line
    ...mapActions("clientes", ["guardarContacto", "listar_genero_persona", "listar_area_laboral", "listar_sigla_profesion", "contactoCliente"])
  },
  async mounted() {
    this.loading = true;
    this.form.p_id = this.id_pro;
    this.loading = false;
    this.generoOption = await this.listar_genero_persona();
    this.areaOption = await this.listar_area_laboral();
    this.siglaOption = await this.listar_sigla_profesion();
    // await this.getClientes();
    // this.info = this.Clientes;
  }
};
</script>
