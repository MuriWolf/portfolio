<script lang="ts">
	import usaFlag from '$lib/assets/icons/flags/us.svg';
	import brazilFlag from '$lib/assets/icons/flags/br.svg';
	import { enhance } from '$app/forms';
	import ArrowRight from '$lib/assets/icons/ArrowRight.svelte';
	import ArrowLeft from '$lib/assets/icons/ArrowLeft.svelte';
	import Header from '$lib/layouts/Header.svelte';
	import ChevronDown from '$lib/assets/icons/ChevronDown.svelte';
	import { increaseSkillSizeBasedOnRelevance } from '$lib/utilities/increaseSkillSizeBasedOnRelevance';
	import { type Project } from '$lib/interfaces/Project';
	import Button from '$lib/components/ui/button/button.svelte';
	import Footer from '$lib/layouts/Footer.svelte';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context';
	import * as Carousel from '$lib/components/ui/carousel/index';
	import { textContent, languageSelected, projectName } from '$lib/store';
	import { onMount } from 'svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import * as Tooltip from "$lib/components/ui/tooltip";
	import Translate from '$lib/assets/icons/Translate.svelte';

	export let data;
	const project: Project = data.project;

	let languageSwitcherForm;
	function submitNewLanguage({ action }) {
		const newLanguage = action.searchParams.get('language');
		languageSelected.set(newLanguage);
	}

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

	const skills = [
    {
        name: 'Docker',
        relevance: 1
    },
    {
        name: 'Typescript',
        relevance: 2
    },
    {
        name: 'Flutter',
        relevance: 0
    },
    {
        name: 'JQuery',
        relevance: 0
    },
];
</script>

