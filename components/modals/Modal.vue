<template>
  <div
    class="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70"
  >
    <div
      class="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto"
    >
      <div
        :class="`
            translate
            duration-300
            h-full
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
          `"
      >
        <div
          class="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
        >
          <div
            class="flex items-center p-6 rounded-t justify-center relative border-b-[1px]"
          >
            <button
              class="p-1 border-0 hover:opacity-70 transition absolute left-9"
              @click="handleClose"
            >
              <!-- <IoMdClose size="18" /> -->
            </button>
            <div class="text-lg font-semibold">{{ title }}</div>
          </div>

          <div class="relative p-6 flex-auto">
            <slot name="body" />
          </div>

          <div class="flex flex-col gap-2 p-6">
            <div class="flex flex-row items-center gap-4 w-full">
              <Button
                v-if="secondaryActionLabel"
                :disabled="disabled"
                :label="secondaryActionLabel"
                @click="handleSecondaryAction"
                outline
              />
              <Button
                :disabled="disabled"
                :label="actionLabel"
                @click="emit('onSubmit')"
              />
            </div>
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits<{
  onClose: [];
  update: [];
  onSubmit: [];
  secondaryAction: [];
}>();

const { isOpen, title, actionLabel, disabled, secondaryActionLabel } =
  defineProps<{
    isOpen?: boolean;
    title?: string;
    actionLabel: string;
    disabled?: boolean;
    secondaryActionLabel?: string;
  }>();

const showModal = ref(isOpen);

const handleClose = () => {
  if (disabled) {
    return;
  }

  showModal.value = false;

  setTimeout(() => {
    emit("onClose");
  }, 300);
};

const handleSubmit = () => {
  emit("onSubmit");
};

const handleSecondaryAction = () => {
  if (disabled) return;

  emit("secondaryAction");
};
</script>
