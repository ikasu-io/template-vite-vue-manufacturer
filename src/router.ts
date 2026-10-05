import { createRouter, createWebHistory } from 'vue-router'

import DatenschutzView from '@/views/DatenschutzView.vue'
import HomeView from '@/views/HomeView.vue'
import ImpressumView from '@/views/ImpressumView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

// Seitentitel je Seite. Neue Seite: hier eintragen und in vite.config.ts in
// `pages`, damit der Build eine eigene HTML-Datei dafür anlegt.
const site = 'Ebersgrund Wärmetechnik'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView, meta: { title: `${site} – Wärmepumpen von der Schwäbischen Alb` } },
    { path: '/impressum/', component: ImpressumView, meta: { title: `Impressum – ${site}` } },
    { path: '/datenschutz/', component: DatenschutzView, meta: { title: `Datenschutz – ${site}` } },
    { path: '/:path(.*)*', component: NotFoundView, meta: { title: `Seite nicht gefunden – ${site}` } },
  ],
  strict: false,
  scrollBehavior(to, _from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, top: 72, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = String(to.meta.title ?? site)
})
