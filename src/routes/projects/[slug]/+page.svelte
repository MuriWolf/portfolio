<script lang="ts">
	import { type projectType } from '$lib/types/projectType';
	import Button from '$lib/components/ui/button/button.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	import { techIcons } from '$lib/utils';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context';
	import * as Carousel from '$lib/components/ui/carousel/index';
	import { textContent, languageSelected, projectName } from '$lib/store';
	import { onMount } from 'svelte';

	export let data;
	const project: projectType = data.project;

	let api: CarouselAPI;
	let count = 0;
	let current = 0;

	onMount(() => {
		$projectName = project.title[$languageSelected];
	});

	$: if (api) {
		count = api.scrollSnapList().length;
		current = api.selectedScrollSnap() + 1;

		api.on('select', () => {
			current = api.selectedScrollSnap() + 1;
		});
	}
</script>

<main class="max-w-[1340px] mx-auto flex flex-col sm:gap-4 md:gap-8 sm:my-4 md:my-8">
	<section
		class="sm:mx-4 md:mx-8 sm:rounded-2xl py-12 sm:px-8 lg:px-16 shadow-xl shadow-stone-900 gradient-blue-ish"
	>
		<div
			class="relative z-10 max-w-[800px] sm:bg-gradient-to-t from-[#f7f7f715] to-[#f7f7f75b] sm:backdrop-blur-sm bg-clip-padding border-0 p-0 sm:px-3 rounded-2xl flex flex-col mx-auto sm:shadow-md shadow-black/20 {project
				.images.length == 1
				? 'sm:py-3'
				: 'sm:pt-7 sm:pb-4'}"
		>
			<div class="flex items-center gap-6 mb-3">
				<a
					href="/#projects"
					class="bg-black/50 hover:brightness-90 active:scale-95 transition-all w-[40px] h-[40px] justify-center items-center rounded-full hidden md:flex"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 320 512"
						fill="white"
						width="24"
						height="24"
						><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
							d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
						/></svg
					>
				</a>
				<h1
					class="flex-1 text-white text-center font-title font-semibold text-shadow-sm text-lg max-xs:uppercase xs:text-xl sm:text-2xl md:text-3xl bg-opacity-75 p-2 rounded-lg md:mr-12"
				>
					{project.title[$languageSelected]}
				</h1>
			</div>
			{#if project.images.length == 1}
				<div
					class="mx-auto sm:rounded-2xl overflow-hidden inline-block shadow-custom-lg shadow-black/30"
				>
					<img
						src={project.images[0]}
						alt={`${project.title[$languageSelected]} project screenshot`}
						height="636"
						width="736"
						class="block mx-auto w-full"
					/>
				</div>
			{:else}
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
					class="w-full sm:rounded-2xl overflow-hidden bg-opacity-0 bg-black"
				>
					<Carousel.Content class="">
						{#each project.images as image}
							<Carousel.Item class="flex flex-col gap-5">
								<img
									src={image}
									alt={`${project.title[$languageSelected]} project screenshot`}
									height="636"
									width="736"
									class="sm:rounded-2xl object-cover h-full w-full"
								/>
							</Carousel.Item>
						{/each}
					</Carousel.Content>
					<footer class="p-2 mt-2 flex items-center justify-center gap-4 max-xs:px-4 pb-0">
						<Carousel.Previous style="all: unset;">
							<button
								class="text-white active:scale-90 transition-all ease-in-out duration-150 flex"
							>
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
							{#each project.images as image (project.images.indexOf(image))}
								<button
									on:click={() => api.scrollTo(project.images.indexOf(image))}
									class="w-4 h-4 border-2 border-white transition-all duration-300 rounded-full {current ==
									project.images.indexOf(image) + 1
										? ' bg-white'
										: ''}"
								></button>
							{/each}
						</div>
						<Carousel.Next style="all: unset;">
							<button class="text-white active:scale-90 transition-all ease-in-out duration-150">
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
			{/if}
		</div>
	</section>
	<section
		class="relative gradient-white py-12 px-4 lg:px-16 sm:rounded-2xl sm:mx-4 md:mx-8 text-center shadow-xl shadow-stone-900"
	>
		{#if project.description[$languageSelected]}
			<h2 class="text-black font-title font-semibold text-3xl mb-4">
				{$textContent.projectPage.description[$languageSelected]}
			</h2>
			<div class="flex flex-col gap-4 max-w-lg mx-auto mb-12">
				{#each project.description[$languageSelected] as paragraph}
					<p class="text-black/80 font-medium leading-7 tracking-wide text-start">{paragraph}</p>
				{/each}
			</div>
		{/if}
		<h2 class="text-black font-title font-semibold text-3xl mb-4">
			{$textContent.projectPage.techs[$languageSelected]}
		</h2>
		<div class="max-w-lg flex flex-wrap flex-row justify-center gap-4 mx-auto mb-12">
			{#each techIcons.filter( (techIcon) => project.technologies.includes(techIcon.title.toLowerCase()), ) as item}
				<Tooltip.Root openDelay={0}>
					<Tooltip.Trigger
						class="min-w-12 sm:min-w-20 hover:backdrop-brightness-200 shadow-md rounded-xl overflow-hidden transition-all duration-300 ease-in-outhover:shadow-none"
					>
						<img src={item.url} alt="" class="rounded-xl p-1" />
					</Tooltip.Trigger>
					<Tooltip.Content sideOffset={12}>
						<p class="font-semibold">{item.title}</p>
					</Tooltip.Content>
				</Tooltip.Root>
			{/each}
		</div>

		<h2 class="text-black font-title font-semibold text-3xl mb-4">
			{$textContent.projectPage.depth[$languageSelected]}
		</h2>
		<div class="flex max-sm:flex-col justify-center gap-6 items-center max-w-lg mx-auto mb-12">
			<a
				href={project.liveUrl}
				class="transition-all duration-300 {project.codeUrl === 'private'
					? 'w-full sm:w-3/5 hover:w-full'
					: 'w-full flex-[2] hover:flex-[3] focus-within:flex-[3]'}"
				target="_blank"
			>
				<Button
					class="bg-black w-full block text-white font-title font-bold text-lg xs:text-xl rounded-[5px]  active:bg-black hover:bg-black hover:brightness-90 active:scale-95 transition-all h-10 shadow-inner-sm shadow-black"
					>Live View</Button
				>
			</a>
			{#if !(project.codeUrl === 'private')}
				<a
					href={project.codeUrl}
					class="flex-[2] hover:flex-[3] focus-within:flex-[3] transition-all duration-300 w-full"
					target="_blank"
				>
					<Button
						class="flex items-center h-10 pb-1 bg-transparent mx-auto hover:w-full text-black border-2 border-black font-title font-medium text-lg rounded-[5px]  shadow-[#00000066] active:bg-transparent hover:bg-transparent hover:brightness-90 active:scale-95 transition-all duration-300 w-full"
						>Discover More</Button
					>
				</a>
			{/if}
		</div>

		<!-- <h2 class="text-gray-50 font-title font-semibold text-3xl  mb-4">More</h2> -->
		<div class="flex justify-center gap-6 items-center max-w-lg mx-auto">
			<a href="/#projects" class="flex-1 w-full -mt-5">
				<Button
					class="flex items-center h-10 pb-1 bg-transparent mx-auto hover:w-full text-black font-title font-medium text-lg rounded-[5px]  shadow-[#00000066] active:bg-transparent hover:bg-transparent hover:brightness-90 active:scale-95 transition-all duration-300 w-full sm:w-3/5"
					>See Other Projects
				</Button>
			</a>
		</div>
	</section>
</main>

<Footer />

<style lang="scss">
	// @import "compass/css3";
	// $nodeStreak: #07beb870;
	// $computationalFogTop: #737CFF70;
	// $computationalFogBot: #090C9B70;
	// $visualDistortionZapper: 180px;
	// $nanoVelocity: 4s;

	// .wrap {
	//   perspective: $visualDistortionZapper;
	//   perspective-origin: 50% 50%;
	//   overflow: hidden;
	//   background: linear-gradient($computationalFogTop 25%, $nodeStreak 50%, $nodeStreak 50%, $computationalFogBot 100%);
	//   background-color: #5B5F97;
	// }

	// .top-plane {
	//   width: 200%;
	//   height: 130%;
	//   position: absolute;
	//   bottom: -30%;
	//   left: -50%;
	//   background-image: -webkit-linear-gradient($nodeStreak 2px, transparent 2px), -webkit-linear-gradient(left, $nodeStreak 2px, transparent 2px);
	//   background-size: 100px 100px,100px 100px;
	//   background-position: -1px -1px,-1px -1px;
	//   transform: rotateX(85deg);
	//   animation: planeMoveTop $nanoVelocity infinite linear;
	// }

	// .bottom-plane {
	//   @extend .top-plane;
	//   transform: rotateX(-85deg);
	//   top: -30%;
	//   animation: planeMoveBot $nanoVelocity infinite linear;
	// }

	// @keyframes planeMoveTop {
	//   from {
	//     background-position: 0px -100px,0px 0px;
	//   }
	//   to {
	//     background-position: 0px 0px, 100px 0px;
	//   }
	// }

	// @keyframes planeMoveBot {
	//   from {
	//     background-position: 0px 0px,0px 0px;
	//   }
	//   to {
	//     background-position: 0px -100px, 100px 0px;
	//   }
	// }

	// @media (max-height: 350px) {
	//   .wrap {
	//     perspective: $visualDistortionZapper - 150;
	//   }
	// }
</style>
