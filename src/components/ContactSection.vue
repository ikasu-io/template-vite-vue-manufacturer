<script setup lang="ts">
import { Home, Newspaper, Wrench } from '@lucide/vue'

import AppPhoto from '@/components/AppPhoto.vue'
import { company } from '@/data/company'

const ways = [
  {
    icon: Home,
    title: 'Für Hausbesitzer',
    text: 'Wir verkaufen über das Fachhandwerk. Schreiben Sie uns Ihre Postleitzahl, und wir nennen Ihnen Partnerbetriebe in Ihrer Nähe.',
    email: company.emails.homeowners,
    action: 'Installateur finden',
  },
  {
    icon: Wrench,
    title: 'Für Installateure',
    text: 'Schulungen im Werk, Planungshilfe und ein Kundendienst, der zurückruft. Werden Sie Partnerbetrieb.',
    email: company.emails.installers,
    action: 'Partner werden',
  },
  {
    icon: Newspaper,
    title: 'Für die Presse',
    text: 'Fotos, Zahlen und Gesprächspartner aus Geschäftsführung und Entwicklung.',
    email: company.emails.press,
    action: 'Presseanfrage',
  },
]
</script>

<template>
  <section id="kontakt" aria-labelledby="kontakt-titel" class="bg-cloud py-24 sm:py-32">
    <div class="container-page">
      <div class="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <h2 id="kontakt-titel" class="text-5xl sm:text-6xl">Kontakt</h2>
          <p class="mt-5 max-w-2xl text-lg text-steel">
            {{ company.name }} · {{ company.street }} · {{ company.postcode }} {{ company.town }} ·
            <a :href="`mailto:${company.email}`" class="text-frost-dark underline underline-offset-4">{{ company.email }}</a>
          </p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <AppPhoto name="heat-pump-house" sizes="(min-width: 1024px) 240px, 50vw" loading="lazy" class="aspect-[4/5] w-full rounded-2xl object-cover" />
          <AppPhoto name="installer-hands" sizes="(min-width: 1024px) 240px, 50vw" loading="lazy" class="aspect-[4/5] w-full rounded-2xl object-cover" />
        </div>
      </div>
      <ul class="mt-12 grid gap-6 md:grid-cols-3">
        <li v-for="way in ways" :key="way.title" class="flex flex-col rounded-2xl bg-white p-7">
          <component :is="way.icon" class="size-8 text-heat-dark" aria-hidden="true" />
          <h3 class="mt-5 text-2xl">{{ way.title }}</h3>
          <p class="mt-2 mb-6 text-steel">{{ way.text }}</p>
          <a
            :href="`mailto:${way.email}?subject=${encodeURIComponent(way.action)}`"
            class="mt-auto inline-flex h-11 items-center justify-center rounded-md bg-heat-dark px-5 font-medium text-white transition-colors hover:bg-graphite"
          >
            {{ way.action }}
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
