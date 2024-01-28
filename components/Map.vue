<script setup lang="ts">
const { center } = defineProps<{
  center: number[];
}>();

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const zoom = ref(center ? 4 : 2);
</script>

<template>
  <div class="h-[35vh] rounded-lg z-[1]">
    <LMap
      ref="map"
      :zoom="zoom"
      :center="center || [51, -0.09]"
      class="h-[35vh] rounded-lg"
    >
      <LTileLayer
        :url="url"
        :attribution="attribution"
        layer-type="base"
        name="OpenStreetMap"
      />
      <LMarker :lat-lng="center" v-if="center" />
    </LMap>
  </div>
</template>
