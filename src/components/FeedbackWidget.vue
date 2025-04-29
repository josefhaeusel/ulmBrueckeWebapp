<template>
    <div
      class="email-fab"
      :style="fabStyle"
    >
      <transition name="fade">
        <div
          v-if="expanded"
          class="email-content"
          style="display: flex; align-items: center; gap: 8px; margin-right: 8px; background-color: #97b28a; color:white; padding: 12px; border-radius: 12px;"
        >
          <div style="font-size: 14px;">
            Anliegen? Schreiben Sie:<br />
            <a href="mailto:flachsbrueckeulm@gmail.com"><strong>{{ email }}</strong></a>
          </div>
          <v-btn
            icon
            size="small"
            @click="copyEmail"
            style="background-color: white; color: #4caf50;"
          >
            <v-icon size="18">mdi-content-copy</v-icon>
          </v-btn>
        </div>
      </transition>
  
      <v-btn
        icon
        color="#97b28a"
        @click="expanded = !expanded"
        style="margin-top:9px; margin-bottom:9px"
      >
        <v-icon>{{ expanded ? 'mdi-close' : 'mdi-email' }}</v-icon>
      </v-btn>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const expanded = ref(false)
  const email = 'flachsbrueckeulm@gmail.com'
  
  const fabStyle = computed(() => ({
    position: 'fixed',
    bottom: '20px',
    right: '16px',
    display: 'flex',
    alignItems: 'center',
    transition: 'width 0.3s ease',
    'z-index': '100000'
  }))
  
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
    //   alert('Email copied to clipboard!')
    } catch (err) {
    //   alert('Failed to copy.')
    }
  }
  </script>
  
  <style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  a:link {
  color: white;
  background-color: transparent;
  /* text-decoration: none; */

  }
  </style>