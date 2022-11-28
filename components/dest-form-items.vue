<script lang="ts" setup>
import { DestForm } from "~/scripts/forms/schema";

interface Props {
  form: DestForm & { [key: string]: string };
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <el-form-item label="郵便番号">
    <el-input
      v-model="form.destZipcode"
      placeholder="お届け先の郵便番号をハイフン込みで入力してください"
      :minlength="8"
      :maxlength="8"
    >
      <template #prefix> 〒 </template>
    </el-input>
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
      <el-radio-button label="">（なし）</el-radio-button>
      <el-radio-button label="様" />
      <el-radio-button label="御中" />
      <el-radio-button label="行" />
    </el-radio-group>
  </el-form-item>
</template>
