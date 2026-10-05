<script setup lang="ts">
// Gebaute Geräte je Jahr (Balken) und das bisher eingesparte CO₂ aller
// laufenden Geräte (Linie, rechte Achse). Zeichnet sich, sobald es ins Bild
// scrollt.
import { computed, ref, useId } from 'vue'
import { max } from 'd3-array'
import { scaleBand, scaleLinear } from 'd3-scale'
import { curveMonotoneX, line } from 'd3-shape'

import { de } from '@/composables/format'
import { useInView } from '@/composables/useInView'
import { useWidth } from '@/composables/useWidth'
import { series } from '@/data/figures'

const margin = { top: 24, right: 56, bottom: 36, left: 46 }
const id = useId()

const root = ref<HTMLElement | null>(null)
const width = useWidth(root, 760)
const height = computed(() => (width.value < 600 ? 280 : 340))
const drawn = useInView(root)
const active = ref<number | null>(null)

const x = computed(() =>
  scaleBand<number>()
    .domain(series.map((d) => d.year))
    .range([margin.left, width.value - margin.right])
    .padding(0.25),
)
const yUnits = computed(() =>
  scaleLinear()
    .domain([0, max(series, (d) => d.units) ?? 0])
    .range([height.value - margin.bottom, margin.top])
    .nice(),
)
const yCo2 = computed(() =>
  scaleLinear()
    .domain([0, max(series, (d) => d.co2) ?? 0])
    .range([height.value - margin.bottom, margin.top])
    .nice(),
)

const co2Path = computed(() =>
  line<(typeof series)[number]>()
    .x((d) => (x.value(d.year) ?? 0) + x.value.bandwidth() / 2)
    .y((d) => yCo2.value(d.co2))
    .curve(curveMonotoneX)(series),
)

// Jahreszahlen unter jedem dritten (schmal: fünften) Balken und unter dem letzten.
const labelled = computed(() => {
  const every = width.value < 600 ? 5 : 3
  return series.filter((_, i) => (i % every === 0 && i < series.length - 3) || i === series.length - 1)
})

const current = computed(() => series[active.value ?? series.length - 1]!)
const kt = (tons: number) => `${de(Math.round(tons / 1000))} kt`
</script>

<template>
  <figure ref="root" :data-drawn="drawn" class="figures-chart">
    <svg :width="width" :height="height" class="block" role="img" :aria-labelledby="`${id}-title`">
      <title :id="`${id}-title`">
        Gebaute Wärmepumpen je Jahr von {{ series[0]?.year }} bis {{ series.at(-1)?.year }}, zuletzt
        {{ de(series.at(-1)?.units ?? 0) }} Geräte; eingespartes CO₂ bis dahin rund {{ kt(series.at(-1)?.co2 ?? 0) }}.
      </title>
      <g v-for="tick in yUnits.ticks(4)" :key="tick">
        <line :x1="margin.left" :x2="width - margin.right" :y1="yUnits(tick)" :y2="yUnits(tick)" stroke="var(--color-line)" />
        <text :x="margin.left - 8" :y="yUnits(tick)" dy="0.32em" text-anchor="end" class="fill-steel text-[12px]">
          {{ de(tick) }}
        </text>
      </g>
      <text
        v-for="tick in yCo2.ticks(4)"
        :key="`c${tick}`"
        :x="width - margin.right + 8"
        :y="yCo2(tick)"
        dy="0.32em"
        class="fill-meadow text-[12px] font-medium"
      >
        {{ kt(tick) }}
      </text>
      <g>
        <rect
          v-for="(d, i) in series"
          :key="d.year"
          class="bar"
          :style="{ transitionDelay: `${i * 40}ms` }"
          :x="x(d.year)"
          :y="yUnits(d.units)"
          :width="x.bandwidth()"
          :height="yUnits(0) - yUnits(d.units)"
          :fill="active === i ? 'var(--color-heat-dark)' : 'var(--color-heat)'"
          rx="2"
        />
      </g>
      <text
        v-for="d in labelled"
        :key="`x${d.year}`"
        :x="(x(d.year) ?? 0) + x.bandwidth() / 2"
        :y="height - 12"
        text-anchor="middle"
        class="fill-steel text-[12px]"
      >
        {{ d.year }}
      </text>
      <path
        :d="co2Path ?? undefined"
        class="co2-line"
        path-length="1"
        fill="none"
        stroke="var(--color-meadow)"
        stroke-width="3"
        stroke-linecap="round"
      />
      <!-- Unsichtbare Flächen je Jahr für Maus und Finger -->
      <rect
        v-for="(d, i) in series"
        :key="`h${d.year}`"
        :x="(x(d.year) ?? 0) - (x.step() - x.bandwidth()) / 2"
        :y="margin.top"
        :width="x.step()"
        :height="height - margin.top - margin.bottom"
        fill="transparent"
        @pointerenter="active = i"
        @pointerleave="active = null"
      />
    </svg>
    <figcaption class="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
      <span class="flex flex-wrap gap-x-5 gap-y-1">
        <span class="inline-flex items-center gap-2"><span class="size-3 rounded-sm bg-heat" /> Gebaute Geräte je Jahr</span>
        <span class="inline-flex items-center gap-2"><span class="h-0.5 w-4 bg-meadow" /> Eingespartes CO₂, Summe (Kilotonnen, geschätzt)</span>
      </span>
      <span class="tabular-nums" aria-live="polite">
        <strong>{{ current.year }}:</strong> {{ de(current.units) }} Geräte · {{ kt(current.co2) }} CO₂ bis dahin
      </span>
    </figcaption>
  </figure>
</template>

<style scoped>
.bar {
  transform-box: fill-box;
  transform-origin: bottom;
  transform: scaleY(0);
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.co2-line {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 1.8s 0.5s ease-in-out;
}
[data-drawn='true'] .bar {
  transform: scaleY(1);
}
[data-drawn='true'] .co2-line {
  stroke-dashoffset: 0;
}
@media (prefers-reduced-motion: reduce) {
  .bar {
    transform: none;
  }
  .co2-line {
    stroke-dashoffset: 0;
  }
}
</style>
