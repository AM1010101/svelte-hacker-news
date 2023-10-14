<script lang="ts">
  export let kidId: number;
  export let indent = 0;
  import { hnCommentPromise } from '$lib/Components/hnPromise';
</script>

{#await hnCommentPromise(kidId)}
  <span class="loading loading-infinity loading-md" />
{:then kid}
  {#if kid}
    <div class="p-2 pl-[{indent}] collapse bg-base-100">
      <input type="checkbox" class="min-h-0 max-h-1" checked={true} />
      <div
        class="collapse-title m-0 p-0 h-1 min-h-0 max-h-1 bg-accent"
      />
      <div class="collapse-content mb-0 pb-0">
        <div class="font-bold text-accent">
          {@html kid.text}
        </div>
        <div class="text-sm">
          by: {kid.by} | time: {kid.time}
        </div>
        {#if kid.kids}
          {#each kid.kids as kidId (kidId)}
            <svelte:self {kidId} indent={indent + 2} />
          {/each}
        {/if}
      </div>
    </div>
  {/if}
{:catch error}
  <p>{error.message}</p>
{/await}
<!-- 
<div class="collapse bg-base-200">
  <input type="checkbox" />
  <div class="collapse-title text-xl font-medium">
    Click me to show/hide content
  </div>
  <div class="collapse-content">
    <p>hello</p>
  </div>
</div> -->
