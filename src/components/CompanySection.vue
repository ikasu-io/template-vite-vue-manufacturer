<script setup lang="ts">
import AppPhoto from '@/components/AppPhoto.vue'
import { history } from '@/data/history'
</script>

<template>
  <section id="unternehmen" aria-labelledby="unternehmen-titel" class="py-24 sm:py-32">
    <div class="container-page">
      <div class="grid gap-12 lg:grid-cols-2">
        <div>
          <h2 id="unternehmen-titel" class="text-5xl sm:text-6xl">Ein Familienbetrieb, seit 1962</h2>
          <p class="mt-5 text-lg text-steel">
            Aus einem Heizungsbaubetrieb mit zwei Gesellen ist ein Hersteller geworden. Geblieben ist die Nähe zu den
            Handwerksbetrieben, die unsere Geräte einbauen: Viele kennen wir seit Jahrzehnten.
          </p>
        </div>
        <AppPhoto name="assembly" sizes="(min-width: 1024px) 600px, 100vw" loading="lazy" class="aspect-[3/2] w-full rounded-2xl object-cover" />
      </div>
      <ol class="relative mt-16 border-l-2 border-line pl-8 md:ml-[calc(50%-1px)]">
        <li v-for="item in history" :key="item.year" class="relative pb-10 last:pb-0">
          <span class="absolute top-1.5 -left-[41px] size-4 rounded-full border-4 border-white bg-heat ring-2 ring-heat" aria-hidden="true" />
          <p class="font-condensed text-2xl font-bold text-heat-dark md:absolute md:-left-[calc(100%+4rem)] md:w-[calc(100%)] md:pr-0 md:text-right">
            {{ item.year }}
          </p>
          <h3 class="text-2xl">{{ item.title }}</h3>
          <p class="mt-1 max-w-md text-steel">{{ item.text }}</p>
        </li>
      </ol>
      <AppPhoto name="plant" sizes="(min-width: 1280px) 1216px, 100vw" loading="lazy" class="mt-16 aspect-[16/9] w-full rounded-2xl object-cover sm:aspect-[21/9]" />
    </div>
  </section>
</template>
