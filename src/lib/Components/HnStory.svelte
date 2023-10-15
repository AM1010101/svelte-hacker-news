<script lang="ts">
  export let storyId: number;
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { favourites } from '$lib/Stores/favourites';
  import {
    parseDate,
    parseDateRelative,
  } from '$lib/Components/utils';
  import { hnStoryPromise } from '$lib/Components/hnPromise';
  import Icon from '@iconify/svelte';

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
        class="text-accent"
      >
        <a href={story.url} target="_blank">
          {story.title}
        </a>
      </div>
      <div class="flex justify-between">
        <div>
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
        </div>
        <div class="flex">
          {#if $favourites.includes(story.id)}
            <button
              class="btn btn-outline btn-accent"
              on:click={() => {
                favourites.remove(story.id);
              }}
            >
              <Icon icon="mdi:favourite" />
            </button>
          {:else}
            <button
              class="btn btn-outline btn-accent"
              on:click={() => {
                favourites.add(story.id);
              }}
            >
              <Icon icon="mdi:favourite-border" />
            </button>
          {/if}
        </div>
      </div>
    {/if}
  {:catch error}
    <p>{error.message}</p>
  {/await}
</div>
