<template>
  <div class="justify-around full-width">
    <div class="q-pa-sm">
      <q-input dense v-model="getnombreTextoCorreo" label="Nombre de texto" />
    </div>
    <div class="q-pa-sm">
      <template>
        <div class="q-pa-md q-gutter-sm">
          <q-editor v-model="gettextoCorreo" min-height="15rem" />

          <!-- <q-card flat bordered>
            <q-card-section>
              <pre style="white-space: pre-line">{{ editor }}</pre>
            </q-card-section>
          </q-card> -->

          <q-card flat bordered>
            <q-card-section v-html="gettextoCorreo" />
          </q-card>
        </div>
      </template>
    </div>
    <div class="q-pa-sm text-center">
      <q-btn @click="guardarTextos()" color="positive" label="Grabar" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("clientes", ["getnombreTextoCorreo", "gettextoCorreo"])
  },
  data() {
    return {
      textoCorreo: "",
      file: [],
      form: {
        nombreTextoCorreo: "",
        textoCorreo: ""
      },
      uploadPercentage: 0,
      selected_file: "",
      check_if_document_upload: false,
      model: null,
      options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    };
  },
  methods: {
    ...mapActions("example", ["guardarCatalogos", "listar_catalogos_new"]),
    ...mapActions("clientes", ["mantenimiento_textos_correo"]),
    async guardarTextos() {
      if (this.form.nombreTextoCorreo != "" && this.form.textoCorreo != "") {
        await this.mantenimiento_textos_correo(this.form);
        this.form.nombreTextoCorreo = "";
        this.form.textoCorreo = "";
      } else {
        console.log("Se debe cargar un archivo antes de guardar");
      }
    }
  }
};
</script>

<style scoped></style>
