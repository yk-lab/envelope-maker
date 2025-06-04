<script lang="ts" setup>
interface Props {
  label: string;
  placeholder: string;
  minLength?: number;
  maxLength?: number;
  autocomplete?: string;
  hasLeading?: boolean;
  leadingText?: string;
}

withDefaults(defineProps<Props>(), {
  minLength: undefined,
  maxLength: undefined,
  autocomplete: undefined,
  hasLeading: false,
  leadingText: '',
});

const model = defineModel<string>({ required: true });
</script>

<template>
  <UFormField :label="label">
    <UInput
      v-model="model"
      :placeholder="placeholder"
      :minlength="minLength"
      :maxlength="maxLength"
      :autocomplete="autocomplete"
      class="w-full"
    >
      <template
        v-if="hasLeading"
        #leading
      >
        {{ leadingText }}
      </template>
    </UInput>
  </UFormField>
</template>
