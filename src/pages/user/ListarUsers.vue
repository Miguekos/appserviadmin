<template>
  <div class="q-pa-md">
    <q-table
      :data="info"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :loading="loading"
      :pagination.sync="pagination"
    >
      <template v-slot:top>
        <img
          style="height: 50px; width: 50px"
          src="/statics/minilogoservi.png"
        />
        <q-space />
        <q-input
          borderless
          dense
          debounce="300"
          color="primary"
          v-model="filter"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
    <!--    {{ $data }}-->
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("users", ["Users"])
  },
  data() {
    return {
      pagination: {
        sortBy: "id",
        descending: false,
        page: 2,
        rowsPerPage: 3,
        rowsNumber: 3,
        pagesNumber: 3
      },
      info: [],
      loading: false,
      filter: "",
      columns: [
        {
          name: "#",
          required: true,
          label: "Nro.",
          align: "left",
          field: "id",
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "Nombre",
          align: "left",
          label: "Nombre",
          field: "name",
          sortable: true
        },
        {
          name: "Email",
          align: "left",
          label: "Email",
          field: "email",
          sortable: true
        },
        {
          name: "Role",
          align: "left",
          label: "Role",
          field: "role",
          sortable: true
        }
      ]
    };
  },
  methods: {
    ...mapActions("users", ["getUsers"])
  },
  async mounted() {
    await this.getUsers();
    this.info = this.Users;
  }
};
</script>
