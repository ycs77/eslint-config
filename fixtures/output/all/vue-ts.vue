<template>
  <div>
    <h1>{{ greeting }}</h1>
    <button @click="incrementCounter">
      Click me!
    </button>
    <p>Counter: {{ counter }}</p>
  </div>
</template>

<script setup lang="ts">
// Define reactive data and props
import { ref } from 'vue'

const greeting = ref('Hello, Vue 3!')
const counter = ref<number | 1>(0)

// Define a function
function incrementCounter() {
  counter.value++
}

// Define a enum
enum Week {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

log(Week.Monday, Week.Sunday)
</script>
