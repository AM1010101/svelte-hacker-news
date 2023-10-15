<script>
  import '../app.css';
  import { onMount } from 'svelte';
  import { themeChange } from 'theme-change';
  import ThemeToggle from '../lib/Components/ThemeToggle.svelte';
  import Icon from '@iconify/svelte';

  // NOTE: the element that is using one of the theme attributes must be in the DOM on mount
  onMount(() => {
    themeChange(false);
  });
</script>

<div class="flex justify-between items-center p-2">
  <ThemeToggle themes={['light', 'hacker']} />
  <h1 class="text-3xl font-bold underline">
    <a href="/">HN Stories</a>
  </h1>
  <a href="/favourites">
    <button class="btn btn-accent">
      <Icon icon="mdi:favourite" />
    </button>
  </a>
</div>
<div class="scroll-auto overflow-y-auto max-h-screen">
  <slot />
</div>
