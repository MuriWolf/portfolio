<script lang="ts">
	import { type Project } from '$lib/interfaces/Project';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context';
	import * as Carousel from '$lib/components/ui/carousel/index';
	// import Autoplay from "embla-carousel-autoplay";
	import { languageSelected } from '$lib/store';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import Button from '$lib/components/ui/button/button.svelte';

	export let projects: Array<Project>;

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

<section
	id="projects"
	class="mt-8 sm:mt-16"
>
	<h2
        class="text-c-text-darker text-3xl font-bold mb-4"
	>
		{$languageSelected == 'en' ? 'Projects' : 'Projetos'}
	</h2>
	<Carousel.Root
		bind:api
		opts={{
			skipSnaps: true,
			loop: true,
			breakpoints: {},
		}}
		class="w-full md:rounded-xl overflow-hidden"
	>
		<Carousel.Content>
			{#if projects}
				{#each projects as project (project.id)}
					<Carousel.Item class="basis-[100%] flex flex-col-reverse lg:flex-row gap-4 w-full">	
						<div
							class="xs:flex flex-1 min-w-[320px] flex-wrap justify-between gap-y-2 sm:gap-y-6 gap-x-2 p-4 lg:p-8 rounded-xl border-2 border-c-primary-darker bg-c-primary" 
						>
							<hgroup class="h-min">
								<h3 class="text-c-text-darker text-c-body-text-light font-bold text-xl xs:text-2xl">
									{project.title.pt}
								</h3>
								<p class="text-c-text text-xs font-semibold">website</p>
							</hgroup>
							<div class="flex gap-2 md:gap-4 h-8 sm:h-12 justify-self-start my-2 xs:my-0">
								<a
									href={project.liveUrl}
									target="_blank"
									class="flex w-8 h-8 sm:w-12 sm:h-12 justify-center items-center bg-c-text-darker transition-all ease-in-out duration-150 hover:bg-primary p-1 sm:p-3 rounded-[5px]"
								>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="#f7f7f7"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/></svg>
								</a>
								{#if project.codeUrl != 'private'}
									<a
										href={project.codeUrl}
										target="_blank"
										class="flex w-8 h-8 sm:w-12 sm:h-12 justify-center items-center bg-c-text-darker transition-all ease-in-out duration-150 hover:bg-primary p-1 sm:p-3 rounded-[5px]"
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
							<p class="text-c-text font-medium mb-2 mt-8 xs:mt-0 xs:mb-0">{project.description[$languageSelected][0]}</p>
							<a href={`/projects/${project.slug}`} class="block w-full ">
								<Button
									class="bg-c-text-darker flex-1 w-full min-w-full block text-white font-title font-semibold text-xl rounded-[5px] active:scale-95 transition-all "
									>Discover More</Button
								>
							</a>
						</div>
						<div>
							<img
								src={`${project.images[0]}`}
								alt={`${project.title[$languageSelected]} project screenshot`}
								class="rounded-xl h-[380px] w-full lg:rounded-l-0 border hidden md:block object-cover"
							/>
						</div>
					</Carousel.Item>
				{/each}
			{/if}
		</Carousel.Content>
		<footer class="hidden md:flex items-center justify-center gap-4 max-xs:px-4 p-2 mt-6">
			<Carousel.Previous style="all: unset;" class="!cursor-pointer">
				<button class="text-gray-50 active:scale-90 transition-all ease-in-out duration-150 flex cursor-pointer">
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
						class="w-4 h-4 transition-all duration-300 rounded-full {current ==
						project.id + 1
							? ' relative rotate-45 bg-black scale-125'
							: 'bg-c-text/50'}"
					></button>
				{/each}
			</div>
			<!-- <Progress value={current} max={count} class="transition-all duration-500 max-w-96 shadow-md" /> -->
			<Carousel.Next style="all: unset;" class="!cursor-pointer">
				<button class="text-gray-50 active:scale-90 transition-all ease-in-out duration-150 cursor-pointer">
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