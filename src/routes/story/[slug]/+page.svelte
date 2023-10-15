<script lang="ts">
  import { page } from '$app/stores';
  import HnComment from '../../../lib/Components/HnComment.svelte';
  import HnStory from '$lib/Components/HnStory.svelte';
  import { hnStoryPromise } from '$lib/Components/hnPromise';

  let storyParam = $page.url.pathname;
  let storyId = parseInt(
    storyParam.replace('/story/', '').replace('/', '')
  );
  let story = hnStoryPromise(storyId);
</script>

<HnStory {storyId} />
{#await story}
  <span class="loading loading-infinity loading-md" />
{:then story}
  {#if story}
    {#each story.kids as kidId, i (kidId)}
      <HnComment {kidId} />
    {/each}
  {/if}
{:catch error}
  <p>{error.message}</p>
{/await}
