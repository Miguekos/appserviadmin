<template>
  <div class="justify-around">
    <div class="q-pa-sm">
      <q-input dense v-model="form.nombreCatalogo" label="Catalogo" />
    </div>
    <div class="q-pa-sm">
      <template>
        <div class="q-pa-sm">
          <q-uploader auto-upload :factory="factoryFn" />
        </div>
      </template>
    </div>
    <div class="q-pa-sm">
      <q-select
        dense
        options-dense
        v-model="form.ordenCatalogo"
        :options="options"
        label="Prioridad"
      />
    </div>
    <div class="q-pa-sm text-center">
      <q-btn @click="guardarCatalogo" color="positive" label="Grabar" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      file: [],
      form: {
        nombreCatalogo: "",
        codigoArchivoAdjunto: "",
        ordenCatalogo: ""
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
    factoryFn(files) {
      if (files.length > 0) {
        console.log(files[0].name);
        this.form.codigoArchivoAdjunto = files[0].name;
        this.file = files[0];
        // returning a Promise
        return new Promise(resolve => {
          // simulating a delay of 2 seconds
          resolve({
            url: "https://api.apps.com.pe/api/containers/container1/upload"
          });
        });
      } else {
        console.log("Dio Error");
      }
    },
    async guardarCatalogo() {
      if (
        this.form.nombreCatalogo != "" &&
        this.form.codigoArchivoAdjunto != "" &&
        this.form.ordenCatalogo != ""
      ) {
        await this.guardarCatalogos(this.form);
        await this.listar_catalogos_new();
        this.form.nombreCatalogo = "";
        this.form.codigoArchivoAdjunto = "";
        this.form.ordenCatalogo = "";
      } else {
        console.log("Se debe cargar un archivo antes de guardar");
      }
    }
  }
};
</script>

<style scoped></style>
