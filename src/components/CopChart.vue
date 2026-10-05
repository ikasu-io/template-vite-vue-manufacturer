<script setup lang="ts">
// Leistungszahl (COP) der Modelle über der Außentemperatur. D3 rechnet
// Skalen und Linien, Vue zeichnet das SVG. Modelle lassen sich ein- und
// ausblenden; Maus, Finger oder der Regler darunter wählen eine Temperatur.
import { computed, ref, useId } from 'vue'
import { extent, max } from 'd3-array'
import { scaleLinear } from 'd3-scale'
import { curveMonotoneX, line } from 'd3-shape'

import { de } from '@/composables/format'
import { useWidth } from '@/composables/useWidth'
import { products, type Product } from '@/data/products'

const margin = { top: 20, right: 12, bottom: 44, left: 36 }
const id = useId()
const frame = ref<HTMLElement | null>(null)
const width = useWidth(frame, 760)
const height = computed(() => (width.value < 600 ? 300 : 360))

const shown = ref<string[]>(products.map((p) => p.id))
const temp = ref(-7)
const svg = ref<SVGSVGElement | null>(null)

const temps = products.flatMap((p) => p.cop.map((c) => c.temp))
const [minTemp = -15, maxTemp = 15] = extent(temps)

const maxCop = Math.ceil(max(products.flatMap((p) => p.cop.map((c) => c.value))) ?? 6)
const x = computed(() => scaleLinear().domain([minTemp, maxTemp]).range([margin.left, width.value - margin.right]))
const y = computed(() => scaleLinear().domain([1, maxCop]).range([height.value - margin.bottom, margin.top]).nice())
const xTicks = computed(() => x.value.ticks(width.value < 600 ? 4 : 6))

const path = computed(() =>
  line<{ temp: number; value: number }>()
    .x((d) => x.value(d.temp))
    .y((d) => y.value(d.value))
    .curve(curveMonotoneX),
)

/** COP eines Modells bei einer Temperatur, linear zwischen den Messpunkten. */
function copAt(product: Product, t: number) {
  const points = product.cop
  const after = points.findIndex((p) => p.temp >= t)
  if (after <= 0) return points[after === 0 ? 0 : points.length - 1]!.value
  const a = points[after - 1]!
  const b = points[after]!
  return a.value + ((b.value - a.value) * (t - a.temp)) / (b.temp - a.temp)
}

const visible = computed(() => products.filter((p) => shown.value.includes(p.id)))
const readings = computed(() =>
  visible.value.map((p) => ({ product: p, value: copAt(p, temp.value) })).sort((a, b) => b.value - a.value),
)

function toggle(productId: string) {
  shown.value = shown.value.includes(productId) ? shown.value.filter((s) => s !== productId) : [...shown.value, productId]
}

function onPointer(event: PointerEvent) {
  if (!svg.value) return
  const box = svg.value.getBoundingClientRect()
  const px = event.clientX - box.left
  temp.value = Math.round(Math.min(maxTemp, Math.max(minTemp, x.value.invert(px))))
}
</script>

<template>
  <div class="rounded-2xl border border-line bg-white p-4 sm:p-8">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h3 class="text-2xl">Effizienz bei Kälte</h3>
        <p class="mt-1 max-w-xl text-steel">
          Leistungszahl (COP): wie viele Kilowattstunden Wärme aus einer Kilowattstunde Strom werden, bei 35 °C
          Vorlauftemperatur.
        </p>
      </div>
      <div class="flex flex-wrap gap-2" role="group" aria-label="Modelle im Diagramm">
        <button
          v-for="product in products"
          :key="product.id"
          type="button"
          :aria-pressed="shown.includes(product.id)"
          class="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors aria-pressed:border-graphite aria-pressed:bg-cloud aria-[pressed=false]:border-line aria-[pressed=false]:text-steel"
          @click="toggle(product.id)"
        >
          <span
            class="size-3 rounded-full"
            :style="{ background: shown.includes(product.id) ? product.color : 'transparent', boxShadow: `inset 0 0 0 2px ${product.color}` }"
          />
          {{ product.name }}
        </button>
      </div>
    </div>

    <div ref="frame" class="relative mt-6">
      <svg
        ref="svg"
        :viewBox="`0 0 ${width} ${height}`"
        :width="width"
        :height="height"
        class="block touch-pan-y select-none"
        role="img"
        :aria-labelledby="`${id}-title`"
        @pointermove="onPointer"
        @pointerdown="onPointer"
      >
        <title :id="`${id}-title`">
          Leistungszahl der Modelle von {{ minTemp }} bis {{ maxTemp }} °C Außentemperatur. Bei {{ temp }} °C:
          {{ readings.map((r) => `${r.product.name} ${de(r.value)}`).join(', ') }}.
        </title>
        <!-- Kalt links, warm rechts -->
        <defs>
          <linearGradient :id="`${id}-bg`" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stop-color="var(--color-frost)" stop-opacity="0.12" />
            <stop offset="50%" stop-color="var(--color-frost)" stop-opacity="0" />
            <stop offset="100%" stop-color="var(--color-heat)" stop-opacity="0.1" />
          </linearGradient>
        </defs>
        <rect
          :x="margin.left"
          :y="margin.top"
          :width="width - margin.left - margin.right"
          :height="height - margin.top - margin.bottom"
          :fill="`url(#${id}-bg)`"
        />
        <g v-for="tick in y.ticks(5)" :key="`y${tick}`">
          <line :x1="margin.left" :x2="width - margin.right" :y1="y(tick)" :y2="y(tick)" stroke="var(--color-line)" />
          <text :x="margin.left - 10" :y="y(tick)" dy="0.32em" text-anchor="end" class="fill-steel text-[13px]">
            {{ de(tick) }}
          </text>
        </g>
        <text
          v-for="tick in xTicks"
          :key="`x${tick}`"
          :x="x(tick)"
          :y="height - margin.bottom + 22"
          text-anchor="middle"
          class="fill-steel text-[13px]"
        >
          {{ tick }} °C
        </text>
        <line :x1="x(0)" :x2="x(0)" :y1="margin.top" :y2="height - margin.bottom" stroke="var(--color-steel)" stroke-dasharray="2 4" />

        <path
          v-for="product in visible"
          :key="product.id"
          :d="path(product.cop) ?? undefined"
          fill="none"
          :stroke="product.color"
          stroke-width="3"
          stroke-linecap="round"
        />

        <line :x1="x(temp)" :x2="x(temp)" :y1="margin.top" :y2="height - margin.bottom" stroke="var(--color-graphite)" />
        <circle
          v-for="r in readings"
          :key="r.product.id"
          :cx="x(temp)"
          :cy="y(r.value)"
          r="5.5"
          :fill="r.product.color"
          stroke="#fff"
          stroke-width="2"
        />
      </svg>
    </div>

    <div class="mt-4 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
      <label class="flex items-center gap-4 text-sm">
        <span class="w-36 shrink-0">Außentemperatur <strong class="tabular-nums">{{ temp }} °C</strong></span>
        <input v-model.number="temp" type="range" :min="minTemp" :max="maxTemp" step="1" class="w-full accent-heat-dark" />
      </label>
      <ul class="flex flex-wrap gap-x-5 gap-y-1 text-sm tabular-nums" aria-live="polite">
        <li v-for="r in readings" :key="r.product.id" class="flex items-center gap-1.5">
          <span class="size-2.5 rounded-full" :style="{ background: r.product.color }" />
          {{ r.product.name }}: <strong>{{ de(r.value) }}</strong>
        </li>
      </ul>
    </div>
  </div>
</template>
