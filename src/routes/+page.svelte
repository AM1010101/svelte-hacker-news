<script lang="ts">
  import ThemeToggle from '../lib/Components/ThemeToggle.svelte';

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

  let itemsToLoad = 50;

  function loadMore() {
    itemsToLoad += 50;
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

<div class="flex justify-between items-center p-2">
  <h1 class="text-3xl font-bold underline">Hacker News App!</h1>
  <ThemeToggle themes={['light', 'hacker']} />
</div>

<div class="items-center w-full">
  {#await hnPromise}
    <span class="loading loading-infinity loading-md" />
  {:then hn}
    <ul class="m-2">
      {#each hn as storyId, i}
        {#if i < itemsToLoad}
          <li class="mb-2">
            <div class="p-2 card bg-accent rounded-sm">
              {#await hnStoryPromise(storyId)}
                <span class="loading loading-infinity loading-md" />
              {:then story}
                {#if story}
                  <div class="font-bold text-black">
                    <a href={story.url} target="_blank">
                      {story.title}
                    </a>
                  </div>
                  <div class="text-sm">
                    by: {story.by} | score: {story.score}
                  </div>
                {/if}
              {:catch error}
                <p>{error.message}</p>
              {/await}
            </div>
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
