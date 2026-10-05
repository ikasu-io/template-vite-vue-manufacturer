import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

/** Wird true, sobald das Element ins Bild gescrollt ist, und bleibt es. */
export function useInView(el: Ref<Element | null>, rootMargin = '0px 0px -15% 0px') {
  const inView = ref(false)
  let observer: IntersectionObserver | undefined
  onMounted(() => {
    if (!el.value) return
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          inView.value = true
          observer?.disconnect()
        }
      },
      { rootMargin },
    )
    observer.observe(el.value)
  })
  onBeforeUnmount(() => observer?.disconnect())
  return inView
}
