<script setup lang="ts">
import AppPhoto from '@/components/AppPhoto.vue'
import CopChart from '@/components/CopChart.vue'
import HeatPumpDrawing from '@/components/HeatPumpDrawing.vue'
import { de } from '@/composables/format'
import { products } from '@/data/products'
</script>

<template>
  <section id="produkte" aria-labelledby="produkte-titel" class="py-24 sm:py-32">
    <div class="container-page">
      <div class="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <h2 id="produkte-titel" class="text-5xl sm:text-6xl">Vier Modelle</h2>
          <p class="mt-5 max-w-2xl text-lg text-steel">
            Drei Außengeräte, die Wärme aus der Luft holen, und eine Wärmepumpe, die sie aus dem Erdreich holt. Alle
            heizen, kühlen auf Wunsch und machen warmes Wasser bis 70 °C.
          </p>
        </div>
        <figure class="relative hidden overflow-hidden rounded-2xl lg:block">
          <AppPhoto name="test-lab" sizes="(min-width: 1024px) 34vw, 100vw" loading="lazy" class="aspect-[16/9] w-full object-cover" />
          <figcaption class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-graphite/85 to-transparent p-4 pt-12 text-sm text-white">
            Jedes Gerät läuft vor der Auslieferung in der Klimakammer, bei −20 bis +35 °C.
          </figcaption>
        </figure>
      </div>

      <ul class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="product in products" :key="product.id" class="flex flex-col rounded-2xl border border-line bg-cloud p-6">
          <HeatPumpDrawing :drawing="product.drawing" class="h-24 w-auto self-start" />
          <p class="mt-6 text-sm text-steel">{{ product.kind }}</p>
          <h3 class="text-3xl">{{ product.name }}</h3>
          <p class="mt-2 text-steel">{{ product.use }}</p>
          <dl class="mt-auto grid grid-cols-3 gap-2 border-t border-line pt-5 text-sm">
            <div>
              <dt class="text-steel">Leistung</dt>
              <dd class="font-condensed text-2xl font-semibold">{{ product.outputKw }} kW</dd>
            </div>
            <div>
              <dt class="text-steel">SCOP</dt>
              <dd class="font-condensed text-2xl font-semibold">{{ de(product.scop) }}</dd>
            </div>
            <div>
              <dt class="text-steel">Schall</dt>
              <dd class="font-condensed text-2xl font-semibold">{{ product.soundDb }} dB</dd>
            </div>
          </dl>
          <span class="mt-4 h-1 rounded-full" :style="{ background: product.color }" aria-hidden="true" />
        </li>
      </ul>
      <p class="mt-4 text-sm text-steel">
        Leistung bei A2/W35 (Luft) bzw. B0/W35 (Sole); SCOP bei 35 °C Vorlauf, durchschnittliches Klima; Schalldruck
        in 3 m Abstand. Kältemittel bei allen: R290 (Propan).
      </p>

      <div class="mt-14">
        <CopChart />
      </div>
    </div>
  </section>
</template>
