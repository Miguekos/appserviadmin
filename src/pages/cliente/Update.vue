<template>
  <div>
    <q-card class="my-card">
      <q-item class="bg-custom4">
        <q-item-section>
          <q-item-label>Crear</q-item-label>
          <q-item-label caption>Cliente</q-item-label>
        </q-item-section>
        <q-item-section></q-item-section>
        <q-item-section></q-item-section>
        <!-- <q-item-section>
          <div class="text-right">
            <div class="text-right">
              <Atras />
            </div>
          </div>
        </q-item-section> -->
      </q-item>
      <q-item>
        <q-item-section>
          <form
            @submit.prevent="actualizar"
            @reset.prevent="onReset"
            class="q-gutter-sm"
          >
            <q-select
              dense
              v-model="tipoDePersonaVar"
              :options="tipoDePersonaOption"
              option-value="co_tipper"
              option-label="no_tipper"
              emit-value
              map-options
              label="Tipo de Persona"
              outlined
              required="true"
            />

            <q-select
              dense
              v-model="tipoDeDocumentoVar"
              :options="tipoDeDocumentoOption"
              option-value="ti_docide"
              option-label="no_tipdoc"
              emit-value
              map-options
              label="Tipo de Documento"
              outlined
            />

            <q-input
              dense
              ref="numeroDeDocumento"
              outlined
              v-model="numeroDeDocumento"
              label="Numero de Documento"
              maxlength="11"
              required
            />

            <q-input
              dense
              ref="nombre"
              outlined
              v-model="nombre"
              label="Nombre"
              required
            />

            <q-select
              v-if="tipoDePersonaVar == 2"
              dense
              v-model="listar_sector_economicoVar"
              :options="listar_sector_economicoOption"
              option-value="co_sececo"
              option-label="no_sececo"
              emit-value
              map-options
              label="Sector Economico"
              outlined
            />

            <q-input
              dense
              ref="sigla"
              outlined
              v-model="sigla"
              label="Sigla"
              required
            />

            <!--            <q-input-->
            <!--              dense-->
            <!--              ref="direccionFiscal"-->
            <!--              outlined-->
            <!--              v-model="direccionFiscal"-->
            <!--              label="Direccion Fiscal"-->
            <!--            />-->
            <!--            <div class="q-gutter-xs">-->
            <!--              <q-select-->
            <!--                outlined-->
            <!--                dense-->
            <!--                required-->
            <!--                @input="provincia()"-->
            <!--                v-model="fieldDepartamento"-->
            <!--                :options="getDepartamento"-->
            <!--                option-value="no_ubigeo"-->
            <!--                option-label="nu_depart"-->
            <!--                emit-value-->
            <!--                map-options-->
            <!--                label="Departamento"-->
            <!--              />-->
            <!--            </div>-->
            <!--            <div class="q-gutter-xs">-->
            <!--              <q-select-->
            <!--                @input="distrito()"-->
            <!--                outlined-->
            <!--                dense-->
            <!--                required-->
            <!--                v-model="fieldProvincia"-->
            <!--                :options="getProvincia"-->
            <!--                option-value="no_ubigeo"-->
            <!--                option-label="no_provin"-->
            <!--                emit-value-->
            <!--                map-options-->
            <!--                label="Provincia"-->
            <!--              />-->
            <!--            </div>-->
            <!--            <div class="q-gutter-xs">-->
            <!--              <q-select-->
            <!--                outlined-->
            <!--                dense-->
            <!--                required-->
            <!--                v-model="formDireccion.codigoUbigeo"-->
            <!--                :options="getDistrito"-->
            <!--                option-value="no_ubigeo"-->
            <!--                option-label="no_provin"-->
            <!--                emit-value-->
            <!--                map-options-->
            <!--                label="Distrito"-->
            <!--              />-->
            <!--            </div>-->

            <div class="text-center">
              <q-btn
                size="sm"
                label="Actualizar"
                type="submit"
                color="positive"
              />
              <q-btn
                size="sm"
                label="Close"
                v-close-popup
                color="negative"
                class="q-ml-sm"
              />
            </div>
          </form>
        </q-item-section>
      </q-item>
    </q-card>
    <!--    {{ $data }}-->
    <!-- {{ tipoDeDocumentoOption }} -->
    <!-- {{ tipoDePersonaVar }} -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["dataUpdate"],
  computed: {
    ...mapGetters("proveedor", [
      "getDepartamento",
      "getProvincia",
      "getDistrito"
    ])
  },
  data() {
    return {
      codigoCliente: null,
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
      fieldDepartamento: "",
      fieldProvincia: "",
      fieldDistrito: "",
      model: "",
      formDireccion: {
        p_id: null,
        direccion: "",
        codigoUbigeo: ""
      },
      direccionFiscal: "",
      listar_sector_economicoVar: null,
      listar_sector_economicoOption: [],
      tipoDePersonaOption: [],
      tipoDeDocumentoOption: [],
      tipoDePersonaVar: null,
      tipoDeDocumentoVar: null,
      numeroDeDocumento: "",
      name: null,
      email: null,
      nombre: "",
      generoPersona: null,
      estadoCivil: null,
      documentoTributario: null,
      telf: null,
      direccion: null,
      sigla: "",
      roles: [
        {
          label: "Admin",
          value: 1
        },
        {
          label: "Usuario",
          value: 2
        }
      ]
    };
  },
  components: {
    // Atras: () => import("../../components/IrAtras")
  },
  methods: {
    ...mapActions("clientes", [
      "createCleintes",
      "tipoDePersona",
      "TipoDeDocumento",
      "eliminarCliente"
    ]),
    ...mapActions("proveedor", [
      "listar_sector_economico",
      "registrarProveDireccion",
      "direccionProveedor",
      "pblistar_departamento",
      "pblistar_provincia",
      "pblistar_distrito",
      "registrarProveContacto",
      "contactoProveedor"
    ]),
    actualizar() {
      this.eliminarCliente({
        codigoDeCliente: this.codigoCliente,
        tipoPersona: this.tipoDePersonaVar,
        tipoDocumento: this.tipoDeDocumentoVar,
        numeroDocumento: this.numeroDeDocumento,
        razonSocial: this.nombre,
        codigoSectorEconomico: this.listar_sector_economicoVar,
        siglaCliente: this.sigla
      })
        .then(resp => {
          console.log(resp);
          this.$q.notify({
            color: "green",
            textColor: "white",
            icon: "fas fa-check-circle",
            message: "Eliminado Correctamente.!"
          });
          this.$emit("click");
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          // this.getClientes();
          // this.info = this.Clientes;
          console.log("Finalizo el proceso");
        });
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
    atras() {
      console.log("Ir Atras");
      this.$router.go(-1);
    },
    registrar() {
      const data = {
        tipoPersona: this.tipoDePersonaVar,
        tipoDocumento: this.tipoDeDocumentoVar,
        numeroDocumento: this.numeroDeDocumento,
        codigoSectorEconomico: this.listar_sector_economicoVar,
        razonSocial: this.nombre,
        siglaCliente: this.sigla
      };
      console.log(data);
      this.createCleintes(data)
        .then(resp => {
          console.log("asdasd");
          console.log(resp);
          console.log("asdasd");
          this.$q.notify({
            color: "green",
            textColor: "white",
            icon: "fas fa-check-circle",
            message: "Registrado"
          });
          this.$router.push("/cliente");
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
    },
    onSubmit() {
      const response = this.registrar();
      console.log(response);
    },
    onReset() {
      this.tipoDePersonaVar = "";
      this.tipoDeDocumentoVar = "";
      this.numeroDeDocumento = "";
      this.nombre = "";
      this.sigla = "";
      //   this.$refs.name.resetValidation();
      //   this.$refs.dni.resetValidation();
      //   this.$refs.email.resetValidation();
      //   this.$refs.telf.resetValidation();
      //   this.$refs.direccion.resetValidation();
    }
  },
  async mounted() {
    console.log(this.dataUpdate);
    this.codigoCliente = this.dataUpdate.co_client;
    this.tipoDePersonaVar = this.dataUpdate.co_tipper;
    this.tipoDeDocumentoVar = this.dataUpdate.ti_docide;
    this.numeroDeDocumento = this.dataUpdate.co_doctri;
    this.nombre = this.dataUpdate.no_client;
    this.listar_sector_economicoVar = this.dataUpdate.co_sececo;
    this.sigla = this.dataUpdate.no_sigcli;
    // this.direccionFiscal = this.dataUpdate.no_sigcli;
    this.fieldDepartamento = this.dataUpdate;
    this.fieldProvincia = this.dataUpdate;
    this.formDireccion.codigoUbigeo = this.dataUpdate;
    this.pblistar_departamento();
    this.tipoDePersonaOption = await this.tipoDePersona();
    this.tipoDeDocumentoOption = await this.TipoDeDocumento();
    this.listar_sector_economicoOption = await this.listar_sector_economico();
  }
};
</script>
