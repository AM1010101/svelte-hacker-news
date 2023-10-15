<script>
  import { favourites } from '$lib/Stores/favourites';
  import StoryList from '$lib/Components/StoryList.svelte';
  let favs = $favourites;
</script>

<div>
  {#if $favourites}
    <StoryList hn={favs} itemsToLoad={500} paginationSive={500} />
  {:else}
    <p>No favourites.</p>
  {/if}
</div>
