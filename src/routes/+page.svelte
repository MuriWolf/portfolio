<script lang="ts">
	import HeaderMobile from '../lib/layout/HeaderMobile.svelte';
	import About from '$lib/layout/About.svelte';
	import Hero from '$lib/layout/Hero.svelte';
	import Technologies from '$lib/layout/Technologies.svelte';
	import Projects from '$lib/layout/Projects.svelte';
	import Testimonials from '$lib/layout/Testimonials.svelte';
	import Contact from '$lib/layout/Contact.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	import { openAsideMobile, projectName } from '$lib/store';
	import { onMount } from 'svelte';

	export let data;

	onMount(() => {
		$projectName = "";
	})
</script>

{#if $openAsideMobile}
	<HeaderMobile />
{/if}

<main class="max-w-[1340px] w-full mx-auto my-4 xs:my-8">
	<div class="flex flex-col gap-4 xs:gap-8 mx-4 xs:mx-8" style="-webkit-perspective: 1000;">
		<Hero />
		<div class="flex max-[956px]:flex-col gap-4 xs:gap-8 ">
			<div class="flex-1">
				<About />
			</div>
			<div class="flex-1">
				<Technologies />
			</div>
		</div>
		<Projects projects={ data.projects ?? {} } />
		<Testimonials />
		<Contact />
	</div>
</main>

<Footer />

<!-- <style>
	:global(section) {
		height: 93vh;
	}
</style> -->