<script lang="ts">
	import { type projectType } from './../types/projectType';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context';
	import * as Carousel from '$lib/components/ui/carousel/index';
	// import Autoplay from "embla-carousel-autoplay";
	import { languageSelected } from '$lib/store';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import Button from '$lib/components/ui/button/button.svelte';
	import Saos from 'saos';

	export let projects: Array<projectType>;

	let api: CarouselAPI;
	let count = 0;
	let current = 0;

	$: if (api) {
		count = api.scrollSnapList().length;
		current = api.selectedScrollSnap() + 1;

		api.on('select', () => {
			current = api.selectedScrollSnap() + 1;
		});
	}
	let showingSection = false;
	function handleUpdateSectionView(x: { detail: { observing: boolean } }) {
		showingSection = x.detail.observing;
	}
</script>

<!-- <div class="perspective-400 transition-all duration-[400] ease-[cubic-bezier(0.645,0.045,0.355,1.000)] {showingSection ? 'translate-z-0' : '-translate-z-12'}">
    <Saos on:update={handleUpdate} top={150} bottom={0}> -->
<section
	id="projects"
	class="gradient-blue-ish border-2 border-gray-300 pb-10 shadow-xl shadow-stone-900 section-default-style"
>
	<h2
		class="font-title font-bold text-2xl xs:text-3xl text-c-body-text-light mb-6 max-xs:px-4 lowercase "
	>
		4. {$languageSelected == 'en' ? 'PROJECTS' : 'Projetos'}
	</h2>
	<Carousel.Root
		bind:api
		opts={{
			skipSnaps: true,
			loop: true,
			breakpoints: {},
		}}
		plugins={[
			// Autoplay({
			//     delay: 2750,
			// stopOnMouseEnter: true,
			//     stopOnInteraction: false
			// }),
		]}
		class="w-full md:rounded-xl overflow-hidden bg-opacity-0 bg-black"
	>
		<Carousel.Content>
			{#if projects}
				{#each projects as project (project.id)}
					<Carousel.Item class="basis-[100%] md:basis-2/3 min-[1140px]:basis-1/2 flex flex-col gap-5">
						<AspectRatio
							ratio={16 / 9}
							class="z-10 bg-gray-300 shadow-xl bg-opacity-0 relative overflow-hidden"
						>
							<img
								src={`${project.images[0]}`}
								alt={`${project.title[$languageSelected]} project screenshot`}
								class="rounded-xl object-cover h-full w-full"
							/>
						</AspectRatio>
						<div
							class="flex flex-wrap justify-between gap-y-6 p-4 rounded-xl gradient-form border-2 border-c-body-text-light/50"
						>
							<hgroup class="">
								<h3 class="font-title text-c-body-text-light font-bold text-xl xs:text-2xl">
									{project.title.pt}
								</h3>
								<p class="text-black text-xs font-semibold">website</p>
							</hgroup>
							<div class="flex gap-2 md:gap-4">
								<a
									href={project.liveUrl}
									target="_blank"
									class="flex w-8 h-8 sm:w-12 sm:h-12 justify-center items-center bg-white shadow-lg p-1 sm:p-3 rounded-[5px]"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="18"
										height="18"
										viewBox="0 0 512 512"
										><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
											d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z"
										/></svg
									>
								</a>
								{#if project.codeUrl != 'private'}
									<a
										href={project.codeUrl}
										target="_blank"
										class="flex w-8 h-8 sm:w-12 sm:h-12 justify-center items-center bg-black shadow-lg p-1 sm:p-3 rounded-[5px]"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="22.5"
											height="18"
											viewBox="0 0 640 512"
											><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
												d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"
												fill="#f7f7f7"
											/></svg
										>
									</a>
								{/if}
							</div>
							<a href={`/projects/${project.slug}`} class="block w-full">
								<Button
									class="bg-black flex-1 w-full min-w-full block text-white font-title font-semibold text-xl rounded-[5px] shadow-[#00000066] active:bg-black hover:bg-black hover:brightness-90 active:scale-95 transition-all "
									>Discover More</Button
								>
							</a>
						</div>
					</Carousel.Item>
				{/each}
			{/if}
		</Carousel.Content>
		<footer class="hidden md:flex items-center justify-center gap-4 max-xs:px-4 p-2 mt-6">
			<Carousel.Previous style="all: unset;">
				<button class="text-gray-50 active:scale-90 transition-all ease-in-out duration-150 flex">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						fill="currentColor"
						viewBox="0 0 256 512"
						><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
							d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"
						/></svg
					>
				</button>
			</Carousel.Previous>
			<div class="flex gap-4 items-center justify-center">
				{#each projects as project (project.id)}
					<button
						on:click={() => api.scrollTo(project.id)}
						class="w-4 h-4 border-2 border-green-50 transition-all duration-300 rounded-full {current ==
						project.id + 1
							? ' relative rotate-45 bg-gray-50'
							: ''}"
					></button>
				{/each}
			</div>
			<!-- <Progress value={current} max={count} class="transition-all duration-500 max-w-96 shadow-md" /> -->
			<Carousel.Next style="all: unset;">
				<button class="text-gray-50 active:scale-90 transition-all ease-in-out duration-150">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						fill="currentColor"
						viewBox="0 0 256 512"
						><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
							d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"
						/></svg
					>
				</button>
			</Carousel.Next>
		</footer>
	</Carousel.Root>
</section>
