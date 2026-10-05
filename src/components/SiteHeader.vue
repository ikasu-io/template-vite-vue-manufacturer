<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Menu, X } from '@lucide/vue'

import SiteLogo from '@/components/SiteLogo.vue'

const links = [
  { hash: '#produkte', label: 'Produkte' },
  { hash: '#kennzahlen', label: 'Kennzahlen' },
  { hash: '#unternehmen', label: 'Unternehmen' },
  { hash: '#karriere', label: 'Karriere' },
  { hash: '#kontakt', label: 'Kontakt' },
]

const open = ref(false)
const scrolled = ref(false)
const onScroll = () => (scrolled.value = window.scrollY > 16)
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-40 transition-colors"
    :class="scrolled || open ? 'border-b border-line bg-white/90 backdrop-blur' : 'bg-transparent'"
  >
    <nav class="container-page flex h-16 items-center justify-between" aria-label="Hauptnavigation">
      <RouterLink to="/">
        <SiteLogo />
      </RouterLink>
      <ul class="hidden items-center gap-7 text-[15px] md:flex">
        <li v-for="link in links" :key="link.hash">
          <RouterLink :to="{ path: '/', hash: link.hash }" class="transition-colors hover:text-heat-dark">
            {{ link.label }}
          </RouterLink>
        </li>
      </ul>
      <button
        type="button"
        class="rounded-md p-2 md:hidden"
        :aria-expanded="open"
        aria-controls="mobile-menu"
        @click="open = !open"
      >
        <X v-if="open" class="size-6" aria-hidden="true" />
        <Menu v-else class="size-6" aria-hidden="true" />
        <span class="sr-only">{{ open ? 'Menü schließen' : 'Menü öffnen' }}</span>
      </button>
    </nav>
    <ul v-if="open" id="mobile-menu" class="container-page space-y-1 border-t border-line pt-3 pb-6 md:hidden">
      <li v-for="link in links" :key="link.hash">
        <RouterLink :to="{ path: '/', hash: link.hash }" class="block py-2 text-lg" @click="open = false">
          {{ link.label }}
        </RouterLink>
      </li>
    </ul>
  </header>
</template>
