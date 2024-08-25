<script lang="ts">
	import NavMobile from '$lib/layouts/NavMobile.svelte';
	import Projects from '$lib/layouts/Projects.svelte';
	import Me from '$lib/layouts/Me.svelte';
	import Hero from '$lib/layouts/Hero.svelte';
	import Testimonials from '$lib/layouts/Testimonials.svelte';
	import Skills from '$lib/layouts/Skills.svelte';
	import Footer from '$lib/layouts/Footer.svelte';
	import {  projectName, textContent, languageSelected } from '$lib/store';
	import { onMount } from 'svelte';
	import Header from '$lib/layouts/Header.svelte';

	export let data;
	let openNavMobile = false;

	onMount(() => {
		$projectName = '';
	});
</script>

{#if openNavMobile}
	<NavMobile on:closeNavMoble={() => (openNavMobile = false)} />
{/if}

<div class="mx-auto max-w-7xl my-2 sm:my-6">
	<Header on:openNavMobile={() => (openNavMobile = true)}>
		<nav slot="header-center" class="hidden min-[880px]:block ml-auto">
			<ul class="flex gap-4 font-semibold text-lg">
				{#each $textContent.nav as navItem, i}
					<li class="text-c-text hover:text-primary">
						<a href="#{navItem.href}" class="flex items-center gap-2">
							{i + 1}. {navItem[$languageSelected]}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</Header>
	<main class="flex flex-col gap-6 mt-2 sm:mt-6 mx-2 sm:mx-4">
		<Hero />
		<Me />
		<Projects projects={data.projects ?? {}} />
		<Testimonials />
		<Skills />
	</main>
	<Footer />
</div>
