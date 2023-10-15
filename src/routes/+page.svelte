<script lang="ts">
  import HnStory from '../lib/Components/HnStory.svelte';
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import ThemeToggle from '../lib/Components/ThemeToggle.svelte';
  import {
    hnTopStorys,
    hnAskStorys,
    hnShowStorys,
    hnJobStorys,
    hnNewStorys,
  } from '../lib/Components/hnPromise';

  let paginationSive = 50;
  let itemsToLoad = 50;
  function loadMore() {
    itemsToLoad += paginationSive;
  }

  let category = hnTopStorys;
  let categories = ['Top', 'Ask', 'Show', 'Jobs', 'New'];
  let selectedCategory = 'Top';

  let categoryFunctions: any = {
    Top: hnTopStorys,
    Ask: hnAskStorys,
    Show: hnShowStorys,
    Jobs: hnJobStorys,
    New: hnNewStorys,
  };

  $: {
    category = categoryFunctions[selectedCategory] || hnTopStorys;
  }
</script>

<div class="flex justify-between items-center p-2">
  <h1 class="text-3xl font-bold underline">HN Stories</h1>
  <ThemeToggle themes={['light', 'hacker']} />
</div>

<div class="flex flex-row tabs flex-1 justify-evenly">
  {#each categories as category (category)}
    <button
      class="tab tab-lifted flex-1 {selectedCategory === category
        ? 'tab-active'
        : ''}"
      on:click={() => (selectedCategory = category)}
    >
      {category}
    </button>
  {/each}
</div>

<div class="items-center w-full">
  {#await category}
    <span class="loading loading-infinity loading-md" />
  {:then hn}
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
  {:catch error}
    <p>{error.message}</p>
  {/await}

  <div class="p-2 pt-0">
    <button
      class="btn btn-primary w-full"
      on:click={loadMore}
      disabled={itemsToLoad > 500}>Give me more Story</button
    >
  </div>
</div>
