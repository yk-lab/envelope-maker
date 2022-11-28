<script lang="ts" setup>
import { SenderForm } from "~/scripts/forms/schema";

interface Props {
  form: SenderForm & { [key: string]: string };
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <el-form-item label="郵便番号">
    <el-input
      v-model="form.senderZipcode"
      autocomplete="postal-code"
      placeholder="差出人の郵便番号をハイフン込みで入力してください"
      :minlength="8"
      :maxlength="8"
    >
      <template #prefix> 〒 </template>
    </el-input>
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
</template>
