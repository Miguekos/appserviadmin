<template>
  <div class="q-pa-md">
    <div class="q-pb-md">
      <div>
        <p class="bg-secondary dense shadow-5 text-center text-white">
          Contactos
        </p>
      </div>
      <div class="row no-wrap shadow-1 bg-grey-4">
        <q-toolbar class="q-gutter-sm">
          <q-input
            v-if="$q.screen.gt.xs"
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
          <q-input
            v-else
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

          <!-- <q-btn
            v-if="$q.screen.gt.xs"
            no-wrap
            size="md"
            color="red"
            no-caps
            outline
            label="Eliminar"
            @click="eliminarContactoF()"
          ></q-btn> -->
          <q-btn
            v-if="$q.screen.gt.xs"
            no-wrap
            size="md"
            no-caps
            outline
            color="positive"
            label="Agregar"
            @click="crearDireccion()"
          ></q-btn>
        </q-toolbar>
      </div>
    </div>
    <q-table
      dense
      :data="datafld"
      :columns="columns"
      row-key="no_percon"
      :filter="filter"
      :loading="loading"
      :selected.sync="selected"
      :selected-rows-label="getSelectedString"
      class="my-sticky-header-table"
    >
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <!-- <q-btn
              dense
              size="sm"
              @click="rowClick(props.row)"
              color="info"
              icon="visibility"
            /> -->
            <q-btn
              dense
              size="sm"
              @click="rowClick(props.row)"
              color="warning"
              icon="edit"
            />
          </div>
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="prompt" persistent>
      <q-card style="width: 100%">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-card-section>
            <div class="text-h6">Agregar Contacto</div>
          </q-card-section>

          <q-card-section>
            <div class="q-gutter-sm">
              <div class="row q-gutter-xs">
                <div class="col">
                  <q-input
                    autofocus
                    ref="form.apellidoPaterno"
                    dense
                    outlined
                    required="true"
                    label="Apellido Paterno"
                    v-model="form.apellidoPaterno"
                  />
                </div>
                <div class="col">
                  <q-input
                    ref="form.apellidoMaterno"
                    dense
                    outlined
                    required="true"
                    label="Apellido Materno"
                    v-model="form.apellidoMaterno"
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

              <div class="q-gutter-xs">
                <q-input
                  dense
                  outlined
                  required
                  label="Direccion"
                  v-model="formDireccion.direccion"
                  @keyup.enter="prompt = false"
                />
              </div>
              <div class="q-gutter-xs">
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
              <div class="q-gutter-xs">
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
              <div class="q-gutter-xs">
                <q-select
                  outlined
                  dense
                  required
                  v-model="formDireccion.codigoUbigeo"
                  :options="getDistrito"
                  option-value="no_ubigeo"
                  option-label="no_provin"
                  emit-value
                  map-options
                  label="Distrito"
                />
              </div>
            </div>
            <!--            <TablaDetalleDireccionLimpio :id_pro="id_pro" />-->
          </q-card-section>

          <q-card-actions align="center" class="text-primary">
            <q-btn
              size="sm"
              color="positive"
              label="Agregar Contacto"
              type="submit"
            />
            <q-btn
              size="sm"
              color="negative"
              label="Cancel"
              @click="reset()"
              type="reset"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
    <!--    {{ $data.selected }}-->
    <!-- {{ $data.generoOption }} -->
    <div>
      <q-dialog
        v-model="updateCliente"
        persistent
        transition-show="flip-down"
        transition-hide="flip-up"
      >
        <q-card style="width: 700px">
          <DialogUpdate @click="boton" :dataUpdate="dataUpdate" />
        </q-card>
      </q-dialog>
    </div>
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
      dataUpdate: [],
      updateCliente: false,
      fieldDepartamento: "",
      fieldProvincia: "",
      fieldDistrito: "",
      model: "",
      formDireccion: {
        p_id: null,
        direccion: "",
        codigoUbigeo: ""
      },
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
          name: "no_sigpro",
          required: true,
          label: "",
          align: "right",
          field: "no_sigpro",
          sortable: true
        },
        {
          name: "no_percon",
          required: true,
          label: "Nombres Y Apellidos",
          align: "left",
          field: "no_percon",
          sortable: true
        },
        {
          name: "no_arelab",
          align: "left",
          label: "Area",
          field: "no_arelab",
          sortable: true
        },
        // {
        //   name: "no_sigpro",
        //   align: "left",
        //   label: "Correo",
        //   field: "no_sigpro",
        //   sortable: true
        // },
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
        },
        {
          name: "action",
          align: "right",
          label: "Acciones",
          field: "action",
          sortable: true
        }
      ]
    };
  },
  components: {
    DialogUpdate: () => import("./updateContacto.vue")
    // TituloTabla: () => import("../../components/TituloTablas")
    // TablaDetalleDireccionLimpio: () =>
    //   import("../../pages/cliente/TablaDetalleDireccionLimpio")
  },
  methods: {
    rowClick(val) {
      console.log(val);
      this.dataUpdate = val;
      this.updateCliente = true;
    },
    async boton() {
      // await this.getClientes();
      this.updateCliente = false;
    },
    eliminarDireccionF() {
      console.log(`Se selecionaron ${this.selected.length} registros`);
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
        console.log(element.co_direcc);
        this.eliminarDireccion({
          p_id: this.id_pro,
          codigoDireccion: element.co_direcc,
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
            this.direccionCliente(this.id_pro);
            // this.info = this.Clientes;
          });
      }
    },
    ...mapActions("proveedor", [
      "registrarProveDireccion",
      "direccionProveedor",
      "pblistar_departamento",
      "pblistar_provincia",
      "pblistar_distrito",
      "registrarProveContacto",
      "contactoProveedor"
    ]),
    ...mapActions("clientes", [
      "guardarDireccion",
      "direccionCliente",
      "eliminarDireccion",
      "guardarContacto",
      "listar_genero_persona",
      "listar_area_laboral",
      "listar_sigla_profesion",
      "contactoCliente",
      "eliminarContacto",
      "mantenimiento_telefono",
      "percon_direccion_telefono"
    ]),
    async onSubmit() {
      // let p_co_perconVar = null;
      // let p_co_direccVar = null;
      this.loading = true;
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "fas fa-check-circle",
        message: "Submitted"
      });
      this.formDireccion.p_id = this.id_pro;
      this.form.p_id = this.id_pro;
      this.guardarDireccion(this.formDireccion).then(result => {
        const codigoDirec = JSON.parse(result[0].mantenimiento_direccion);
        console.log(codigoDirec);
        const p_co_direccVar = codigoDirec.codigoDireccion;
        console.log(codigoDirec.codigoDireccion);
        this.direccionCliente(this.formDireccion.p_id).then(() => {
          this.loading = false;
          this.prompt = false;
          this.apellidoPaterno = "";
          this.apellidoMaterno = "";
          this.nombres = "";
          this.generoPersona = "";
          this.codigoAreaLaboral = "";
          this.correoElectronico = "";
          this.codigoSiglaProfesion = "";
          this.formDireccion.direccion = "";
          this.formDireccion.codigoUbigeo = "";
          this.formDireccion.codigoDireccion = "";
        });
        this.guardarContacto(this.form).then(resp => {
          const personContacto = JSON.parse(
            resp[0].mantenimiento_persona_contacto
          );
          console.log(personContacto);
          const p_co_perconVar = personContacto.codigoPersonaContacto;
          console.log(personContacto.codigoPersonaContacto);
          console.log("Se ejecuto Guardar Contacto");
          this.contactoCliente(this.form.p_id).then(resp => {
            console.log(resp);
            console.log("Se ejecuto Guardar clienteContacto");
            this.mantenimiento_telefono({
              p_id: this.form.p_id,
              numeroTelefono: this.form.p_nu_telefo,
              p_co_percon: p_co_perconVar
            })
              .then(resp => {
                console.log(resp);
                const telfRegistro = JSON.parse(resp[0].mantenimiento_telefono);
                this.percon_direccion_telefono({
                  p_co_percon: p_co_perconVar,
                  p_co_direcc: p_co_direccVar,
                  p_co_telefo: telfRegistro.codigoTelefono
                });
                this.apellidoPaterno = "";
                this.apellidoMaterno = "";
                this.nombres = "";
                this.generoPersona = "";
                this.codigoAreaLaboral = "";
                this.correoElectronico = "";
                this.codigoSiglaProfesion = "";
                this.formDireccion.direccion = "";
                this.formDireccion.codigoUbigeo = "";
                this.formDireccion.codigoDireccion = "";
                this.$q.notify({
                  color: "green",
                  textColor: "white",
                  icon: "fas fa-check-circle",
                  message: "Registrado"
                });
              })
              .catch(err => {
                console.log(err);
                this.$q.notify({
                  color: "red",
                  textColor: "white",
                  icon: "fas fa-times",
                  message: "Error al registrar.!"
                });
              });
            this.prompt = false;
            this.loading = false;
          });
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
    provincia() {
      console.log(this.fieldDepartamento);
      this.pblistar_provincia(this.fieldDepartamento);
      this.fieldProvincia = "";
    },
    distrito() {
      console.log(this.fieldProvincia);
      this.pblistar_distrito(this.fieldProvincia);
      this.form.codigoUbigeo = "";
      this.form.codigoDireccion = "";
    },
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
    crearDireccion() {
      this.prompt = true;
    },
    getSelectedString() {
      return this.selected.length === 0 ? "" : `${this.selected.length}`;
    }
    // eslint-disable-next-line
  },
  async mounted() {
    this.loading = true;
    this.formDireccion.p_id = this.id_pro;
    this.form.p_id = this.id_pro;
    this.pblistar_departamento();
    this.generoOption = await this.listar_genero_persona();
    this.areaOption = await this.listar_area_laboral();
    this.siglaOption = await this.listar_sigla_profesion();
    this.loading = false;
    // await this.getClientes();
    // this.info = this.Clientes;
  }
};
</script>