<div class="mx-auto max-w-7xl my-2 sm:my-6">
	<Header>
		<nav slot="header-center">
			<ul class="flex items-center gap-8">
				<li class="text-c-text-darker font-semibold cursor-pointer">
					<a href="" class="flex gap-x-2 items-center"> <ArrowLeft /> <p class="hidden sm:block">Previous project</p></a>
				</li>
				<li class=" text-c-text-darker font-semibold cursor-pointer">
					<a href="" class="flex gap-x-2 items-center"> <p class="hidden sm:block">Next project</p> <ArrowRight /> </a>
				</li>
			</ul>
		</nav>
		<div slot="header-left">
			<DropdownMenu.Root >
				<DropdownMenu.Trigger>
					<button class="flex items-center justify-end text-c-text-darker hover:text-primary transition-all duration-100 ease-in-out w-12 sm:w-16">
						<Translate />
				   </button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="p-0 bg-c-primary-light/75 backdrop-blur-sm border-c-primary-darker ">
					<DropdownMenu.Group>
						<form method="POST" bind:this={languageSwitcherForm} use:enhance={submitNewLanguage}>
							<button
								formaction="/?/setLanguage&language=pt"
								class="flex gap-x-2 items-center hover:bg-c-primary p-3 transition-all duration-150 hover:cursor-pointer font-semibold w-full"
							>
								<img src={brazilFlag} width="32" alt="brazil flag" />
								<p>Português</p>
							</button>
							<DropdownMenu.Separator class="my-0 mx-0 w-full bg-c-primary-darker" />
							<button
								formaction="/?/setLanguage&language=en"
								class="flex gap-x-2 items-center hover:bg-c-primary p-3 transition-all duration-150 hover:cursor-pointer font-semibold w-full "
							>
								<img src={usaFlag} width="32" alt="United States of America flag" />
								<p>English</p>
							</button>
						</form>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</Header>
	<main class="flex flex-col gap-6 mt-2 sm:mt-6 mx-2 sm:mx-4">
		<section class="bg-c-primary p-4 md:p-8 border-[1px] border-c-primary-darker rounded-2xl">
			<div class="flex flex-col md:flex-row justify-between mb-4 md:mb-8">
				<hgroup>
					<h1 class="text-c-text-darker text-3xl font-bold">asda das das </h1>
					<h2 class="font-semibold text-c-text text-lg"><strong class="font-semibold text-c-text-darker">Type: </strong> website</h2>
					<h2 class="font-semibold text-c-text text-lg"><strong class="font-semibold text-c-text-darker">My role: </strong> Frontend, backend and design</h2>
				</hgroup>
				<div class="flex flex-wrap gap-2 md:gap-4 items-start md:justify-end mt-4 md:mt-0 max-w-md">
					{#each skills as skill, id}
						{#key id}
							<Badge class="bg-c-primary-light rounded-[10px] max-sm:!px-2 !py-1 hover:bg-stone-50 border-[1px] border-c-primary-darker text-c-text-darker text-lg hover:text-primary transition-all" style={`padding: 0px ${increaseSkillSizeBasedOnRelevance(skill.relevance)}px;`}>{skill.name}</Badge>
						{/key}
					{/each}
				</div>
			</div>
			<p class="text-c-text font-medium max-w-xl text-lg mb-4">This project was done in partnership with a fellow designer. Developed at the end of 2022. The purpose of the website is simple.</p>
			<nav>
				<ul class="flex items-center flex-col-reverse sm:flex-row gap-4 w-full">
					<li class="w-full max-w-xs"><a href="" class="text-c-text-darker bg-c-primary-darker rounded-md p-2 text-xl font-bold w-full block text-center">Explore the code</a></li>
					<li class="w-full max-w-xs" ><a href="" class="text-stone-50 bg-c-text-darker rounded-md p-2 text-xl font-bold w-full block text-center">View live</a></li>
				</ul>
			</nav>
			<!-- <div class="flex justify-center mt-24 text-c-text transition-all hover:animate-pulse">
				<ChevronDown />
			</div> -->
		</section>
		<section class="-mt-4 sm:mt-0">
			<div>
				{#if project.images.length == 1}
					<div
						class="mx-auto rounded-2xl overflow-hidden inline-block shadow-custom-lg shadow-black/30"
					>
						<img
							src={project.images[0]}
							alt={`${project.title[$languageSelected]} project screenshot`}
							height="636"
							width="736"
							class="block mx-auto w-full border overflow-hidden"
						/>
					</div>
					<p class="text-end text-c-text-darker text-sm font-bold">Alt da imagem</p>
				{:else}
					<Carousel.Root
						bind:api
						opts={{
							skipSnaps: true,
							loop: true,
							breakpoints: {},
						}}
						class="w-full rounded-2xl overflow-hidden bg-opacity-0 bg-black"
					>
						<Carousel.Content class="">
							{#each project.images as image}
								<Carousel.Item class="flex flex-col gap-x-5 gap-y-2">
									<img
										src={image}
										alt={`${project.title[$languageSelected]} project screenshot`}
										height="636"
										width="736"
										class="rounded-2xl object-cover h-full w-full border"
									/>
									<p class="text-end text-c-text-darker text-sm font-bold">Alt da imagem</p>
								</Carousel.Item>
							{/each}
						</Carousel.Content>
						<footer class="p-2 mt-2 flex items-center justify-center gap-4 max-xs:px-4 pb-0">
							<Carousel.Previous style="all: unset;" class="!cursor-pointer">
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
							</Carousel.Previous >
							<div class="flex gap-4 items-center justify-center">
								{#each project.images as image (project.images.indexOf(image))}
									<button
										on:click={() => api.scrollTo(project.images.indexOf(image))}
										class="w-4 h-4 transition-all duration-100 ease-in-out rounded-full {current ==
										project.images.indexOf(image) + 1
											? ' bg-black'
											: 'bg-c-text/50 border-2'}"
									></button>
								{/each}
							</div>
							<Carousel.Next style="all: unset;" class="!cursor-pointer">
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
		<section class="mt-8 sm:mt-16">
			<h2 class="text-c-text-darker text-3xl font-bold">Overview</h2>
			<p class="text-c-text font-medium text-lg max-w-2xl mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis debitis dolore similique? Omnis vero minus ipsam rerum molestias molestiae nemo eveniet, iusto dicta fugit, sequi perferendis quae nisi labore laborum!</p>
			<h2 class="text-c-text-darker text-3xl font-bold">Features</h2>
			<p class="text-c-text font-medium text-lg max-w-2xl mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis debitis dolore similique? Omnis vero minus ipsam rerum molestias molestiae nemo eveniet, iusto dicta fugit, sequi perferendis quae nisi labore laborum!</p>
			<h2 class="text-c-text-darker text-3xl font-bold">Challenges and learning</h2>
			<p class="text-c-text font-medium text-lg max-w-2xl">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis debitis dolore similique? Omnis vero minus ipsam rerum molestias molestiae nemo eveniet, iusto dicta fugit, sequi perferendis quae nisi labore laborum!</p>
		</section>
	</main>
	<Footer />
</div>

