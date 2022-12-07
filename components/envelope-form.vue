<script lang="ts" setup>
import { RefreshLeft } from "@element-plus/icons-vue";
import {
  DestForm,
  SenderForm,
} from "~/scripts/forms/schema";

interface Props {
  form: DestForm & SenderForm;
  createPdf: () => void;
  resetDest: () => void;
  resetSender: () => void;
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <el-form :model="form" label-position="top">
    <el-form-item>
      <h2 class="text-lg">宛先</h2>
    </el-form-item>

    <lazy-dest-form-items :form="form" />

    <el-form-item>
      <h2 class="text-lg">差出人</h2>
    </el-form-item>

    <lazy-sender-form-items :form="form" />

    <div>
      <el-button type="primary" @click="createPdf"> 封筒を作成する </el-button>
      <el-button type="warning" @click="resetDest" :icon="RefreshLeft">
        宛先をリセット
      </el-button>
      <el-button type="warning" @click="resetSender" :icon="RefreshLeft">
        差出人をリセット
      </el-button>
    </div>
  </el-form>
</template>
