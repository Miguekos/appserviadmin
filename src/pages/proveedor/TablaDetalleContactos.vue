<template>
  <div class="q-pa-md">
    <div>
      <TituloTabla titulo="Contactos" />
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
            label="Eliminar Contacto"
            @click="eliminarContactoF()"
          ></q-btn>
          <q-btn
            class="q-pa-xs"
            dense
            no-wrap
            size="sm"
            no-caps
            outline
            color="positive"
            label="Agregar Contacto"
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
    <!--    {{ `ID proveedor ${id_pro}` }}-->
    <q-table
      dense
      :data="datafld"
      :columns="columns"
      row-key="co_percon"
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
    <!--    {{ $data }}-->
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
        codigoSiglaProfesion: ""
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
          label: "Nombre",
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
          label: "Telefonos",
          field: "nu_telefo",
          sortable: true
        }
      ]
    };
  },
  components: {
    TituloTabla: () => import("../../components/TituloTablas")
  },
  methods: {
    ...mapActions("clientes", [
      "listar_genero_persona",
      "listar_area_laboral",
      "listar_sigla_profesion"
    ]),
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
      console.log("#################");
      console.log({ ...this.form, id: this.id_pro });
      console.log(this.form.p_id);
      console.log("#################");
      this.registrarProveContacto({ ...this.form, p_id: this.id_pro }).then(
        () => {
          this.onReset();
          this.contactoProveedor(this.form.p_id_provee).then(() => {
            this.prompt = false;
            this.loading = false;
          });
        }
      );
    },
    onReset() {
      this.prompt = false;
      this.form.apellidoPaterno = "";
      this.form.apellidoMaterno = "";
      this.form.nombres = "";
      this.form.generoPersona = "";
      this.form.codigoAreaLaboral = "";
      this.form.correoElectronico = "";
      this.form.codigoSiglaProfesion = "";
    },
    crearDireccion() {
      this.prompt = true;
    },
    ...mapActions("proveedor", ["registrarProveContacto", "contactoProveedor"]),
    getSelectedString() {
      return this.selected.length === 0 ? "" : `${this.selected.length}`;
    }
  },
  async mounted() {
    this.loading = true;
    this.form.p_id_provee = await this.id_pro;
    this.form.id_pro = await this.id_pro;
    this.generoOption = await this.listar_genero_persona();
    this.areaOption = await this.listar_area_laboral();
    this.siglaOption = await this.listar_sigla_profesion();
    this.loading = false;
    // await this.getClientes();
    // this.info = this.Clientes;
  }
};
</script>
