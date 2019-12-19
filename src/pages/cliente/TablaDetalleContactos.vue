<template>
  <div class="q-pa-md">
    <!--    {{ `ID proveedor ${id_pro}` }}-->
    <q-table
      dense
      :data="datafld"
      :columns="columns"
      row-key="no_percon"
      :filter="filter"
      :loading="loading"
      selection="multiple"
      :selected.sync="selected"
    >
      <template v-slot:top>
        <q-input
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
        <div class="q-gutter-sm">
          <q-btn size="sm" outline color="red" @click="eliminarContactoF()"
            >Eliminar Contacto</q-btn
          >
          <q-btn size="sm" outline color="positive" @click="crearDireccion()"
            >Agregar Contacto</q-btn
          >
        </div>
      </template>
    </q-table>
    <q-dialog v-model="prompt" persistent>
      <q-card style="width: 100%;">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-card-section>
            <div class="text-h6">Agregar Contacto</div>
          </q-card-section>

          <q-card-section>
            <div class="q-gutter-sm">
              <div class="row q-gutter-xs">
                <div class="col">
                  <q-input
                    ref="form.apellidoPaterno"
                    dense
                    outlined
                    required="true"
                    label="Apellido Paterno"
                    v-model="form.apellidoPaterno"
                    autofocus
                  />
                </div>
                <div class="col ">
                  <q-input
                    ref="form.apellidoMaterno"
                    dense
                    outlined
                    required="true"
                    label="Apellido Materno"
                    v-model="form.apellidoMaterno"
                    autofocus
                  />
                </div>
              </div>
              <div class="q-gutter-xs">
                <q-input
                  ref="form.nombres"
                  dense
                  outlined
                  required="true"
                  label="Nombre"
                  v-model="form.nombres"
                  autofocus
                />
              </div>
              <div class="q-gutter-xs">
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
              <div class="q-gutter-xs">
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
                />
              </div>
              <div class="q-gutter-xs">
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
                />
              </div>
              <div class="q-gutter-xs">
                <q-input
                  ref="telefono"
                  dense
                  outlined
                  required
                  label="Telefono"
                  maxlength="9"
                  v-model="form.p_nu_telefo"
                />
              </div>
              <div class="q-gutter-xs">
                <q-input
                  ref="correo"
                  dense
                  outlined
                  required
                  label="Correo"
                  type="email"
                  v-model="form.correoElectronico"
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
    <!--    {{ $data.selected }}-->
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
      selected: [],
      generos: ["M", "F"],
      loading: false,
      generoOption: [],
      areaOption: [],
      siglaOption: [],
      form: {
        tipoPersona: "1",
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
    eliminarContactoF() {
      if (this.selected.length === 0) {
        this.$q.notify({
          color: "red",
          textColor: "white",
          icon: "fas fa-times",
          message: "Debe selecionar un registro para Eliminar.!"
        });
      }
      for (let index = 0; index < this.selected.length; index++) {
        const element = this.selected[index];
        console.log(element);
        //tipo de persona
        console.log(this.id_pro);
        // Codigo de cliente
        console.log(element.co_client);
        this.eliminarContacto({
          p_id: this.id_pro,
          p_contacto: element.co_percon,
          tipoPersona: element.co_tipper,
          desactivarCliente: "S"
        })
          .then(resp => {
            console.log(resp);
            this.$q.notify({
              color: "green",
              textColor: "white",
              icon: "fas fa-check-circle",
              message: "Eliminado Correctamente.!"
            });
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            this.contactoCliente(this.id_pro);
            // this.info = this.Clientes;
          });
      }
    },
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
    ...mapActions("clientes", [
      "guardarContacto",
      "listar_genero_persona",
      "listar_area_laboral",
      "listar_sigla_profesion",
      "contactoCliente",
      "eliminarContacto"
    ])
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
