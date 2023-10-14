<script lang="ts">
  export let kidId: number;
  export let indent = 0;
  import { hnCommentPromise } from '$lib/Components/hnPromise';
</script>

{#await hnCommentPromise(kidId)}
  <span class="loading loading-infinity loading-md" />
{:then kid}
  {#if kid}
    <div class="p-2 pl-[{indent}]">
      <div class="font-bold text-accent">
        {kid.text}
      </div>
      <div class="text-sm">
        by: {kid.by} | time: {kid.time}
      </div>
      {#if kid.kids}
        {#each kid.kids as kidId, i (kidId)}
          <svelte:self {kidId} indent={indent + 2} />
        {/each}
      {/if}
    </div>
  {/if}
{:catch error}
  <p>{error.message}</p>
{/await}
