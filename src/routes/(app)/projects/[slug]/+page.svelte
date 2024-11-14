<script lang="ts">
	import usaFlag from '$lib/assets/icons/flags/us.svg';
	import brazilFlag from '$lib/assets/icons/flags/br.svg';
	import { enhance } from '$app/forms';
	import ArrowRight from '$lib/assets/icons/ArrowRight.svelte';
	import ArrowLeft from '$lib/assets/icons/ArrowLeft.svelte';
	import Header from '$lib/layouts/Header.svelte';
	import { increaseSkillSizeBasedOnRelevance } from '$lib/utilities/increaseSkillSizeBasedOnRelevance';
	import { type Project } from '$lib/interfaces/Project';
	import Footer from '$lib/layouts/Footer.svelte';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context';
	import * as Carousel from '$lib/components/ui/carousel/index';
	import { textContent, languageSelected, projectName } from '$lib/store';
	import { onMount } from 'svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import Translate from '$lib/assets/icons/Translate.svelte';
	import Projects from '$lib/layouts/Projects.svelte';
	import { invalidateAll } from '$app/navigation';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	export let data: {
		project: Project;
		nextProject: string;
		previousProject: string;
	};
	$: project = data.project;

	let languageSwitcherForm;
	function submitNewLanguage({ action }: any) {
		const newLanguage = action.searchParams.get('language');
		languageSelected.set(newLanguage);
	}

	let api: CarouselAPI;
	let count = 0;
	let current = 0;

	onMount(() => {
		invalidateAll();
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
		}
	];
</script>

