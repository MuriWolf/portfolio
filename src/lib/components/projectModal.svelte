<script>
	import { clickOutside } from '$lib/utilities/clickOutside.js';
	import { scale } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function closeModal() {
		dispatch('closeModal', {
			value: false
		});
	}
</script>

<div
	class="bg-black bg-opacity-50 w-screen h-screen fixed z-10 flex justify-center items-center top-0 left-0"
>
	<div
		class="rounded-xl flex items-start bg-gradient-to-bl from-light-main-blue to-main-blue p-6 w-[90%] max-w-5xl gap-6 relative"
		use:clickOutside
		on:click_outside={closeModal}
		transition:scale={{ duration: 100 }}
	>
		<button
			class="absolute top-0 right-0 rounded-sm rounded-tr-xl p-1 bg-ligher-main-blue"
			on:click={closeModal}
		>
			<img src="close.svg" class="invert-[0.96]" alt="" />
		</button>
		<div class="flex-1 overflow-hidden rounded-xl rounded-tr-sm h-auto">
			<img src="copia-historia-de-tudo.png" alt="" />
		</div>
		<div class="flex-1">
			<h4 class="text-gray-50 text-2xl mb-3 font-merriweather mr-2">
				name of the projectname of the project
			</h4>
			<div class="bg-gradient-to-br from-dark-main-blue to-main-blue shadow-inner  text-gray-50 p-4 rounded-xl">
				<p class="text-gray-200">
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore ex sequi alias,
					blanditiis recusandae aperiam aliquam labore error consectetur, officiis asperiores.Lorem
					ipsum dolor sit, amet consectetur adipisicing elit.
				</p>
			</div>
			<div class="mt-3 flex justify-between items-center gap-4 mx-1 self-end">
				<div class="flex gap-2">
					<a href="."><img src="eye.svg" width="25" alt="" /></a>
					<a href="."><img src="code-branch.svg" width="20" alt="" /></a>
				</div>
				<div class="flex text-main-yellow gap-2 flex-wrap justify-end text-base italic">
					<p>HTML</p>
					<p>CSS</p>
					<p>HTML</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	::-webkit-scrollbar {
		width: 0px;
	}
</style>
