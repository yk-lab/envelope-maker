<template>
  <UModal
    v-model:open="isOpen"
    :title="`住所録 ${isEdit ? '更新' : '登録'}`"
    :ui="{
      footer: 'justify-end',
    }"
  >
    <template #body>
      <UForm
        ref="form"
        class="space-y-4"
        :state="formState"
        :validate="validate"
        @submit="onSubmit"
      >
        <div class="space-y-4">
          <UFormField
            label="登録名"
            name="name"
            required
          >
            <UInput
              v-model="formState.name"
              class="w-full"
              placeholder="例: 自宅、会社、実家"
              autofocus
            />
          </UFormField>

          <UAlert
            v-if="!editEntry"
            icon="i-mdi-information"
            color="primary"
            variant="subtle"
            title="登録内容"
          >
            <template #description>
              <div class="space-y-1 text-sm">
                <p v-if="getZipcode(data)">
                  〒{{ getZipcode(data) }}
                </p>
                <p v-if="getAddress1(data)">
                  {{ getAddress1(data) }}
                  {{ getAddress2(data) }}
                </p>
                <p v-if="getAffiliation1(data)">
                  {{ getAffiliation1(data) }}
                  {{ getAffiliation2(data) }}
                </p>
                <p
                  v-if="getName(data)"
                  class="font-medium"
                >
                  {{ getName(data) }}
                  {{ getHonorific(data) }}
                </p>
              </div>
            </template>
          </UAlert>
        </div>
      </UForm>
    </template>
    <template #footer>
      <UButton
        color="neutral"
        variant="ghost"
        @click="isOpen = false"
      >
        キャンセル
      </UButton>
      <UButton
        :loading="isSubmitting"
        @click="() => form?.submit()"
      >
        {{ isEdit ? '更新' : '登録' }}
      </UButton>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types';
import type { AddressEntry } from '~/composables/address-book';
import type { DestForm, SenderForm } from '~/scripts/forms/schema';

interface Props {
  type: 'destination' | 'sender';
  data: Partial<DestForm> | Partial<SenderForm>;
  editEntry?: AddressEntry | null;
}

interface FormState {
  name: string;
}

const toast = useToast();

const props = defineProps<Props>();
const emit = defineEmits<{
  registered: [entry: AddressEntry];
}>();

const { addEntry, updateEntry } = useAddressBook();

const isOpen = defineModel<boolean>({ required: true, default: false });
const form = useTemplateRef('form');

const isEdit = computed(() => !!props.editEntry);
const isSubmitting = ref(false);

const formState = reactive<FormState>({
  name: '',
});

// 編集モード時の初期値設定
watch(() => props.editEntry, (entry) => {
  if (entry) {
    formState.name = entry.name;
  }
}, { immediate: true });

// モーダルが閉じたときにフォームをリセット（編集モード以外）
watch(isOpen, (value) => {
  if (!value && !isEdit.value) {
    formState.name = '';
  }
});

const validate = (state: FormState) => {
  const errors = [];

  if (!state.name?.trim()) {
    errors.push({
      name: 'name',
      message: '登録名を入力してください',
    });
  }

  return errors;
};

const onSubmit = async (event: FormSubmitEvent<FormState>) => {
  isSubmitting.value = true;

  try {
    let entry: AddressEntry;

    if (isEdit.value && props.editEntry) {
      // 更新
      const _entry = updateEntry(props.editEntry.id, {
        name: event.data.name.trim(),
      });
      if (!_entry) {
        toast.add({
          title: '更新に失敗しました',
          description: '住所録の更新中にエラーが発生しました。もう一度お試しください。',
          icon: 'i-mdi-alert',
          color: 'error',
        });
        return;
      }
      entry = _entry;
    }
    else {
      // 新規登録
      try {
        entry = addEntry(
          event.data.name.trim(),
          props.type,
          props.data,
        );
      }
      catch (error) {
        console.error('住所録の登録中にエラーが発生しました:', error);
        toast.add({
          title: '登録に失敗しました',
          description: '住所録の登録中にエラーが発生しました。もう一度お試しください。',
          icon: 'i-mdi-alert',
          color: 'error',
        });
        return;
      }
    }

    emit('registered', entry);
    isOpen.value = false;

    // 成功通知
    toast.add({
      title: isEdit.value ? '更新しました' : '登録しました',
      description: `「${event.data.name}」を住所録に${isEdit.value ? '更新' : '登録'}しました`,
      icon: 'i-mdi-check-circle',
      color: 'success',
    });
  }
  catch (error) {
    console.error('住所録の操作中にエラーが発生しました:', error);
    toast.add({
      title: '操作に失敗しました',
      description: error instanceof Error ? error.message : '住所録の操作中にエラーが発生しました。もう一度お試しください。',
      icon: 'i-mdi-alert',
      color: 'error',
    });
  }
  finally {
    isSubmitting.value = false;
  }
};
</script>
