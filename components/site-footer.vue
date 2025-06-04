<template>
  <UFooter>
    <template #top>
      <UContainer class="text-left">
        <ULink
          class="text-highlighted font-bold text-xl"
          to="/"
        >
          封筒ツクール
        </ULink>
        <p class="mt-2 text-sm leading-7 text-(--ui-text-muted)">
          無料でお使いいただけるオープンソースの宛名・差出人入り封筒のA4印刷用PDFの作成ツール。
        </p>
      </UContainer>
    </template>
    <template #left>
      <div class="flex flex-col items-start space-y-4">
        <section>
          <header>
            <h2 class="font-semibold text-toned">
              Special thanks!
            </h2>
          </header>
          <div class="mt-2">
            <dl>
              <dt>
                <ULink
                  class="hover:underline"
                  to="https://pdfme.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  external
                  no-prefetch
                >
                  pdfme
                </ULink>
              </dt>
              <dd>PDF生成・プレビュー機能に使用</dd>
              <dt>
                <ULink
                  class="hover:underline"
                  to="https://origamijapan.net/jp/envelope-temp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  external
                  no-prefetch
                >
                  A4用紙とのりで作る封筒 テンプレート | 折り紙JAPAN
                </ULink>
              </dt>
              <dd>テンプレートPDFをサービス提供に使用</dd>
            </dl>
          </div>
        </section>
        <section>
          <header>
            <h2 class="font-semibold text-toned">
              ご案内
            </h2>
          </header>
          <div class="mt-2 text-sm leading-6 text-(--ui-text-muted)">
            <p>
              権利侵害のご申告、その他お問合せは X (旧 Twitter) または
              <ULink
                class="hover:underline"
                to="https://yk.works"
                target="_blank"
                rel="noopener noreferrer"
                external
                no-prefetch
              >こちらのお問い合わせフォーム<UIcon
                name="i-mdi-open-in-new"
                class="size-3"
              /></ULink>
              にお寄せください。
            </p>
            <p>
              バグ報告や機能提案は GitHub にお寄せください。
              なお、セキュリティ上の重大な問題については X (旧 Twitter) の DM または
              <ULink
                class="hover:underline"
                to="https://yk.works"
                target="_blank"
                rel="noopener noreferrer"
                external
                no-prefetch
              >こちらのお問い合わせフォーム<UIcon
                name="i-mdi-open-in-new"
                class="size-3"
              /></ULink>
              にてお知らせください。
            </p>
          </div>
        </section>
        <section>
          <header>
            <h2 class="font-semibold text-toned">
              免責
            </h2>
          </header>
          <div class="mt-2 text-sm leading-6 text-(--ui-text-muted)">
            <p>
              内容、機能等について細心の注意を払っておりますが、コンテンツの内容が正確であるかどうか、最新のものであるかどうか、安全なものであるか等について保証をするものではなく、何らの責任を負うものではありません。
              また、当方は通知することなく当サイトに掲載した情報の訂正、修正、追加、中断、削除等をいつでも行うことができるものとします。
              また、当サイト、またはコンテンツのご利用により、万一、ご利用者様に何らかの不都合や損害が発生したとしても、当方は何らの責任を負うものではありません。
            </p>
          </div>
        </section>
      </div>
    </template>
    <template #bottom>
      <SiteFooterBottom />
    </template>
  </UFooter>
</template>

<style lang="postcss" scoped>
dt {
  font-weight: bold;
}

dl,
dd {
  font-size: 0.9rem;
}

dd {
  color: var(--ui-text-muted);
  margin-bottom: 0.5em;
  margin-inline-start: 40px;
}
</style>
