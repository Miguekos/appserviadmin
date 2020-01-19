<template>
  <div class="full-width">
    <div class="q-pa-md q-gutter-md">
      <q-input v-model="text" label="Catalogo" />
      <div class="row items-center justify-between q-gutter-md">
        <q-select
          class="col"
          v-model="model"
          :options="options"
          label="Prioridad"
        />
        <q-uploader
          class="col"
          url="http://localhost:5000/"
          method="POST"
          auto-upload
          :headers="[{ name: 'X-Custom-Timestamp', value: 1550240306080 }]"
          label="Cargar Catalogo"
          color="secondary"
          no-thumbnails
        />
        <q-btn class="col" color="positive" label="Grabar" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadPercentage: 0,
      selected_file: "",
      check_if_document_upload: false,
      model: null,
      options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    };
  },
  methods: {
    factoryFn(file) {
      console.log(file[0]);
      const fd = new FormData();
      fd.append("file", file);
      return new Promise((resolve, reject) => {
        console.log(reject);
        // Retrieve JWT token from your store.
        // const token = "myToken";
        resolve({
          url: "http://localhost:5000",
          method: "POST",
          headers: [
            { name: "Content-Type", value: "multipart/form-data" }
            // { name: 'Authorization', value: `Bearer ${token}` }
          ],
          file: file[0]
        });
      });
    },
    getUrl(files) {
      return `http://localhost:4444/upload?count=${files.length}`;
    },
    file_selected(file) {
      this.selected_file = file[0];
      this.check_if_document_upload = true;
    },
    uploadFile(file) {
      console.log("ejecutando loadfile");
      console.log(file);
      const fd = new FormData();
      fd.append("file", file);
      console.log(fd);
      return new Promise((resolve, reject) => {
        this.$axios
          .post("http://localhost:5000", fd, {
            headers: { "Content-Type": "multipart/form-data" }
          })
          .then(res => {
            console.log(res);
            resolve(file);
          })
          .catch(err => reject(err));
      });
    }
  }
};
</script>

<style scoped></style>
