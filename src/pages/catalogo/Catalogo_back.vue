<template>
  <div>
    <div>
      <q-input dense v-model="form.nombreCatalogo" label="Catalogo" />
      <q-select
        dense
        options-dense
        v-model="form.ordenCatalogo"
        :options="options"
        label="Prioridad"
      />
      <template>
        <div class="q-pa-md">
          <template>
            <div class="q-pa-md">
              <q-uploader auto-upload :factory="factoryFn" />
            </div>
          </template>
        </div>
      </template>
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
    ...mapActions("example", ["guardarCatalogos"]),
    factoryFn(files) {
      console.log(files[0].name);
      this.form.codigoArchivoAdjunto = files[0].name;
      this.file = files[0];
      // returning a Promise
      return new Promise(resolve => {
        // simulating a delay of 2 seconds
        resolve({
          url: "http://127.0.0.1:3000/api/containers/container1/upload"
        });
      });
    },
    guardarCatalogo() {
      const asd = this.guardarCatalogos(this.form);
      console.log(asd.data);
    }
  }
};
</script>

<style scoped></style>
