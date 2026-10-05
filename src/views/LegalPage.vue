<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <article class="container-page max-w-3xl pt-32 pb-24">
    <h1 class="text-5xl">{{ title }}</h1>
    <div class="legal mt-8 space-y-5 text-lg text-steel">
      <slot />
    </div>
  </article>
</template>

<style scoped>
.legal :deep(h2) {
  margin-top: 2.5rem;
  font-size: 1.75rem;
  color: var(--color-graphite);
}
.legal :deep(ul) {
  list-style: disc;
  padding-left: 1.25rem;
}
.legal :deep(a) {
  color: var(--color-frost-dark);
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>
