<script lang="ts">
  export let kidId: number;
  export let indent = 0;
  import { hnCommentPromise } from '$lib/Components/hnPromise';
  import {
    parseDate,
    parseDateRelative,
  } from '$lib/Components/utils';
  let relative = true;

  function toggleRelative() {
    relative = !relative;
  }
</script>

{#await hnCommentPromise(kidId)}
  <span class="loading loading-infinity loading-md" />
{:then kid}
  {#if kid}
    <div class="p-2 pl-[{indent}] collapse bg-base-100 m-0">
      <input type="checkbox" class="min-h-0 max-h-1" checked={true} />
      <div class="collapse-title m-0 p-0 min-h-0">
        <div class="text-sm">
          <button
            class="badge badge-outline badge-accent"
            on:click={toggleRelative}
          >
            {relative
              ? parseDateRelative(kid.time)
              : parseDate(kid.time)}
          </button>
          by: {kid.by}
        </div>
      </div>
      <div class="collapse-content m-0 p-0 pb-0">
        <div class="pl-2 text-accent text-sm leading-tight">
          {@html kid.text}
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
