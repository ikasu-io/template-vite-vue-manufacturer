<script setup lang="ts">
import SiteLogo from '@/components/SiteLogo.vue'
import { company } from '@/data/company'
</script>

<template>
  <footer class="bg-graphite py-12 text-sm text-white/70">
    <div class="container-page grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-start lg:gap-16">
      <div class="text-white"><SiteLogo class="[&_.text-steel]:text-white/60" /></div>
      <p class="max-w-2xl">
        {{ company.name }} ist ein erfundenes Unternehmen: Ort, Personen, Produkte und Zahlen sind ausgedacht. Diese
        Website, ihre Texte und Bilder wurden mit KI erstellt und werden mit
        <a href="https://ikasu.io" class="text-white underline underline-offset-4">Ikasu</a> gepflegt.
      </p>
      <nav aria-label="Rechtliches">
        <ul class="flex gap-6">
          <li><RouterLink to="/impressum/" class="text-white hover:underline">Impressum</RouterLink></li>
          <li><RouterLink to="/datenschutz/" class="text-white hover:underline">Datenschutz</RouterLink></li>
        </ul>
      </nav>
    </div>
  </footer>
</template>
