<template>
  <v-card theme="bright" flat class="rounded-lg">
    <v-window v-model="onboarding">
      <v-window-item v-for="n in length" :key="`card-${n}`" :value="n">
        <v-card class="d-flex justify-center align-center">
          <v-parallax :src="require(`../assets/card${n}.jpg`)" class="rounded-t-lg" height="500px">
          </v-parallax>
        </v-card>
      </v-window-item>
    </v-window>

    <v-card-actions class="justify-space-between">
      <v-btn icon="mdi-chevron-left" variant="plain" @click="prev"></v-btn>
      <v-item-group v-model="onboarding" class="text-center" mandatory>
        <v-item v-for="n in length" :key="`btn-${n}`" v-slot="{ isSelected, toggle }" :value="n">
          <v-btn :variant="isSelected ? 'outlined' : 'text'" icon="mdi-record" @click="toggle"></v-btn>
        </v-item>
      </v-item-group>
      <v-btn icon="mdi-chevron-right" variant="plain" @click="next"></v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'SlideCards',
  data: () => ({
    length: 3,
    onboarding: 1,
  }),

  methods: {
    next() {
      this.onboarding = (this.onboarding % this.length) + 1;
    },
    prev() {
      this.onboarding = (this.onboarding - 2 + this.length) % this.length + 1;
    },
  }
}
</script>