<script setup lang="ts">
import { images, type ImageName } from '@/data/images'

const props = defineProps<{
  name: ImageName
  /** Wie breit das Foto gezeigt wird, damit der Browser die passende Datei wählt. */
  sizes: string
  /** Leerer Alternativtext, wenn das Foto nur schmückt. */
  decorative?: boolean
}>()

const photo = images[props.name]
</script>

<template>
  <img
    :src="photo.src"
    :srcset="photo.srcset"
    :sizes="sizes"
    :width="photo.w"
    :height="photo.h"
    :alt="decorative ? '' : photo.alt"
  />
</template>
