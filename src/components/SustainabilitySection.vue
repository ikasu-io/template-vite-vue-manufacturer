<script setup lang="ts">
import { Leaf, Sun, Wrench } from '@lucide/vue'

const points = [
  {
    icon: Leaf,
    title: 'Propan statt F-Gase',
    text: 'R290 hat ein Treibhauspotenzial von 3. Die bis 2019 üblichen Kältemittel lagen bei über 2.000.',
  },
  {
    icon: Sun,
    title: 'Strom vom eigenen Dach',
    text: 'Die Solaranlage auf der Montagehalle liefert 1,9 MW Spitzenleistung, über das Jahr gut die Hälfte unseres Stroms.',
  },
  {
    icon: Wrench,
    title: 'Reparieren statt tauschen',
    text: 'Für jedes Gerät halten wir zwanzig Jahre lang Ersatzteile bereit. Lüfter, Platinen und Pumpen lassen sich einzeln wechseln.',
  },
]
</script>

<template>
  <section aria-labelledby="nachhaltigkeit-titel" class="bg-cloud py-24 sm:py-32">
    <div class="container-page">
      <h2 id="nachhaltigkeit-titel" class="max-w-3xl text-5xl sm:text-6xl">
        Eine Wärmepumpe ist nur so gut <span class="text-[#4d7a22]">wie ihr Bau</span>
      </h2>
      <ul class="mt-14 grid gap-10 md:grid-cols-3">
        <li v-for="point in points" :key="point.title">
          <component :is="point.icon" class="size-9 text-[#4d7a22]" aria-hidden="true" />
          <h3 class="mt-5 text-2xl">{{ point.title }}</h3>
          <p class="mt-2 text-steel">{{ point.text }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
