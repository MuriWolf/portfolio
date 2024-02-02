<script lang="ts">
	import Hero from '$lib/layout/Hero.svelte';
</script>

<main class="w-screen max-w-[1340px] mx-auto my-8">
	<div class="grid grid-cols-2 gap-8 mx-8">
		<Hero />
		<section id="about" class="gradient-dark-one">about</section>
		<section id="technologies" class="gradient-dark-two py-10 px-6 rounded-3xl">
			<h2 class="font-sora font-bold text-3xl text-c-body-text">3. TECHNOLOGIES</h2>
			<p class="text-gray-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad </p>
			<div class="grid grid-cols-4">

			</div>
		</section>
		<section
			id="projects"
			class="col-span-2 px-16 bg-c-primary border-4 border-c-secondary rounded-3xl"
		>
			projects
		</section>
		<section id="testimonials" class="col-span-2 gradient-dark-two">testimonials</section>
		<section id="contact" class="col-span-2 bg-c-background">contact</section>
	</div>
</main>

<footer></footer>
