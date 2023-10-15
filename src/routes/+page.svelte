<script lang="ts">
  import HnStory from '../lib/Components/HnStory.svelte';
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import ThemeToggle from '../lib/Components/ThemeToggle.svelte';

  let paginationSive = 50;
  let itemsToLoad = 50;

  function loadMore() {
    itemsToLoad += paginationSive;
  }

  let hnPromise = fetch(
    'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
  )
    .then((res) => res.json())
    .then((data) => {
      console.log('data', data);
      return data;
    })
    .catch((err) => {
      console.log('err', err);
    });
</script>

<div class="flex justify-between items-center p-2">
  <h1 class="text-3xl font-bold underline">Hacker News App!</h1>
  <ThemeToggle themes={['light', 'hacker']} />
</div>

<div class="items-center w-full">
  {#await hnPromise}
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
