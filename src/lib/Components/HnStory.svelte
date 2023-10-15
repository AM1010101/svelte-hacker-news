<script lang="ts">
  export let storyId: number;
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import {
    parseDate,
    parseDateRelative,
  } from '$lib/Components/utils';
  import { hnStoryPromise } from '$lib/Components/hnPromise';

  let relative = true;

  function toggleRelative() {
    relative = !relative;
  }
</script>

<div class="p-2 card bg-base-300 rounded-sm">
  {#await hnStoryPromise(storyId)}
    <span class="loading loading-infinity loading-md" />
  {:then story}
    {#if story}
      <div
        in:fly={{
          x: 100,
          duration: 500,
          easing: cubicOut,
        }}
        class="font-bold text-accent"
      >
        <a href={story.url} target="_blank">
          {story.title}
        </a>
      </div>
      <div>
        by: {story.by}
        <button
          class="badge badge-outline badge-accent"
          on:click={toggleRelative}
        >
          {relative
            ? parseDateRelative(story.time)
            : parseDate(story.time)}
        </button>
      </div>
      <a class="text-sm" href={'/story/' + story.id}>
        score: {story.score} | comments: {story.descendants}
      </a>
    {/if}
  {:catch error}
    <p>{error.message}</p>
  {/await}
</div>
