<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all"
              :class="styles"
            >
              <DialogTitle
                as="h3"
                class="flex items-center rounded-t px-2 py-4 justify-center relative border-b-[1px] w-full"
              >
                <span
                  class="p-1 border-0 hover:opacity-70 transition absolute left-5"
                  @click="closeModal"
                >
                  <ModalCloseIcon
                    class="w-[18px] h-[18px] hover:opacity-80 cursor-pointer"
                  />
                </span>
                <span class="text-lg font-semibold">{{ title }}</span>
              </DialogTitle>
              <div class="p-6"><slot /></div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import ModalCloseIcon from "~/components/ui/icons/ModalCloseIcon.vue";
const emit = defineEmits<{
  close: [];
}>();

const { isOpen, title, styles } = defineProps<{
  isOpen?: boolean;
  title?: string;
  styles?: string;
}>();

function closeModal() {
  emit("close");
}
</script>
