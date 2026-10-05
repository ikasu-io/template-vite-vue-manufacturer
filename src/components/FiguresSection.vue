<script setup lang="ts">
import FiguresChart from '@/components/FiguresChart.vue'
import { de } from '@/composables/format'
import { people, totals } from '@/data/figures'

const figures = [
  { value: de(totals.units), label: `Wärmepumpen gebaut seit 2008` },
  { value: de(people.employees), label: 'Beschäftigte in Ebersgrund' },
  { value: de(people.apprentices), label: 'Auszubildende' },
  { value: `${people.localParts} %`, label: 'der Teile aus weniger als 200 km' },
]
</script>

<template>
  <section id="kennzahlen" aria-labelledby="kennzahlen-titel" class="bg-graphite py-24 text-white sm:py-32">
    <div class="container-page">
      <h2 id="kennzahlen-titel" class="text-5xl sm:text-6xl">In Zahlen</h2>
      <p class="mt-5 max-w-2xl text-lg text-white/70">Stand Ende {{ totals.lastYear }}.</p>
      <dl class="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/15 pt-10 lg:grid-cols-4">
        <div v-for="figure in figures" :key="figure.label" class="flex flex-col-reverse">
          <dt class="mt-2 text-white/70">{{ figure.label }}</dt>
          <dd class="font-condensed text-5xl font-bold text-[#ff8a4c] sm:text-6xl">{{ figure.value }}</dd>
        </div>
      </dl>
      <div class="mt-16 rounded-2xl bg-white p-4 text-graphite sm:p-8">
        <h3 class="text-2xl">Jahr für Jahr</h3>
        <p class="mt-1 mb-6 max-w-2xl text-steel">
          Gebaute Geräte je Jahr und das CO₂, das alle laufenden Geräte zusammen gegenüber einer Gasheizung
          eingespart haben: rund {{ de(Math.round(totals.co2 / 1000) * 1000) }} Tonnen.
        </p>
        <FiguresChart />
      </div>
    </div>
  </section>
</template>
