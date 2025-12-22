<template>
  <teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center"
      @keydown.esc.prevent="emitClose"
    >
      <div
        class="absolute inset-0 bg-black/40"
        @click="emitClose"
        aria-hidden="true"
      />

      <div
        ref="panel"
        class="relative w-[min(1320px,96vw)] h-[min(820px,92vh)] overflow-hidden rounded-[28px] bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        :aria-label="ariaLabel"
        @click.stop
      >
        <slot />
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from "vue";

const props = defineProps({
  open: { type: Boolean, required: true },
  ariaLabel: { type: String, default: "Modal" },
});

const emit = defineEmits(["close"]);
const panel = ref(null);

function emitClose() {
  emit("close");
}

let lastActive = null;

function focusFirst() {
  const root = panel.value;
  if (!root) return;

  const focusables = root.querySelectorAll(
    'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
  );
  const first = focusables[0];
  (first || root).focus?.();
}

function trapTab(e) {
  if (e.key !== "Tab") return;
  const root = panel.value;
  if (!root) return;

  const focusables = Array.from(
    root.querySelectorAll(
      'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
    )
  ).filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
  );

  if (focusables.length === 0) return;

  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

watch(
  () => props.open,
  async (val) => {
    if (val) {
      lastActive = document.activeElement;
      await nextTick();
      focusFirst();
      document.addEventListener("keydown", trapTab);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", trapTab);
      document.body.style.overflow = "";
      lastActive?.focus?.();
      lastActive = null;
    }
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  document.removeEventListener("keydown", trapTab);
  document.body.style.overflow = "";
});
</script>
