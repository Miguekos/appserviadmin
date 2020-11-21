<template>
  <div>
    <!-- <q-dialog v-model="prompt" persistent> -->
    <q-card style="width: 100%">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-card-section>
          <div class="text-h6">Actualizar Contacto</div>
        </q-card-section>
        <!-- {{ dataUpdate }} -->
        <q-card-section>
          <div class="q-gutter-sm">
            <div class="row q-gutter-xs">
              <div class="col">
                <q-input
                  disable
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
                  disable
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
                disable
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
                disable
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
                v-model="form.numeroTelefono"
              />
            </div>
            <div class="q-gutter-xs">
              <q-input
                ref="numeroCelular"
                dense
                outlined
                required
                label="Celular"
                v-model="form.numeroCelular"
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
            label="Actualizar Contacto"
            type="submit"
          />
          <q-btn
            size="sm"
            color="warning"
            @click="limpiarDireccion"
            label="Limpiar Direccion"
          />
          <q-btn
            size="sm"
            color="info"
            @click="limpiarDatos"
            label="Limpiar Datos"
          />
          <q-btn
            size="sm"
            color="negative"
            label="Cancel"
            @click="cerrar()"
            type="reset"
          />
        </q-card-actions>
      </q-form>
    </q-card>
    <!-- </q-dialog> -->
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["datafld", "id_pro", "dataUpdate"],
  computed: {
    ...mapGetters("proveedor", [
      "getDepartamento",
      "getProvincia",
      "getDistrito"
    ])
  },
  data() {
    return {
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
        numeroCelular: "",
        tipoPersona: "1",
        apellidoPaterno: "",
        apellidoMaterno: "",
        nombres: "",
        generoPersona: "",
        tipoDocumento: "1",
        codigoAreaLaboral: "",
        correoElectronico: "",
        codigoSiglaProfesion: "",
        numeroTelefono: "",
        p_id: null,
        persona: null
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
          name: "nu_doccon",
          align: "left",
          label: "Area",
          field: "nu_doccon",
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
    // DialogUpdate: () => import("./Update")
    // TituloTabla: () => import("../../components/TituloTablas")
    // TablaDetalleDireccionLimpio: () =>
    //   import("../../pages/cliente/TablaDetalleDireccionLimpio")
  },
  methods: {
    limpiarDireccion() {
      this.fieldDepartamento = "";
      this.fieldProvincia = "";
      this.fieldDistrito = "";
      this.formDireccion.codigoUbigeo = "";
      this.formDireccion.direccion = "";
    },
    limpiarDatos() {
      this.form.numeroCelular = "";
      this.form.numeroTelefono = "";
      this.form.correoElectronico = "";
      this.form.codigoSiglaProfesion = "";
      this.form.codigoAreaLaboral = "";
    },
    cerrar() {
      this.$emit("click");
    },
    rowClick(val) {
      console.log(val);
    },
    async boton() {
      //   await this.getClientes();
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
      "actualizarDireccion",
      "direccionCliente",
      "eliminarDireccion",
      "actualizarContacto",
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
      // this.formDireccion.p_id = this.id_pro;
      // this.form.p_id = this.id_pro;
      // console.log("this.formDireccion", this.formDireccion);
      const asd = {
        ...this.form,
        ...this.formDireccion
      };
      console.log(asd);
      this.actualizarContacto({
        ...this.form,
        ...this.formDireccion,
        ubigeo: this.formDireccion.codigoUbigeo
          ? this.formDireccion.codigoUbigeo
          : this.dataUpdate.co_ubigeo
      }).then(async resp => {
        console.log("actualizarContacto", resp);
        // const personContacto = JSON.parse(
        //   resp[0].mantenimiento_persona_contacto
        // );
        // console.log(personContacto);
        // const p_co_perconVar = personContacto.codigoPersonaContacto;
        // console.log(personContacto.codigoPersonaContacto);
        console.log("Se ejecuto Guardar Contacto");
        // this.contactoCliente(this.form.p_id).then(resp => {
        //   console.log(resp);
        //   console.log("Se ejecuto Guardar clienteContacto");
        //   // this.mantenimiento_telefono({
        //   //   p_id: this.form.p_id,
        //   //   numeroTelefono: this.form.numeroTelefono,
        //   //   p_co_percon: p_co_perconVar
        //   // })
        //   //   .then(resp => {
        //   //     console.log(resp);
        //   //     const telfRegistro = JSON.parse(resp[0].mantenimiento_telefono);
        //   //     this.percon_direccion_telefono({
        //   //       p_co_percon: p_co_perconVar,
        //   //       p_co_direcc: p_co_direccVar,
        //   //       p_co_telefo: telfRegistro.codigoTelefono
        //   //     });
        //   //     this.apellidoPaterno = "";
        //   //     this.apellidoMaterno = "";
        //   //     this.nombres = "";
        //   //     this.generoPersona = "";
        //   //     this.codigoAreaLaboral = "";
        //   //     this.correoElectronico = "";
        //   //     this.codigoSiglaProfesion = "";
        //   //     this.formDireccion.direccion = "";
        //   //     this.formDireccion.codigoUbigeo = "";
        //   //     this.formDireccion.codigoDireccion = "";
        //   //     this.$q.notify({
        //   //       color: "green",
        //   //       textColor: "white",
        //   //       icon: "fas fa-check-circle",
        //   //       message: "Registrado"
        //   //     });
        //   //   })
        //   //   .catch(err => {
        //   //     console.log(err);
        //   //     this.$q.notify({
        //   //       color: "red",
        //   //       textColor: "white",
        //   //       icon: "fas fa-times",
        //   //       message: "Error al registrar.!"
        //   //     });
        //   //   });
        //   this.prompt = false;
        //   this.loading = false;
        // });
        await this.contactoCliente(this.dataUpdate.co_client);
        this.$emit("click");
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
    this.form.apellidoPaterno = this.dataUpdate.no_apepat;
    this.form.apellidoMaterno = this.dataUpdate.no_apemat;
    this.form.nombres = this.dataUpdate.no_nombre;
    this.form.generoPersona = this.dataUpdate.ti_genero;
    this.form.codigoAreaLaboral = this.dataUpdate.co_arelab;
    this.form.codigoSiglaProfesion = this.dataUpdate.co_sigpro;
    this.form.numeroTelefono = this.dataUpdate.nu_telefo;
    this.form.numeroCelular = this.dataUpdate.nu_telcel;
    this.form.correoElectronico = this.dataUpdate.no_corele;
    this.form.p_id = this.dataUpdate.co_client;
    this.formDireccion.p_id = this.dataUpdate.co_client;
    this.form.persona = this.dataUpdate.co_percon;

    this.formDireccion.direccion = this.dataUpdate.no_direcc;
    this.fieldDepartamento = this.dataUpdate.no_depart;
    this.fieldProvincia = this.dataUpdate.no_provin;
    this.formDireccion.codigoUbigeo = this.dataUpdate.no_distri;

    // this.loading = true;
    // this.formDireccion.p_id = this.id_pro;
    // this.form.p_id = this.id_pro;
    // this.pblistar_departamento();
    // this.loading = false;
    this.generoOption = await this.listar_genero_persona();
    this.areaOption = await this.listar_area_laboral();
    this.siglaOption = await this.listar_sigla_profesion();
    // await this.getClientes();
    // this.info = this.Clientes;
  }
};
</script>
