<script lang="ts">
  import { onMount } from 'svelte';
  import { themeChange } from 'theme-change';
  export let themes = ['light', 'dark'];

  let theme: string | null;
  let themeString = themes.join(',');

  // NOTE: the element that is using one of the theme attributes must be in the DOM on mount
  onMount(() => {
    themeChange(false);
    theme = localStorage.getItem('theme');
    console.log('theme', theme);
  });
</script>

<input
  class="toggle toggle-primary"
  type="checkbox"
  checked={theme === themes[1]}
  data-toggle-theme={themeString}
  data-act-class="ACTIVECLASS"
/>
