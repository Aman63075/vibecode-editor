<template>
  <div style="font-family: system-ui, sans-serif; text-align: center; padding: 2rem; color: #f8fafc; background: #0f172a; min-height: 100vh;">
    <h1>💚 VibeCode Vue Playground</h1>
    <p>Edit <code>src/App.vue</code> to test Vue reactivity!</p>
    <div style="margin: 2rem 0;">
      <button 
        @click="count++" 
        style="padding: 10px 20px; font-size: 16px; background-color: #10b981; color: white; border: none; border-radius: 8px; cursor: pointer;"
      >
        Count is: {{ count }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const count = ref(0);
</script>