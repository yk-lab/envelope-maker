<script lang="ts" setup></script>

<style lang="scss" scoped>
dt {
  font-weight: bold;
}

dl,
dd {
  font-size: 0.9rem;
}

dd {
  margin-bottom: 0.5em;
  margin-inline-start: 40px;
}
</style>

<template>
  <el-main>
    <NuxtPage />
  </el-main>
  <el-footer class="border-t border-gray-100">
    <div class="max-w-screen-xl px-4 py-12 mx-auto">
      <div>
        <a class="text-sm font-medium" href="/"> 封筒ツクール </a>
        <div class="mt-6 lg:flex lg:items-end lg:justify-between">
          <div>
            <p class="max-w-md leading-relaxed text-gray-500">
              無料でお使いいただけるオープンソースの宛名・差出人入り封筒のA4印刷用PDFの作成ツール。
            </p>
            <div class="mt-4 max-w-md leading-relaxed text-gray-500">
              <h2 class="font-bold">Special thanks!</h2>
              <dl>
                <dt>
                  <el-link
                    href="https://pdfme.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    pdfme
                  </el-link>
                </dt>
                <dd>PDF生成・プレビュー機能に使用</dd>
                <dt>
                  <el-link
                    href="https://origamijapan.net/jp/envelope-temp/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    折り紙JAPAN: A4用紙とのりで作る封筒 テンプレート
                  </el-link>
                </dt>
                <dd>テンプレートPDFをサービス提供に使用</dd>
              </dl>
            </div>
            <div class="flex gap-4 mt-4">
              <a
                href="https://twitter.com/YetAnother_yk/"
                rel="noopener noreferrer"
                target="_blank"
                class="hover:opacity-75"
              >
                <span class="sr-only"> Twitter </span>
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                  ></path>
                </svg>
              </a>
              <a
                href="https://github.com/yk-lab/envelope-maker"
                rel="noopener noreferrer"
                target="_blank"
                class="github-corner hover:opacity-75"
              >
                <span class="sr-only"> GitHub </span>
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    clip-rule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
          <p class="mt-4 text-sm text-gray-500 lg:mt-0">
            Created by
            <a
              href="https://twitter.com/YetAnother_yk/"
              rel="noopener noreferrer"
              target="_blank"
            >
              @YetAnother_yk
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  </el-footer>
</template>
