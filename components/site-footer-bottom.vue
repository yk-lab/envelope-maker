<template>
  <UContainer class="flex flex-col md:flex-row justify-between items-center">
    <div class="flex gap-2 items-center">
      <UButton
        variant="ghost"
        color="neutral"
        icon="i-line-md-twitter-x"
        aria-label="X (旧Twitter)"
        to="https://twitter.com/YetAnother_yk/"
        target="_blank"
        rel="noopener noreferrer"
        external
        no-prefetch
      />
      <USeparator
        orientation="vertical"
        class="h-4"
      />
      <UButton
        variant="ghost"
        color="neutral"
        icon="i-line-md-github-loop"
        aria-label="GitHub"
        to="https://github.com/yk-lab/envelope-maker"
        target="_blank"
        rel="noopener noreferrer"
        external
        no-prefetch
      />
    </div>
    <div>
      <p class="text-(--ui-text-muted) text-sm">
        Created by
        <UButton
          variant="link"
          color="neutral"
          class="px-0"
          to="https://twitter.com/YetAnother_yk/"
          target="_blank"
          rel="noopener noreferrer"
          exact
        >
          @YetAnother_yk
        </UButton>
        .
      </p>
    </div>
  </UContainer>
</template>
