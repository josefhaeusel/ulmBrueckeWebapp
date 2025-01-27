<template>

  
  <v-footer class="d-flex flex-column pa-0 ma-0">


    <div class="d-flex align-center flex-row bg-black w-100 justify-space-between">

      <div class="mx-3">
      <v-btn v-for="icon in icons" :key="icon" :icon="icon.icon" :href="icon.url"  size="small"
        variant="plain"></v-btn>
      </div>

      <v-spacer></v-spacer>

        <a style="color: rgb(151, 178, 138); margin-right: 1rem;" href="/impressum">Impressum</a>

        <img :src="require('../assets/logo_ulm.jpg')" href="https://www.ulm.de"
          style="height: 50px; margin-top: -5px; "/>

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
/* .p .a:link, a:visited {
  color: #208AA7;
  text-decoration: underline;
  cursor: auto;
}  */
</style>