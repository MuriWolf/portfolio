<script lang="ts">
	import Button from './../lib/components/ui/button/button.svelte';
	import About from '$lib/layout/About.svelte';
	import Hero from '$lib/layout/Hero.svelte';
	import Technologies from '$lib/layout/Technologies.svelte';
	import Projects from '$lib/layout/Projects.svelte';
	import Testimonials from '$lib/layout/Testimonials.svelte';
	import Contact from '$lib/layout/Contact.svelte';
</script>

<main class="max-w-[1340px] mx-auto my-8">
	<div class="grid grid-cols-2 gap-8 mx-8">
		<Hero />
		<About />
		<Technologies />
		<Projects />
		<Testimonials />
		<Contact />
		
		
	</div>
</main>

<footer></footer>

<!-- <style>
	:global(section) {
		height: 93vh;
	}
</style> -->