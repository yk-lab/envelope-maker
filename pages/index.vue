<script lang="ts" setup>
import { WarnTriangleFilled } from "@element-plus/icons-vue";
import { Template, Font } from "@pdfme/common";
import { schema as envelopeVSchema } from "~/scripts/pdf_schemas/envelope-v";
import {
  DestForm,
  SenderForm,
  defaultDest,
  defaultSender,
} from "~/scripts/forms/schema";

const cachedFont = ref<Font>();
const font = ref(
  new Promise<Font>(async (resolve) => {
    if (!cachedFont.value) {
      cachedFont.value = {
        "Noto Sans JP": {
          data: await fetch("/fonts/NotoSansJP-Regular.otf").then((res) =>
            res.arrayBuffer()
          ),
          fallback: true,
          subset: false,
        },
      };
    }
    resolve(cachedFont.value!);
  })
);

const cachedTemplatePDF = ref<string>();
const templatePDF = ref(
  new Promise<string>(async (resolve) => {
    if (!cachedTemplatePDF.value) {
      cachedTemplatePDF.value = await fetch(
        "/template_pdf/envelope-v.pdf"
      ).then(async (res) => URL.createObjectURL(await res.blob()));
    }
    resolve(cachedTemplatePDF.value!);
  })
);

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
    basePdf: await templatePDF.value,
    schemas: envelopeVSchema({
      outputDestPosition,
      useDestAffiliation,
      useSenderAffiliation,
    }).schemas,
  };
});

const createPdf = async () => {
  const { generate } = await import("@pdfme/generator");
  template.value.then(async (template) => {
    generate({
      template,
      inputs: inputs.value,
      options: { font: await font.value },
    }).then((pdf) => {
      console.log(pdf);
      // Browser
      const blob = new Blob([pdf.buffer], { type: "application/pdf" });
      window.open(URL.createObjectURL(blob));
    });
  });
};

useHead({
  title: "封筒ツクール",
  meta: [
    {
      hid: "description",
      name: "description",
      content:
        "どなたでも無料でお使いいただけるオープンソースの宛名・差出人入り封筒のA4サイズ印刷用PDFの作成ツールです。PDFはブラウザ上で作成するため、住所・名前などの情報はインターネット上に送信されないので安心してお使いいただけます。出来上がりはA4用紙を三つ折りで入れることができるサイズです。",
    },
  ],
});
</script>

<style lang="scss" scoped>
dt {
  @apply font-bold;
}

dd {
  margin-bottom: 0.5em;
  margin-inline-start: 40px;
}
</style>

<template>
  <hero-header />

  <div class="max-w-screen-xl py-12 mx-auto flex gap-3">
    <div class="flex-shrink max-w-[480px]">
      <lazy-envelope-form
        :form="form"
        :create-pdf="createPdf"
        :reset-dest="resetDest"
        :reset-sender="resetSender"
      />

      <div class="mt-4">
        <p class="text-sm">
          PDFの印刷方法や作り方、完成した封筒のサイズ感は折り紙JAPAN様のサイトをご確認ください。
        </p>
        <el-link
          type="primary"
          href="https://origamijapan.net/jp/envelope-temp/"
          target="_blank"
          rel="noopener noreferrer"
        >
          A4用紙とのりで作る封筒 テンプレート | 折り紙JAPAN
        </el-link>
      </div>

      <div
        role="alert"
        class="mt-4 rounded border-l-4 border-yellow-500 bg-yellow-50 p-4"
      >
        <strong class="block font-blod text-yellow-700">
          <el-icon><WarnTriangleFilled /></el-icon>印刷に関しての注意事項
        </strong>

        <p class="mt-2 text-sm text-yellow-700">
          印刷機・プリンターによっては文字化け等により正しく印刷できない場合がございますので予めご了承ください。
        </p>

        <dl class="mt-2 text-sm text-yellow-700">
          <dt>コンビニエンスストアのマルチプリンタ</dt>
          <dd>
            <dl>
              <dt>セブン-イレブン（富士フィルム社製）</dt>
              <dd>問題なく印刷できました</dd>
              <dt>セイコーマート（京セラ社製）</dt>
              <dd>
                プレビュー表示では正しく表示されますが、印刷物は文字化けしたものが出力されました
              </dd>
            </dl>
          </dd>
        </dl>

        <p class="mt-2 text-sm text-yellow-700">
          なお、印刷結果についてお気軽にお寄せください。
        </p>
      </div>
    </div>
    <div class="flex-grow hidden sm:block">
      <div class="sticky h-fit top-0 max-h-screen">
        <suspense>
          <template #default>
            <lazy-pdf-preview
              :template="template"
              :inputs="inputs"
              :font="font"
            />
          </template>
          <template #fallback> Loading... </template>
        </suspense>
      </div>
    </div>
  </div>
</template>
