<template>
  <q-layout view="hHh Lpr fFf" class="loginfondo">
    <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <!--    <q-header elevated>-->
    <!--      <q-toolbar class="bg-custom1 text-white shadow-5">-->
    <!--        <q-btn flat label="ServiAdmin" />-->
    <!--        <q-space />-->
    <!--        <q-btn flat round dense icon="whatshot" />-->
    <!--      </q-toolbar>-->
    <!--    </q-header>-->

    <!--    <q-drawer-->
    <!--      v-model="leftDrawer"-->
    <!--      side="left"-->
    <!--      bordered-->
    <!--      content-class="bg-grey-2"-->
    <!--    >-->
    <!--      &lt;!&ndash; QScrollArea is optional &ndash;&gt;-->
    <!--      <q-scroll-area class="fit q-pa-sm">-->
    <!--        &lt;!&ndash; Content here &ndash;&gt;-->
    <!--      </q-scroll-area>-->
    <!--    </q-drawer>-->

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  // name: 'LayoutName',

  data() {
    return {
      leftDrawer: false
    };
  }
};
</script>
<style scoped>
.loginfondo {
  /* background-color: #365552; */
  background-image: url("../statics/fondo.png");
  height: 500px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
</style>
