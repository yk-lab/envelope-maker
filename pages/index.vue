<script lang="ts" setup>
import { Template, generate } from "@pdfme/generator";
import { schema as envelopeVSchema } from "~/scripts/pdf_schemas/envelope-v";
import {
  ElCol,
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElRadioGroup,
  ElRadio,
} from "element-plus";

type DestForm = {
  destZipcode: string;
  destAddress1: string;
  destAddress2: string;
  destAffiliation1: string;
  destAffiliation2: string;
  destPosition: string;
  destName: string;
  destHonorific: string;
};

type SenderForm = {
  senderZipcode: string;
  senderAddress1: string;
  senderAddress2: string;
  senderAffiliation1: string;
  senderAffiliation2: string;
  senderName: string;
};

const defaultDest: DestForm = {
  destZipcode: "",
  destAddress1: "",
  destAddress2: "",
  destAffiliation1: "",
  destAffiliation2: "",
  destPosition: "",
  destName: "",
  destHonorific: "様",
};
const defaultSender: SenderForm = {
  senderZipcode: "",
  senderAddress1: "",
  senderAddress2: "",
  senderAffiliation1: "",
  senderAffiliation2: "",
  senderName: "",
};

const form = ref<DestForm & SenderForm>({ ...defaultDest, ...defaultSender });

const resetDest = () => {
  form.value = { ...form.value, ...defaultDest };
};

const resetSender = () => {
  form.value = { ...form.value, ...defaultSender };
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

  return { ...data, destZipcode1, destZipcode2 };
};

const createPdf = async () => {
  const font = {
    noto_sans_jp: {
      data: await fetch("/fonts/NotoSansJP-Regular.otf").then((res) =>
        res.arrayBuffer()
      ),
      fallback: true,
      subset: false,
    },
  };
  const inputs = [convertFormToTemplateInput()];

  const outputDestPosition = inputs[0].destPosition.length > 0;
  const useDestAffiliation =
    inputs[0].destAffiliation1.length > 0 ||
    inputs[0].destAffiliation2.length > 0;
  const useSenderAffiliation =
    inputs[0].senderAffiliation1.length > 0 ||
    inputs[0].senderAffiliation2.length > 0;

  const template: Template = {
    basePdf: await fetch("/template_pdf/envelope-v.pdf").then((res) =>
      res.arrayBuffer()
    ),
    schemas: envelopeVSchema({
      outputDestPosition,
      useDestAffiliation,
      useSenderAffiliation,
    }).schemas,
  };

  generate({ template, inputs, options: { font } }).then((pdf) => {
    console.log(pdf);

    // Browser
    const blob = new Blob([pdf.buffer], { type: "application/pdf" });
    window.open(URL.createObjectURL(blob));
  });
};
</script>

<template>
  <el-form :model="form" label-position="top">
    <el-form-item>
      <h2>宛先</h2>
    </el-form-item>
    <el-form-item label="郵便番号">
      <el-input
        v-model="form.destZipcode"
        placeholder="お届け先の郵便番号をハイフン込みで入力してください"
        :minlength="8"
        :maxlength="8"
      />
    </el-form-item>
    <el-form-item label="住所（１行目）">
      <el-input
        v-model="form.destAddress1"
        placeholder="お届け先の住所（１行目）を入力してください"
      />
    </el-form-item>
    <el-form-item label="住所（２行目・マンション名等）">
      <el-input
        v-model="form.destAddress2"
        placeholder="お届け先の住所（２行目）を入力してください"
      />
    </el-form-item>
    <el-form-item label="会社名等">
      <el-input
        v-model="form.destAffiliation1"
        placeholder="必要であればお届け先の会社名等を入力してください"
      />
    </el-form-item>
    <el-form-item label="部署名等">
      <el-input
        v-model="form.destAffiliation2"
        placeholder="必要であればお届け先の部署名等を入力してください"
      />
    </el-form-item>
    <el-form-item label="役職等">
      <el-input
        v-model="form.destPosition"
        placeholder="必要であればお届け先の相手様の役職を入力してください"
      />
    </el-form-item>
    <el-form-item label="お名前">
      <el-input
        v-model="form.destName"
        placeholder="お届け先のお名前を入力してください"
      />
    </el-form-item>
    <el-form-item label="敬称">
      <el-radio-group v-model="form.destHonorific">
        <el-radio label="様" />
        <el-radio label="御中" />
      </el-radio-group>
    </el-form-item>

    <el-form-item>
      <h2>差出人</h2>
    </el-form-item>
    <el-form-item label="郵便番号">
      <el-input
        v-model="form.senderZipcode"
        autocomplete="postal-code"
        placeholder="差出人の郵便番号をハイフン込みで入力してください"
        :minlength="8"
        :maxlength="8"
      />
    </el-form-item>
    <el-form-item label="住所（１行目）">
      <el-input
        v-model="form.senderAddress1"
        autocomplete="address-line1"
        placeholder="差出人の住所（１行目）を入力してください"
      />
    </el-form-item>
    <el-form-item label="住所（２行目・マンション名等）">
      <el-input
        v-model="form.senderAddress2"
        autocomplete="address-line2"
        placeholder="差出人の住所（２行目）を入力してください"
      />
    </el-form-item>
    <el-form-item label="会社名等">
      <el-input
        v-model="form.senderAffiliation1"
        autocomplete="organization"
        placeholder="必要であれば差出人の会社名等を入力してください"
      />
    </el-form-item>
    <el-form-item label="部署名等">
      <el-input
        v-model="form.senderAffiliation2"
        placeholder="必要であれば差出人の部署名等を入力してください"
      />
    </el-form-item>
    <el-form-item label="お名前">
      <el-input
        v-model="form.senderName"
        autocomplete="name"
        placeholder="差出人のお名前を入力してください"
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="createPdf">封筒を作成する</el-button>
      <el-button type="warning" @click="resetDest">宛先をリセット</el-button>
      <el-button type="warning" @click="resetSender">
        差出人をリセット
      </el-button>
    </el-form-item>
  </el-form>
</template>
