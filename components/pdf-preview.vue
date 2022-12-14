<script lang="ts" setup>
import { Template, Font } from "@pdfme/common";

const previewContainer = ref<HTMLElement>();
const preparingPreview = ref();

interface Props {
  template: Promise<Template>;
  inputs: Record<string, string>[];
  font: Promise<Font>;
}

const props = withDefaults(defineProps<Props>(), {});

onMounted(() => {
  const requestIdleCallback = window?.requestIdleCallback ?? window.setTimeout;

  preparingPreview.value = true;
  requestIdleCallback(async () => {
    const { Viewer } = await import("@pdfme/ui");
    props.template.then(async (temp) => {
      const viewer = new Viewer({
        domContainer: previewContainer.value!,
        template: temp,
        inputs: props.inputs,
        options: {
          font: await props.font,
          lang: "ja",
        },
      });
      const { inputs, template } = toRefs(props);
      watch(inputs, (inputs) => {
        viewer.setInputs(inputs);
      });
      watch(template, (template) => {
        template.then((temp) => {
          viewer.updateTemplate(temp);
        });
      });
    });
    preparingPreview.value = false;
  });
});
</script>

<style lang="scss" scoped>
.pdf-preview:deep(.selectable) {
  transform-origin: 5% 80% 0;
  transform: rotate(-25deg);
}
</style>

<template>
  <aside
    ref="previewContainer"
    v-loading="preparingPreview"
    class="pdf-preview"
  ></aside>
</template>
