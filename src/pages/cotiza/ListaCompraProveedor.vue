<template>
  <div class="q-pa-md">
    <q-table
      title="Cotizacion"
      dense
      :data="data"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          name: "N°",
          required: true,
          label: "Num.",
          align: "left",
          field: "num",
          sortable: true
        },
        {
          name: "Cantidad",
          align: "center",
          label: "Cantidad",
          field: "cantidad",
          sortable: true
        },
        {
          name: "Producto",
          label: "Producto",
          field: "name",
          sortable: true
        },
        {
          name: "Proveedores",
          label: "Proveedores",
          field: "proveedores",
          sortable: true
        }
      ],
      data: [
        {
          num: 159,
          cantidad: 6.0,
          name: "Frozen Yogurt",
          proveedor: ["asd", "qwe"]
        },
        {
          num: 237,
          cantidad: 9.0,
          name: "Ice cream sandwich"
        },
        {
          num: 262,
          cantidad: 16.0,
          name: "Eclair"
        },
        {
          num: 305,
          cantidad: 3.7,
          name: "Cupcake"
        },
        {
          num: 356,
          cantidad: 16.0,
          name: "Gingerbread"
        },
        {
          num: 375,
          cantidad: 0.0,
          name: "Jelly bean"
        },
        {
          num: 392,
          cantidad: 0.2,
          name: "Lollipop"
        },
        {
          num: 408,
          cantidad: 3.2,
          name: "Honeycomb"
        },
        {
          num: 452,
          cantidad: 25.0,
          name: "Donut"
        },
        {
          num: 518,
          cantidad: 26.0,
          name: "KitKat"
        }
      ]
    };
  }
};
</script>
