<script>
	// @ts-nocheck

	import arrowComments from '$lib/assets/arrow-comments.svg';
	import { clickOutside } from '$lib/utilities/clickOutside.js';
	import { fade, slide } from 'svelte/transition';

	// title, id
	export let items;

	let open = false;
	function toggle() {
		open = !open;
	}
</script>

<!--  -->
<div
	class="relative w-full focus:outline-0 focus:outline-none"
	use:clickOutside
	on:click_outside={() => (open = false)}
>
	<button on:click|preventDefault={toggle}>
		<slot name="header" />
	</button>
	{#if open}
		<ul
			in:slide={{ duration: 100 }}
			out:fade={{ duration: 50 }}
			class="z-10 absolute mt-3 w-full rounded bg-gray-50 ring-1 ring-gray-300 text-headline-color shadow-light min-w-[200px]"
		>
			{#if items}
				{#each items as item}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
					{#if item.href}
						<li class="cursor-pointer select-none hover:bg-gray-200 text-main-blue font-semibold">
							<a href={item.href} class="w-full h-fullp-4 p-3 flex">
								<img src={item.imgSrc} class="w-8 mr-2 rounded-sm" alt="" />
								<p>{item.title}</p>
							</a>
						</li>
					{:else}
						<li
							class="cursor-pointer select-none p-4 py-3 hover:bg-gray-200 flex text-main-blue font-semibold"
						>
							{item.title}
						</li>
					{/if}
				{/each}
			{/if}
		</ul>
	{/if}
</div>

<style>
	button:focus {
		outline: none;
	}
</style>
