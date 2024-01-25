<script setup lang="ts">
import PhotoPlusIcon from "~/components/ui/icons/PhotoPlusIcon.vue";

const { value } = defineProps<{
  value: string;
}>();

const emit = defineEmits(["change"]);

const imgSrc = ref("");
const uploadTest = ref("uw-test");

interface SuccessResponse {
  value: {
    event: "success";
    info: {
      secure_url: string;
    };
  };
}

interface ErrorResponse {
  value: {
    event: "error";
    error: {
      message: string;
    };
  };
}

type Response = SuccessResponse | ErrorResponse;

const handleUpload = (res: Response) => {
  if (res.value.event === "success") {
    imgSrc.value = res.value?.info?.secure_url;
    emit("change", imgSrc.value);
  }
};
</script>

<template>
  <CldUploadWidget
    v-slot="{ open }"
    :uploadPreset="uploadTest"
    :options="{ maxFiles: 1 }"
    @upload="handleUpload"
  >
    <div
      @click="open"
      class="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
    >
      <PhotoPlusIcon class="w-[50px] h-[50px]" />
      <div class="font-semibold text-lg">Click to upload</div>

      <div v-if="imgSrc" class="absolute inset-0 w-full h-full">
        <NuxtImg
          class="object-cover inset-0 w-full h-full absolute text-transparent"
          :src="imgSrc"
        />
      </div>
    </div>
  </CldUploadWidget>
</template>
