<script lang="ts">
	import About from '$lib/layout/About.svelte';
	import Hero from '$lib/layout/Hero.svelte';
	import Technologies from '$lib/layout/Technologies.svelte';
</script>

<main class="max-w-[1340px] mx-auto my-8">
	<div class="grid grid-cols-2 gap-8 mx-8">
		<Hero />
		<About />
		<Technologies />
		<section id="projects" class="col-span-2 bg-c-primary border-4 border-c-secondary py-10 px-6 rounded-3xl" >
			<h2 class="font-title font-bold text-3xl text-c-body-text mb-6">4. PROJECTS</h2>
		</section>

		<section id="testimonials" class="col-span-2 gradient-dark-two py-10 px-6 rounded-3xl">
			<h2 class="font-title font-bold text-3xl text-c-body-text mb-6">5. TESTIMONIALS</h2>
		</section>
		
		<section id="contact" class="col-span-2 bg-c-background rounded-3xl">
			contact
		</section>
	</div>
</main>

<footer></footer>
