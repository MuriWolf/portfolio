<script>
	import { browser } from '$app/environment';
	import ProjectModal from './projectModal.svelte';

	/**
	 * @type {boolean}
	 */
	let showPreview;
	/**
	 * @type {boolean}
	 */
	let showModal = false;

	/**
	 * @param {boolean} stop
	 */
	function stopScroll(stop) {
		if (browser) {
			stop ? document.body.classList.add("h-screen", "overflow-y-hidden", "mr-[10px]") : document.body.classList.remove("h-screen", "overflow-y-hidden", "mr-[10px]") 
		}
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	on:mouseenter={() => (showPreview = true)}
	on:mouseleave={() => (showPreview = false)}
	on:click={() => {
		showModal = true;
		stopScroll(true);
	}}
	class="dark:bg-dark-main-blue bg-l-main-blue rounded-xl overflow-hidden border-[5px] shadow-lg dark:border-light-main-blue border-x-l-main-blue border-y-l-main-blue relative cursor-pointer"
>
	<img
		src="copia-historia-de-tudo.png"
		class="w-full {showPreview ? 'opacity-20' : ''} transition-all"
		alt=""
	/>
	{#if showPreview}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
		
			class="absolute -translate-x-2/4 left-1/2 top-1/2 -translate-y-1/2 z-[1] text-center w-full"
		>
			<h3 class="text-2xl dark:text-gray-50 text-gray-800 font-bold mb-4 font-merriweather">name of the project</h3>
			<button
				class="bg-gradient-to-b from-main-yellow to-yellow-500 border-r-4 border-b-4 shadow-lg  border-main-blue text-dark-main-blue px-4 py-1 text-xl rounded-xl font-bold "
				>See More</button
			>
		</div>
	{/if}
</div>

{#if showModal}
	<ProjectModal on:closeModal={(e) => {
		showModal = e.detail.value;
		stopScroll(false);
	}} />
{/if}
