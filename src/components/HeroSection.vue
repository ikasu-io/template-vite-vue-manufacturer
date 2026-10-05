<script setup lang="ts">
// Kopfbereich: eine Landschaft auf der Schwäbischen Alb aus SVG-Ebenen. Beim Scrollen
// bewegen sich die hinteren Ebenen langsamer als die vorderen (Parallaxe).
import { ref } from 'vue'

import HeatPumpDrawing from '@/components/HeatPumpDrawing.vue'
import { company } from '@/data/company'
import { useScrollProgress } from '@/composables/useScrollProgress'

const hero = ref<HTMLElement | null>(null)
useScrollProgress(hero)

// Verschiebung je Ebene in Pixeln über den ganzen Scrollweg: hinten viel, vorne nichts.
const shift = (px: number) => ({ transform: `translate3d(0, calc((var(--progress) - 0.5) * ${px}px), 0)` })
</script>

<template>
  <section
    id="top"
    ref="hero"
    class="relative flex min-h-[100svh] flex-col overflow-hidden bg-gradient-to-b from-[#e3eef6] via-[#f2f6f8] to-white"
    style="--progress: 0.5"
  >
    <div class="container-page relative z-10 pt-24 sm:pt-32" :style="shift(260)">
      <p class="mb-4 font-condensed text-sm font-semibold uppercase tracking-[0.2em] text-frost-dark">
        Wärmepumpen aus Ebersgrund · seit 2008
      </p>
      <h1 class="max-w-6xl text-[clamp(2.6rem,6.5vw,5rem)] leading-[0.95]">
        Wärme aus der Luft.<br />
        <span class="text-heat-dark">Gebaut auf der Schwäbischen Alb.</span>
      </h1>
      <p class="mt-6 max-w-xl text-steel sm:text-lg">
        Wir entwickeln, bauen und prüfen Wärmepumpen für Häuser, Mehrfamilienhäuser und Betriebe, alle mit dem
        natürlichen Kältemittel R290 und alle in unserem Werk in {{ company.town }}.
      </p>
      <div class="mt-7 flex flex-wrap gap-3">
        <a
          href="#produkte"
          class="inline-flex h-12 items-center rounded-md bg-heat-dark px-6 font-medium text-white transition-colors hover:bg-graphite"
        >
          Modelle vergleichen
        </a>
        <a
          href="#kontakt"
          class="inline-flex h-12 items-center rounded-md border border-graphite/30 bg-white/70 px-6 font-medium transition-colors hover:border-graphite"
        >
          Installateur finden
        </a>
      </div>
    </div>

    <div class="relative -mt-16 min-h-[42svh] flex-1 sm:mt-0" aria-hidden="true">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" class="absolute inset-0 size-full">
        <!-- Ferne Hügel mit Windrädern -->
        <g :style="shift(220)">
          <path d="M0 560 C 200 480 420 500 620 530 S 1020 470 1220 500 S 1500 530 1600 490 L1600 1100 L0 1100 Z" fill="#cdd9e2" />
          <g v-for="(x, i) in [1180, 1290, 1400]" :key="x" :transform="`translate(${x} ${490 - i * 6})`">
            <path d="M-2 0 L-3.5 120 L3.5 120 L2 0 Z" fill="#fff" />
            <g class="rotor" :style="{ animationDelay: `${-i * 0.7}s` }">
              <circle r="54" fill="none" />
              <path v-for="a in [0, 120, 240]" :key="a" :transform="`rotate(${a})`" d="M0 0 L-3 -52 L1 -54 L3 -2 Z" fill="#fff" />
            </g>
            <circle r="3.5" fill="#fff" />
          </g>
        </g>
        <!-- Mittlere Hügel mit dem Dorf -->
        <g :style="shift(140)">
          <path d="M0 650 C 260 570 520 600 760 630 S 1220 580 1600 620 L1600 1100 L0 1100 Z" fill="#b6cc95" />
          <g fill="#fff" stroke="var(--color-graphite)" stroke-width="1.5" stroke-opacity="0.25">
            <path d="M250 612 h44 v-26 l-22 -16 l-22 16 Z" />
            <path d="M302 608 h36 v-22 l-18 -14 l-18 14 Z" />
            <path d="M346 606 h30 v-58 l-15 -26 l-15 26 Z" />
            <path d="M384 606 h48 v-24 l-24 -18 l-24 18 Z" />
            <path d="M440 610 h40 v-22 l-20 -14 l-20 14 Z" />
          </g>
          <g fill="var(--color-heat-dark)" opacity="0.75">
            <path d="M247 588 l25 -19 l25 19 l-4 0 l-21 -15 l-21 15 Z" />
            <path d="M381 584 l27 -20 l27 20 l-4 0 l-23 -16 l-23 16 Z" />
          </g>
          <g fill="#7f9e5c">
            <circle cx="540" cy="612" r="18" />
            <circle cx="566" cy="618" r="13" />
            <circle cx="214" cy="612" r="15" />
          </g>
        </g>
        <!-- Nahe Wiese -->
        <g :style="shift(70)">
          <path d="M0 760 C 320 690 640 700 940 730 S 1400 700 1600 690 L1600 1100 L0 1100 Z" fill="var(--color-meadow)" />
          <g fill="#5d8a31">
            <circle cx="1270" cy="700" r="34" />
            <circle cx="1310" cy="690" r="40" />
            <rect x="1302" y="720" width="8" height="34" fill="#4a3a2a" />
            <circle cx="160" cy="732" r="26" />
            <rect x="156" y="752" width="7" height="22" fill="#4a3a2a" />
          </g>
        </g>
        <!-- Vorne: Haus und Wärmepumpe -->
        <g>
          <path d="M0 860 C 420 810 860 800 1600 828 L1600 1100 L0 1100 Z" fill="#4f7a2b" />
          <g transform="translate(830 590)">
            <rect x="0" y="80" width="280" height="160" fill="#d7b38c" />
            <path d="M0 80 h280" stroke="#b8936b" stroke-width="2" />
            <path
              v-for="i in 13"
              :key="i"
              :d="`M${i * 20} 82 V240`"
              stroke="#c29e76"
              stroke-width="2"
            />
            <path d="M-18 86 L140 -10 L298 86 Z" fill="var(--color-graphite)" />
            <rect x="34" y="120" width="56" height="64" fill="#ffd9bd" stroke="#fff" stroke-width="5" />
            <rect x="190" y="120" width="56" height="64" fill="#ffd9bd" stroke="#fff" stroke-width="5" />
            <rect x="116" y="150" width="48" height="90" fill="var(--color-graphite)" />
            <rect x="196" y="18" width="22" height="40" fill="var(--color-graphite)" />
          </g>
          <!-- Kalte Luft strömt zum Lüfter -->
          <g fill="none" stroke="var(--color-frost)" stroke-width="4" stroke-linecap="round" opacity="0.7">
            <path class="air" d="M460 760 C 520 740 560 780 620 760" />
            <path class="air" style="animation-delay: -1s" d="M440 800 C 500 780 550 820 620 800" />
            <path class="air" style="animation-delay: -2s" d="M470 720 C 530 700 570 740 630 724" />
          </g>
          <HeatPumpDrawing drawing="double" spin x="630" y="700" width="180" height="125" />
        </g>
      </svg>
    </div>

    <ul
      class="container-page relative z-10 -mt-14 mb-8 hidden flex-wrap gap-x-6 gap-y-2 font-condensed text-sm font-semibold text-white sm:flex"
    >
      <li>Jahresarbeitszahl bis 5,4</li>
      <li>Kältemittel R290</li>
      <li>20 Jahre Ersatzteile</li>
    </ul>
  </section>
</template>

<style scoped>
.rotor {
  animation: spin 7s linear infinite;
  transform-box: fill-box;
  transform-origin: center;
}
.air {
  stroke-dasharray: 70 170;
  animation: flow 3s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
@keyframes flow {
  from {
    stroke-dashoffset: 240;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>
