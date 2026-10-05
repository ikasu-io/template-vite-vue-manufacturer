<script setup lang="ts">
// Ein Gerät, flach gezeichnet: Außengerät mit einem oder zwei Lüftern, das
// Innengerät der Sole-Wärmepumpe oder das große Gerät für Mehrfamilienhäuser.
import type { Product } from '@/data/products'

const props = withDefaults(defineProps<{ drawing: Product['drawing']; spin?: boolean }>(), { spin: false })

const fans = props.drawing === 'single' ? [60] : props.drawing === 'indoor' ? [] : [48, 112]
const width = props.drawing === 'single' || props.drawing === 'indoor' ? 120 : 160
</script>

<template>
  <svg :viewBox="`0 0 ${width} 100`" aria-hidden="true">
    <template v-if="drawing === 'indoor'">
      <rect x="30" y="4" width="60" height="88" rx="4" fill="#fff" stroke="var(--color-graphite)" stroke-width="2.5" />
      <rect x="40" y="16" width="40" height="14" rx="2" fill="var(--color-graphite)" />
      <circle cx="46" cy="23" r="2" fill="var(--color-meadow)" />
      <rect x="52" y="21" width="22" height="4" rx="1" fill="var(--color-cloud)" opacity="0.6" />
      <path d="M40 46 h40 M40 54 h40 M40 62 h40" stroke="var(--color-line)" stroke-width="2" />
      <path d="M44 92 v6 M76 92 v6" stroke="var(--color-graphite)" stroke-width="3" />
    </template>
    <template v-else>
      <rect :x="4" y="10" :width="width - 8" :height="drawing === 'large' ? 78 : 72" rx="5" fill="#fff" stroke="var(--color-graphite)" stroke-width="2.5" />
      <path
        :d="`M${width - 26} 22 v${drawing === 'large' ? 54 : 48}`"
        stroke="var(--color-line)"
        stroke-width="10"
        stroke-dasharray="2 3"
      />
      <g v-for="cx in fans" :key="cx" :transform="`translate(${cx} ${drawing === 'large' ? 49 : 46})`">
        <circle r="26" fill="var(--color-cloud)" stroke="var(--color-graphite)" stroke-width="2" />
        <g :class="spin ? 'fan' : ''">
          <circle r="21" fill="none" />
          <path
            v-for="angle in [0, 120, 240]"
            :key="angle"
            :transform="`rotate(${angle})`"
            d="M0 0 C 6 -6 14 -12 20 -8 C 18 -2 8 2 0 0 Z"
            fill="var(--color-steel)"
          />
        </g>
        <circle r="4" fill="var(--color-graphite)" />
        <path d="M-24 -6 h48 M-25 0 h50 M-24 6 h48" stroke="var(--color-graphite)" stroke-width="0.8" opacity="0.5" />
      </g>
      <rect :x="12" :y="drawing === 'large' ? 88 : 82" width="16" height="8" fill="var(--color-graphite)" />
      <rect :x="width - 28" :y="drawing === 'large' ? 88 : 82" width="16" height="8" fill="var(--color-graphite)" />
    </template>
  </svg>
</template>

<style scoped>
.fan {
  animation: spin 1.6s linear infinite;
  transform-box: fill-box;
  transform-origin: center;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
