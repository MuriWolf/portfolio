<script lang="ts">
	import About from '$lib/layout/About.svelte';
	import Hero from '$lib/layout/Hero.svelte';
	import Technologies from '$lib/layout/Technologies.svelte';
	import Projects from '$lib/layout/Projects.svelte';
	import Testimonials from '$lib/layout/Testimonials.svelte';
	import Contact from '$lib/layout/Contact.svelte';
	import Footer from '$lib/layout/Footer.svelte';
</script>

<main class="max-w-[1340px] w-full mx-auto my-8">
	<div class="grid grid-cols-2 gap-8 mx-8">
		<Hero />
		<About />
		<Technologies />
		<Projects />
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