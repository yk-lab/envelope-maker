<script lang="ts" setup>
import type { WebApplication, WithContext } from 'schema-dts';
import type { DestForm, SenderForm } from '~/scripts/forms/schema';
import { defaultDest, defaultSender } from '~/scripts/forms/schema';
import { schema as envelopeVSchema } from '~/scripts/pdf_schemas/envelope-v';
import { calculateSchemaOptions, resetDestForm, resetSenderForm } from '~/utils/form-helpers';

const config = useRuntimeConfig();
const { generateAndOpenPdf } = usePdfGenerator();
const { getFormDefaults } = useQueryParams();

useJsonld((): WithContext<WebApplication> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': config.public.title,
    'description': config.public.description,
    'url': 'https://envelope-maker.yk.works/',
  };
});

const form = ref<DestForm & SenderForm>({
  ...defaultDest(),
  ...defaultSender(),
  ...getFormDefaults(),
});

const resetDest = () => {
  form.value = resetDestForm(form.value);
};

const resetSender = () => {
  form.value = resetSenderForm(form.value);
};

const schemas = computed(() => {
  const schemaOptions = calculateSchemaOptions(form.value);
  return envelopeVSchema(schemaOptions);
});

const createPdf = async () => {
  await generateAndOpenPdf(form.value, schemas.value);
};

const { isCompactMode } = useScreenSize();

const isShareModalOpen = ref(false);
</script>

<template>
  <div>
    <hero-header />

    <div class="max-w-screen-xl py-12 mx-auto">
      <div class="flex justify-end mb-4">
        <UButton
          type="button"
          variant="outline"
          icon="i-mdi-share-variant"
          @click="isShareModalOpen = true"
        >
          URLを共有
        </UButton>
      </div>

      <div class="flex gap-3">
        <div class="flex-shrink max-w-[480px] flex flex-col gap-4">
          <lazy-envelope-form
            v-model="form"
            :create-pdf="createPdf"
            :reset-dest="resetDest"
            :reset-sender="resetSender"
          />

          <div class="mt-4">
            <p class="text-sm">
              PDFの印刷方法や作り方、完成した封筒のサイズ感は折り紙JAPAN様のサイトをご確認ください。
            </p>
            <UButton
              variant="link"
              trailing-icon="i-mdi-open-in-new"
              to="https://origamijapan.net/jp/envelope-temp/"
              target="_blank"
              rel="noopener noreferrer"
              external
            >
              A4用紙とのりで作る封筒 テンプレート | 折り紙JAPAN
            </UButton>
          </div>

          <print-disclaimer />
        </div>
        <div
          v-if="!isCompactMode"
          class="flex-grow hidden sm:block"
        >
          <div class="sticky h-fit top-0 max-h-screen">
            <suspense>
              <lazy-pdf-preview
                :schemas="schemas"
                :form-data="form"
              />
              <template #fallback>
                Loading...
              </template>
            </suspense>
          </div>
        </div>
      </div>
    </div>

    <UCard>
      <template #header>
        <h2 class="text-base font-semibold text-highlighted">
          URLを共有
        </h2>
      </template>

      <share-url
        :form-data="form"
      />
    </UCard>

    <lazy-share-url-modal
      v-model:open="isShareModalOpen"
      :form-data="form"
    />
  </div>
</template>
