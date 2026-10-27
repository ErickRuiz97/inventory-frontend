<script setup>
const author = {
  name: 'joaquin_n6',
  github: 'https://github.com/joaquinn6',
  linkedin: 'https://www.linkedin.com/in/joaquin-n6/',
}

const collaborators = [
  { name: 'ErickRuiz97', github: 'https://github.com/ErickRuiz97' },
  { name: 'jonathan-code-95', github: 'https://github.com/jonathan-code-95' },
]

const githubIcon =
  'M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z'
const linkedinIcon =
  'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z'
</script>
<template>
  <div class="footer-app">
    <a :href="author.github" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24" class="footer-icon">
        <path :d="githubIcon" />
      </svg>
      {{ $t('footer.createdBy', { name: author.name }) }}
    </a>
    <a :href="author.linkedin" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24" class="footer-icon">
        <path :d="linkedinIcon" />
      </svg>
      {{ $t('footer.contact') }}
    </a>
    <span class="footer-separator">|</span>
    <span class="text-muted">{{ $t('footer.collaborators') }}:</span>
    <a
      v-for="collaborator in collaborators"
      :key="collaborator.name"
      :href="collaborator.github"
      target="_blank"
      rel="noopener"
    >
      <svg viewBox="0 0 24 24" class="footer-icon">
        <path :d="githubIcon" />
      </svg>
      {{ collaborator.name }}
    </a>
  </div>
</template>
<style scoped>
.footer-app {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 4px 16px;
  font-size: 12px;
}
.footer-app a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--ep-color-primary);
  text-decoration: none;
}
.footer-app a:hover {
  text-decoration: underline;
}
.footer-icon {
  width: 14px;
  height: 14px;
  fill: currentColor;
}
.footer-separator {
  color: #c4c8d6;
}
</style>
