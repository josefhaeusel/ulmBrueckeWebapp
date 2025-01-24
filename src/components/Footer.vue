<template>

  
  <v-footer class="d-flex flex-column pa0 ma0">


    <div class="d-flex align-center flex-row bg-black w-100 justify-space-between">

      <div class="px-4 py-2 bg-black text-center">
        {{ new Date().getFullYear() }} — <strong>Stadt Ulm</strong>
      </div>
      <v-spacer></v-spacer>
      <v-btn v-for="icon in icons" :key="icon" :icon="icon.icon" :href="icon.url" class="mx-4" size="small"
        variant="plain"></v-btn>

      <v-spacer></v-spacer>
        <img :src="require('../assets/logo_ulm.jpg')" href="https://www.ulm.de"
          style="height: 50px; margin-top: -5px; padding-right: 20px" />

    </div>


  </v-footer>
</template>
<script>
export default {
  name: 'FooterBottom',
  data: () => ({
    icons: [
      { icon: 'mdi-facebook', url: "https://www.facebook.com/stadtulm/?locale=de_DE" },
      { icon: 'mdi-twitter', url: "https://x.com/ulm_donau?lang=en" },
      { icon: 'mdi-linkedin', url: "https://www.linkedin.com/company/stadt-ulm/" },
      { icon: 'mdi-instagram', url: "https://www.instagram.com/stadtulm/?hl=en" },
    ],
  }),
}
</script>
<style scoped>
.v-footer {
  padding: 0;
}
</style>