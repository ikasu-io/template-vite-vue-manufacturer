import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

/** Die gemessene Breite eines Elements in Pixeln; Diagramme rechnen damit ihre Skalen. */
export function useWidth(el: Ref<Element | null>, initial: number) {
  const width = ref(initial)
  let observer: ResizeObserver | undefined
  onMounted(() => {
    if (!el.value) return
    observer = new ResizeObserver(([entry]) => {
      if (entry) width.value = Math.round(entry.contentRect.width)
    })
    observer.observe(el.value)
  })
  onBeforeUnmount(() => observer?.disconnect())
  return width
}
