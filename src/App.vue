<script setup lang="ts">
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
</script>

<template>
  <a
    href="#inhalt"
    class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-graphite focus:px-4 focus:py-2 focus:text-white"
  >
    Zum Inhalt
  </a>
  <SiteHeader />
  <main id="inhalt">
    <RouterView />
  </main>
  <SiteFooter />
</template>
