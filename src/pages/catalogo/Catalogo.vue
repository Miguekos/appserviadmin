<template>
  <div>
    <div class="text-center q-pa-md q-gutter-md items-center">
      <div class="row col-12 q-pa-md q-gutter-md">
        <div class="col">
          <q-input dense v-model="text" label="Catalogo" />
        </div>
        <div class="col">
          <q-select
            dense
            options-dense
            class="col"
            v-model="model"
            :options="options"
            label="Prioridad"
          />
        </div>
      </div>
      <div class="row items-center justify-between q-gutter-md">
        <template>
          <div class="q-pa-md">
            <template>
              <div class="q-pa-md">
                <q-uploader
                  :factory="factoryFn1"
                  multiple
                  style="

                  max-width: 300px"
                />
              </div>
            </template>
          </div>
        </template>
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
    factoryFn1(files) {
      console.log(files); // returning a Promise
      return new Promise(resolve => {
        // simulating a delay of 2 seconds
        // setTimeout(() => {
        resolve({
          url: "http://127.0.0.1:3000/api/containers/container1/upload"
        });
        // }, 2000);
      });
    },
    factoryFn(file) {
      console.log(file[0]);
      const fd = new FormData();
      fd.append("file", file);
      return new Promise((resolve, reject) => {
        console.log(reject);
        // Retrieve JWT token from your store.
        // const token = "myToken";
        //   url="http://127.0.0.1:3000/api/containers/container1/upload"
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
