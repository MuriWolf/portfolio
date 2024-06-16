<script lang="ts">
	import { slide } from 'svelte/transition';
	import HeaderMobile from '../lib/layout/HeaderMobile.svelte';
	import About from '$lib/layout/About.svelte';
	import Hero from '$lib/layout/Hero.svelte';
	import Technologies from '$lib/layout/Technologies.svelte';
	import Projects from '$lib/layout/Projects.svelte';
	import Testimonials from '$lib/layout/Testimonials.svelte';
	import Contact from '$lib/layout/Contact.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	import { openAsideMobile, projectName, textContent, languageSelected } from '$lib/store';
	import { onMount } from 'svelte';

	export let data;

	let selectWordId = 0;
	let selectWord = $textContent.qualities.subs[0];

	onMount(() => {
		$projectName = '';

		setInterval(() => {
			if (selectWordId < $textContent.qualities.subs.length -1) {
				selectWordId++;
			} else {
				selectWordId = 0;
			}
			selectWord = $textContent.qualities.subs[selectWordId];
	}, 2000)	
	});
</script>

{#if $openAsideMobile}
	<HeaderMobile />
{/if}

<main class="max-w-[1340px] w-full mx-auto my-2 sm:my-4 md:my-8">
	<div
		id="container"
		class="flex flex-col gap-x-2 gap-y-2 sm:gap-x-4 sm:gap-y-4 md:gap-x-8 md:gap-y-8 mx-2 sm:mx-4 md:mx-8"
		style="-webkit-perspective: 1000;"
	>
		<Hero />
		<div class="flex max-[956px]:flex-col gap-x-2 gap-y-2 sm:gap-x-4 sm:gap-y-4 md:gap-x-8 md:gap-y-8">
			<div class="flex-1">
				<About />
			</div>
			<div class="flex-1">
				<Technologies />
			</div>
		</div>
		<div class="hidden lg:block col-span-2 bg-black rounded-2xl py-12 px-4 xs:px-6 sm:px-8 gradient-dark-one overflow-x-hidden overflow-y-hidden ">
			<h1 class="text-8xl font-semibold text-center text-c-body-text-light font-title">{$textContent.qualities.verb[$languageSelected]}...</h1>
		</div>
		<Projects projects={data.projects ?? {}} />
		<Testimonials />
		<div class="hidden lg:block col-span-2 gradient-white rounded-2xl py-12 px-4 xs:px-6 sm:px-8 gradient-dark-one overflow-x-hidden overflow-y-hidden">
			{#key selectWord}
				<h1 class="text-8xl font-semibold text-center text-black font-title" transition:slide>{selectWord[$languageSelected]}.</h1>
			{/key}
		</div>
		<Contact />
	</div>
</main>

<Footer />

<style>
	#container {
		scroll-snap-type: both mandatory;
	}
</style>
