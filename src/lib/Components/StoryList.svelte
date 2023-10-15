<script lang="ts">
  import HnStory from './HnStory.svelte';
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  export let itemsToLoad: number = 50;
  export let paginationSive: number = 50;
  export let hn: number[] = [];
</script>

<ul class="m-2">
  {#each hn as storyId, i (storyId)}
    {#if i < itemsToLoad}
      <li
        in:fly={{
          y: 500,
          duration: 300,
          delay: (i - itemsToLoad + paginationSive) * 50,
          easing: cubicOut,
        }}
        class="mb-2"
      >
        <HnStory {storyId} />
      </li>
    {/if}
  {/each}
</ul>
