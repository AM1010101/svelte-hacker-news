<script lang="ts">
  export let storyId: number;
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  // create a story interface
  interface Story {
    by: string;
    descendants: number;
    id: number;
    kids: number[];
    score: number;
    time: number;
    title: string;
    type: string;
    url: string;
  }

  function hnStoryPromise(id: number) {
    return fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    )
      .then((res) => res.json())
      .then((data) => {
        return data as Story;
      })
      .catch((err) => {
        console.log('err', err);
      });
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
      <div class="text-sm">
        by: {story.by} | score: {story.score} | comments: {story.descendants}
      </div>
    {/if}
  {:catch error}
    <p>{error.message}</p>
  {/await}
</div>
