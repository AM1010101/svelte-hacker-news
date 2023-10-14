<script>
  import { onMount } from 'svelte';
  import { themeChange } from 'theme-change';

  // NOTE: the element that is using one of the theme attributes must be in the DOM on mount
  onMount(() => {
    themeChange(false);
  });
</script>

<input
  class="toggle toggle-primary"
  type="checkbox"
  data-toggle-theme="light,hacker"
  data-act-class="ACTIVECLASS"
/>
