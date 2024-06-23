<script lang="ts">
	import NavMobile from './../lib/layouts/NavMobile.svelte';
	import TestimonialsIcon from '$lib/assets/icons/Testimonials.svelte';
	import Projects from '$lib/layouts/Projects.svelte';
	import Me from './../lib/layouts/Me.svelte';
	import Hero from '$lib/layouts/Hero.svelte';
	import Testimonials from '$lib/layouts/Testimonials.svelte';
	import Skills from '$lib/layouts/Skills.svelte';
	import Footer from '$lib/layouts/Footer.svelte';
    import { openAsideMobile, projectName, textContent, languageSelected } from '$lib/store';
	import { onMount } from 'svelte';
	import Header from '$lib/layouts/Header.svelte';
	import Contact from '$lib/assets/icons/Contact.svelte';
	import Folder from '$lib/assets/icons/Folder.svelte';
	import Person from '$lib/assets/icons/Person.svelte';
	import SkillsIcon from '$lib/assets/icons/Skills.svelte';

	export let data;
	let openNavMobile = false;

	onMount(() => {
		$projectName = '';
	});

</script>

{#if openNavMobile}
	<NavMobile on:closeNavMoble={() => openNavMobile = false} />
{/if}

<div class="mx-auto max-w-7xl my-2 sm:my-6">
	<Header on:openNavMobile={() => openNavMobile = true}>
		<nav class="hidden min-[880px]:block">
			<ul class="flex gap-4 font-semibold text-lg">
				<li class="text-c-text-darker hover:text-primary">
					<a href="#me" class="flex items-center gap-2">
						<Person />
						Me
					</a>
				</li>
				<li class="text-c-text-darker hover:text-primary">
					<a href="#projects" class="flex items-center gap-2">
						<Folder />
						Projects
					</a>
				</li>
				<li class="text-c-text-darker hover:text-primary">
					<a href="#testimonials" class="flex items-center gap-2">
						<TestimonialsIcon />
						Testimonials
					</a>
				</li>
				<li class="text-c-text-darker hover:text-primary">
					<a href="#skills" class="flex items-center gap-2">
						<SkillsIcon />
						Skills
					</a>
				</li>
				<li class="text-c-text-darker hover:text-primary">
					<a href="#contact" class="flex items-center gap-2">
						<Contact />
						Contact
					</a>
				</li>
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