<div class="mx-auto max-w-7xl my-2 sm:my-6">
	<Header>
		<nav slot="header-center">
			<ul class="flex items-center gap-4">
				<li
					class="text-c-text-darker hover:text-white transition-all ease-out font-semibold cursor-pointer"
				>
					<a
						href={`/projects/${data.previousProject}`}
						title={data.previousProject}
						class="flex gap-x-4 items-center"
					>
						<div class="bg-c-primary-darker p-2 rounded-full w-[44px] h-[44px] flex justify-center">
							<ArrowLeft />
						</div>
						<p class="hidden sm:block">
							{$languageSelected == 'pt' ? 'Projeto anterior' : 'Previous project'}
						</p></a
					>
				</li>
				<Separator orientation="vertical" class="bg-c-primary-darker h-[44px] w-[2px]" />
				<li
					class=" text-c-text-darker hover:text-white transition-all ease-out font-semibold cursor-pointer"
				>
					<a
						href={`/projects/${data.nextProject}`}
						title={data.nextProject}
						class="flex gap-x-4 items-center"
					>
						<p class="hidden sm:block">
							{$languageSelected == 'pt' ? 'Próximo projeto' : 'Next project'}
						</p>
						<div class="bg-c-primary-darker p-2 rounded-full w-[44px] h-[44px] flex justify-center">
							<ArrowRight />
						</div>
					</a>
				</li>
			</ul>
		</nav>
		<div slot="header-left">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<button
						class="flex items-center justify-end text-c-text-darker hover:text-white transition-all duration-100 ease-in-out w-12 sm:w-16"
					>
						<Translate />
					</button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content
					class="p-0 bg-c-primary-light backdrop-blur-sm border-c-primary-darker "
				>
					<DropdownMenu.Group>
						<form method="POST" bind:this={languageSwitcherForm} use:enhance={submitNewLanguage}>
							<button
								formaction="/?/setLanguage&language=pt"
								class="flex gap-x-2 items-center text-c-text-darker hover:bg-c-primary p-3 transition-all duration-150 hover:cursor-pointer font-semibold w-full"
							>
								<img src={brazilFlag} width="32" alt="brazil flag" />
								<p>Português</p>
							</button>
							<DropdownMenu.Separator class="my-0 mx-0 w-full bg-c-primary-darker" />
							<button
								formaction="/?/setLanguage&language=en"
								class="flex gap-x-2 items-center text-c-text-darker hover:bg-c-primary p-3 transition-all duration-150 hover:cursor-pointer font-semibold w-full"
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
	<main class="flex flex-col gap-24 md:gap-32 mt-2 sm:mt-6 mx-1.5 sm:mx-4">
		<section
			class="bg-c-primary p-4 md:p-8 lg:p-16 border-[1px] border-c-primary-darker rounded-xl gradient"
		>
			<div class="flex flex-col md:flex-row justify-between mb-8 mt-1">
				<hgroup>
					<h1 class="text-c-text-darker text-3xl mb-4 font-bold font-title">
						{data.project.title[$languageSelected]}
					</h1>
					<div class="hidden md:block">
						<h2 class="font-semibold text-c-text-darker/90 text-lg">
							<strong class="font-semibold text-c-text-darker"
								>{$languageSelected == 'pt' ? 'Tipo: ' : 'Type: '}
							</strong>{data.project.type[$languageSelected]}
						</h2>
						<h2 class="font-semibold text-c-text-darker/90 text-lg">
							<strong class="font-semibold text-c-text-darker"
								>{$languageSelected == 'pt' ? 'Minha função: ' : 'My role: '}
							</strong>
							{data.project.myRole[$languageSelected]}
						</h2>
					</div>
					
				</hgroup>
				<div class="flex flex-wrap gap-2 md:gap-4 items-start md:justify-end mt-4 md:mt-0 max-w-md">
					{#each data.project.technologies as tech}
						<Badge
							class="bg-c-primary/80 rounded-[2px] px-2 sm:px-4 !py-1 border-[1px] border-c-primary-darker text-c-text-darker text-lg hover:bg-c-primary"
							>{tech}</Badge
						>
					{/each}
				</div>
			</div>
			<p class="text-c-text-darker/90 font-medium max-w-xl text-lg mb-8">
				{data.project.abstract[$languageSelected]}
			</p>
			<nav>
				<ul class="flex items-center flex-col-reverse sm:flex-row gap-4 mb-4 w-full">
					{#if data.project.codeUrl != 'private'}
						<li class="w-full max-w-xs">
							<a
								href={data.project.codeUrl}
								target="_blank"
								class="text-c-primary-darker font-title bg-c-text-darker hover:brightness-90 focus:brightness-90 transition-all ease-out rounded-[2px] p-2 text-xl font-bold w-full block text-center active:scale-95"
								>{$languageSelected == 'pt' ? 'Explorar o código' : 'Explore the code'}</a
							>
						</li>
					{/if}
					<li class="w-full max-w-xs">
						<a
							href={data.project.liveUrl}
							target="_blank"
							class="text-c-text-darker font-title bg-c-primary-darker hover:bg-primary focus:bg-primary transition-all ease-out rounded-[2px] p-2 text-xl font-bold w-full block text-center active:scale-95"
							>{$languageSelected == 'pt' ? 'Ver a aplicação' : 'View live'}</a
						>
					</li>
				</ul>
			</nav>
		</section>
		<section class="">
			<div>
				{#if project.images}
					<h2 class="text-c-text-darker text-2xl md:text-3xl font-bold font-title mb-2">
						{$languageSelected == 'pt' ? 'Imagens do projeto' : 'Images of the project'}
					</h2>
					{#if project.images.length == 1}
						<div
							class="mx-auto rounded-xl overflow-hidden inline-block shadow-custom-lg shadow-black/30 w-full"
						>
							<img
								src={project.images[0]}
								alt={`${project.title[$languageSelected]} project screenshot`}
								height="636"
								width="736"
								class="block mx-auto w-full overflow-hidden"
							/>
						</div>
						<!-- <p class="text-end text-c-text-darker text-sm font-bold">Alt da imagem</p> -->
					{:else}
						<Carousel.Root
							bind:api
							opts={{
								skipSnaps: true,
								loop: true,
								breakpoints: {}
							}}
							class="w-full rounded-xl overflow-hidden bg-opacity-0 bg-black"
						>
							<Carousel.Content class="">
								{#each project.images as image (project.images.indexOf(image))}
									<Carousel.Item class="flex flex-col gap-x-5 gap-y-2">
										<img
											src={image}
											alt={`${project.title[$languageSelected]} project screenshot`}
											height="636"
											width="736"
											class="rounded-xl object-cover h-full w-full border"
										/>
										<!-- <p class="text-end text-c-text-darker text-sm font-bold">Alt da imagem</p> -->
									</Carousel.Item>
								{/each}
							</Carousel.Content>
							<footer class="p-2 mt-2 flex items-center justify-center gap-4 max-xs:px-4 pb-0">
								<Carousel.Previous style="all: unset;" class="!cursor-pointer !text-c-text-darker !relative !scale-125 !top-2">
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
											class="w-4 h-4 transition-all duration-100 ease-in-out rounded-full {current ==
											project.images.indexOf(image) + 1
												? ' gradient'
												: 'bg-c-text/50'}"
										></button>
									{/each}
								</div>
								<Carousel.Next style="all: unset;" class="!cursor-pointer !text-c-text-darker !relative !scale-125 !top-2">
									<button
										class="text-white active:scale-90 transition-all ease-in-out duration-150"
									>
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
				{/if}
			</div>
		</section>
		<section class="">
			{#if data.project.description.overview}
				<h2 class="text-c-text-darker text-2xl md:text-3xl font-bold font-title">
					{$languageSelected == 'pt' ? 'Visão geral' : 'Overview'}
				</h2>
				<p class="text-c-text font-medium text-lg max-w-2xl mb-4">
					{data.project.description.overview[$languageSelected]}
				</p>
			{/if}
			{#if data.project.description.features}
				<h2 class="text-c-text-darker text-2xl md:text-3xl font-bold font-title">
					{$languageSelected == 'pt' ? 'Funcionalidades' : 'Features'}
				</h2>
				<p class="text-c-text font-medium text-lg max-w-2xl mb-4">
					{data.project.description.features[$languageSelected]}
				</p>
			{/if}
			{#if data.project.description.challenges}
				<h2 class="text-c-text-darker text-2xl md:text-3xl font-bold font-title">
					{$languageSelected == 'pt' ? 'Desafios e aprendizados' : 'Challenges and learning'}
				</h2>
				<p class="text-c-text font-medium text-lg max-w-2xl">
					{data.project.description.challenges[$languageSelected]}
				</p>
			{/if}
		</section>
	</main>
	<Footer />
</div>
