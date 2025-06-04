<template>
  <UAlert
    color="warning"
    variant="subtle"
    title="印刷に関しての注意事項"
    icon="i-heroicons-exclamation-triangle-solid"
    role="alert"
    :ui="{
      title: 'text-yellow-700',
      icon: 'text-yellow-700',
      description: 'text-yellow-600 space-y-2',
    }"
  >
    <template #description>
      <p>
        印刷機・プリンターによっては文字化け等により正しく印刷できない場合がございますので予めご了承ください。
      </p>

      <dl>
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

      <p>
        なお、印刷結果についてお気軽にお寄せください。
      </p>
    </template>
  </UAlert>
</template>

<style lang="postcss" scoped>
dt {
  @apply font-bold;
}

dd {
  margin-bottom: 0.5em;
  margin-inline-start: 40px;
}
</style>
