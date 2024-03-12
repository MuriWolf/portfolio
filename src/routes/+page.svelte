<script lang="ts">
	import HeaderMobile from '../lib/layout/HeaderMobile.svelte';
	import About from '$lib/layout/About.svelte';
	import Hero from '$lib/layout/Hero.svelte';
	import Technologies from '$lib/layout/Technologies.svelte';
	import Projects from '$lib/layout/Projects.svelte';
	import Testimonials from '$lib/layout/Testimonials.svelte';
	import Contact from '$lib/layout/Contact.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	import { openAsideMobile } from '$lib/store';

	export let data;
</script>

{#if $openAsideMobile}
	<HeaderMobile />
{/if}

<main class="max-w-[1340px] w-full mx-auto my-4 xs:my-8">
	<div class="grid grid-cols-2 gap-4 xs:gap-8 mx-4 xs:mx-8">
		<Hero />
		<About />
		<Technologies />
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