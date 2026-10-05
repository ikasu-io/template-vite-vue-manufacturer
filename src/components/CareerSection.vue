<script setup lang="ts">
import { ArrowRight, Clock, MapPin } from '@lucide/vue'

import AppPhoto from '@/components/AppPhoto.vue'
import { company } from '@/data/company'
import { apprenticeships, jobs } from '@/data/jobs'

const mailto = (subject: string) => `mailto:${company.emails.jobs}?subject=${encodeURIComponent(`Bewerbung: ${subject}`)}`
</script>

<template>
  <section id="karriere" aria-labelledby="karriere-titel" class="py-24 sm:py-32">
    <div class="container-page grid gap-14 lg:grid-cols-[1fr_1.4fr]">
      <div>
        <h2 id="karriere-titel" class="text-5xl sm:text-6xl">Arbeiten in Ebersgrund</h2>
        <p class="mt-5 text-lg text-steel">
          Feste Arbeitszeiten, Tarif der Metall- und Elektroindustrie, eine Kantine mit Essen aus der Region und
          ein Werk, das man mit dem Rad erreicht. Bewerben Sie sich formlos per E-Mail.
        </p>
        <div class="mt-10 overflow-hidden rounded-2xl border border-line">
          <AppPhoto name="apprentices" sizes="(min-width: 1024px) 480px, 100vw" loading="lazy" class="aspect-[3/2] w-full object-cover" />
          <div class="p-6">
            <h3 class="text-2xl">Ausbildung ab 1. August</h3>
            <ul class="mt-3 space-y-1 text-steel">
              <li v-for="name in apprenticeships" :key="name">{{ name }}</li>
            </ul>
            <a :href="mailto('Ausbildung')" class="mt-4 inline-flex items-center gap-1 font-medium text-frost-dark hover:underline">
              Für eine Ausbildung bewerben <ArrowRight class="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div>
        <h3 class="text-2xl">Offene Stellen ({{ jobs.length }})</h3>
        <ul class="mt-6 divide-y divide-line border-y border-line">
          <li v-for="job in jobs" :key="job.title" class="grid gap-3 py-6 sm:grid-cols-[1fr_auto] sm:items-start">
            <div>
              <p class="text-sm text-steel">{{ job.team }}</p>
              <h4 class="font-condensed text-2xl font-semibold">{{ job.title }}</h4>
              <p class="mt-2 text-steel">{{ job.text }}</p>
              <p class="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                <span class="inline-flex items-center gap-1.5"><MapPin class="size-4 text-steel" aria-hidden="true" /> {{ job.location }}</span>
                <span class="inline-flex items-center gap-1.5"><Clock class="size-4 text-steel" aria-hidden="true" /> {{ job.type }}, {{ job.start }}</span>
              </p>
            </div>
            <a
              :href="mailto(job.title)"
              class="inline-flex h-10 items-center justify-self-start rounded-md border border-graphite/30 px-4 text-sm font-medium transition-colors hover:border-graphite hover:bg-graphite hover:text-white"
            >
              Bewerben<span class="sr-only">: {{ job.title }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
