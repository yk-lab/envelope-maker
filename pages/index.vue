<script lang="ts" setup>
import { RefreshLeft } from "@element-plus/icons-vue";
import { Template, generate } from "@pdfme/generator";
import { Viewer } from "@pdfme/ui";
import { schema as envelopeVSchema } from "~/scripts/pdf_schemas/envelope-v";
import {
  DestForm,
  SenderForm,
  defaultDest,
  defaultSender,
} from "~/scripts/forms/schema";

const font = {
  noto_sans_jp: {
    data: await fetch("/fonts/NotoSansJP-Regular.otf").then((res) =>
      res.arrayBuffer()
    ),
    fallback: true,
    subset: false,
  },
};

const previewContainer = ref<HTMLElement>();

const form = ref<DestForm & SenderForm>({
  ...defaultDest(),
  ...defaultSender(),
});

const resetDest = () => {
  form.value = { ...form.value, ...defaultDest() };
};

const resetSender = () => {
  form.value = { ...form.value, ...defaultSender() };
};

const convertFormToTemplateInput = () => {
  const data: Omit<DestForm & SenderForm, "destZipcode" | "destHonorific"> & {
    destZipcode?: string;
    destHonorific?: string;
  } = { ...form.value };

  const destZipcode = data.destZipcode?.replace("-", "") ?? "";
  data.destName += ` ${data?.destHonorific ?? ""}`;
  delete data.destZipcode;
  delete data.destHonorific;

  const destZipcode1 = destZipcode.substring(0, 3);
  const destZipcode2 = destZipcode.substring(3, 7);
  data.senderZipcode =
    data.senderZipcode.length > 0
      ? `〒${data.senderZipcode}`
      : data.senderZipcode;

  return { ...data, destZipcode1, destZipcode2 };
};

const inputs = computed(() => [convertFormToTemplateInput()]);

const template = computed(async (): Promise<Template> => {
  const _inputs = [...inputs.value];
  const outputDestPosition = _inputs[0].destPosition.length > 0;
  const useDestAffiliation =
    _inputs[0].destAffiliation1.length > 0 ||
    _inputs[0].destAffiliation2.length > 0;
  const useSenderAffiliation =
    _inputs[0].senderAffiliation1.length > 0 ||
    _inputs[0].senderAffiliation2.length > 0;

  return {
    basePdf: await fetch("/template_pdf/envelope-v.pdf").then(async (res) =>
      // res.arrayBuffer()
      URL.createObjectURL(await res.blob())
    ),
    schemas: envelopeVSchema({
      outputDestPosition,
      useDestAffiliation,
      useSenderAffiliation,
    }).schemas,
  };
});

onMounted(() => {
  template.value.then((temp) => {
    const viewer = new Viewer({
      domContainer: previewContainer.value!,
      template: temp,
      inputs: inputs.value,
      options: {
        font,
        lang: "ja",
      },
    });
    watch(inputs, (inputs) => {
      viewer.setInputs(inputs);
    });
    watch(template, (template) => {
      template.then((temp) => {
        viewer.updateTemplate(temp);
      });
    });
  });
});

const createPdf = async () => {
  template.value.then((template) => {
    generate({
      template,
      inputs: inputs.value,
      options: { font },
    }).then((pdf) => {
      console.log(pdf);

      // Browser
      const blob = new Blob([pdf.buffer], { type: "application/pdf" });
      window.open(URL.createObjectURL(blob));
    });
  });
};
</script>

<style lang="scss" scoped>
.pdf-preview:deep(.selectable) {
  transform-origin: 5% 80% 0;
  transform: rotate(-25deg);
}
</style>

<template>
  <hero-header />

  <div class="max-w-screen-xl px-4 py-12 mx-auto flex gap-3">
    <div class="flex-shrink">
      <el-form :model="form" label-position="top">
        <el-form-item>
          <h2 class="text-lg">宛先</h2>
        </el-form-item>

        <dest-form-items :form="form" />

        <el-form-item>
          <h2 class="text-lg">差出人</h2>
        </el-form-item>

        <sender-form-items :form="form" />

        <div>
          <el-button type="primary" @click="createPdf"
            >封筒を作成する</el-button
          >
          <el-button type="warning" @click="resetDest" :icon="RefreshLeft">
            宛先をリセット
          </el-button>
          <el-button type="warning" @click="resetSender" :icon="RefreshLeft">
            差出人をリセット
          </el-button>
        </div>
      </el-form>
      <div class="mt-4">
        <p class="text-sm">
          PDFの印刷方法や作り方、完成した封筒のサイズ感はテンプレート提供者様のサイトをご確認ください。
        </p>
        <el-link
          type="primary"
          href="https://origamijapan.net/jp/envelope-temp/"
          target="_blank"
          rel="noopener noreferrer"
        >
          折り紙JAPAN: A4用紙とのりで作る封筒 テンプレート
        </el-link>
      </div>
    </div>
    <div class="flex-grow hidden sm:block">
      <aside ref="previewContainer" class="pdf-preview"></aside>
    </div>
  </div>
</template>
