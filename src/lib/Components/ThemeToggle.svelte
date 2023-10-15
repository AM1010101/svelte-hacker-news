<script lang="ts">
  import { onMount } from 'svelte';
  export let themes = ['light', 'hacker'];

  let theme: string | null;
  let themeString = themes.join(',');

  // NOTE: the element that is using one of the theme attributes must be in the DOM on mount
  onMount(() => {
    theme = localStorage.getItem('theme');
  });
</script>

<input
  class="toggle toggle-primary"
  type="checkbox"
  checked={theme === themes[1]}
  data-toggle-theme={themeString}
  data-act-class="ACTIVECLASS"
/>
