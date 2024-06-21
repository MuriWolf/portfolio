<script lang="ts">
	import Projects from '$lib/layouts/Projects.svelte';
	import Me from './../lib/layouts/Me.svelte';
	import Hero from '$lib/layouts/Hero.svelte';
	import Header from "$lib/layouts/Header.svelte";
	import Testimonials from '$lib/layouts/Testimonials.svelte';
	import Skills from '$lib/layouts/Skills.svelte';
	import Footer from '$lib/layouts/Footer.svelte';
    import { openAsideMobile, projectName, textContent, languageSelected } from '$lib/store';
	import { onMount } from 'svelte';

	export let data;

	onMount(() => {
		$projectName = '';
	});

</script>

<div class="mx-auto max-w-7xl my-6">
    <Header />
    
    <main class="mt-6">
        <Hero />
        <Me />
        <Projects projects={data.projects ?? {}} />
        <Testimonials />
        <Skills />
    </main>
    <Footer />
</div>