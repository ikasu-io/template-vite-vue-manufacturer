import { onBeforeUnmount, onMounted, type Ref } from 'vue'

/**
 * Schreibt, wie weit ein Element durch das Fenster gescrollt ist, in die
 * CSS-Variable `--progress` auf dem Element: 0, wenn seine Oberkante unten
 * hereinkommt, 1, wenn seine Unterkante oben hinausgeht. CSS macht daraus
 * Verschiebungen (Parallaxe). Ein requestAnimationFrame je Scroll-Ereignis,
 * kein Neu-Rendern. Bei „Bewegung reduzieren“ bleibt der Wert bei `rest`.
 */
export function useScrollProgress(el: Ref<HTMLElement | null>, rest = 0.5) {
  let frame = 0
  const update = () => {
    frame = 0
    const node = el.value
    if (!node) return
    const rect = node.getBoundingClientRect()
    const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (rect.height + window.innerHeight)))
    node.style.setProperty('--progress', progress.toFixed(4))
  }
  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(update)
  }
  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.value?.style.setProperty('--progress', String(rest))
      return
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
  })
  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  })
}
