<template>
    <v-footer class="d-flex flex-column pa0 ma0">
      <div class="bg-green-lighten-4 d-flex w-100 align-center px-4">
        <strong>Connect with us!</strong>
  
        <v-spacer></v-spacer>
  
        <v-btn
          v-for="icon in icons"
          :key="icon"
          :icon="icon"
          class="mx-4"
          size="small"
          variant="plain"
        ></v-btn>
      </div>
  
      <div class="px-4 py-2 bg-black text-center w-100" >
        {{ new Date().getFullYear() }} — <strong>Ulm</strong>
      </div>
    </v-footer>
  </template>
  <script>
    export default {
      name: 'FooterBottom',
      data: () => ({
        icons: [
          'mdi-facebook',
          'mdi-twitter',
          'mdi-linkedin',
          'mdi-instagram',
        ],
      }),
    }
  </script>
<style scoped>
.v-footer {
    padding: 0;
}
</style>