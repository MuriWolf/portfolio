<script>
	// @ts-nocheck
	import { Body } from 'svelte-body';
	import About from '$lib/components/sections/about.svelte';
	import CustomSelect from '$lib/components/customSelect.svelte';
	import Hero from '$lib/components/sections/hero.svelte';
	import { darkTheme } from '../../store.js';
	import Projects from '$lib/components/sections/projects.svelte';
	import Contact from '$lib/components/sections/contact.svelte';
	import { browser } from '$app/environment';
	import Footer from '$lib/components/sections/footer.svelte';
	export let data;
	const toggleDark = () => ($darkTheme = !$darkTheme);
	$: dark = $darkTheme;
	let isScrolling = false;
	let headerH;
	let showHeader = false;
	let stickyHeader = false;
	let lastScrollPosition
	let currentScrollPosition
	if (browser) {
		lastScrollPosition = window.scrollY;
	}
	function handleScroll() {
		if (!isScrolling) {
			isScrolling = true;

			currentScrollPosition = window.scrollY;

			if ((currentScrollPosition > headerH)) {
				stickyHeader = true;
				showHeader = currentScrollPosition > lastScrollPosition ? false : true;
			} else {
				stickyHeader = false;
			}

			lastScrollPosition = currentScrollPosition;

			setTimeout(() => {
				isScrolling = false;
			}, 50);
		}
	}
</script>

<svelte:window on:scroll={handleScroll} />
<Body class="{dark ? 'bg-gradient-to-l  from-dark-main-blue to-main-blue' : 'bg-l-lighter-main-blue'} " />

<header class="w-full hidden xl:block z-10 transition-all sticky {!showHeader && stickyHeader ? '-translate-y-full' : ''} {stickyHeader ? ' backdrop-blur-lg bg-opacity-30 top-0' : 'top-0 bg-opacity-50'}" bind:clientHeight={headerH} class:dark>
	<div class="max-w-8xl w-[90%] flex justify-between items-center py-4 mx-auto">
		<div class="rounded-full h-16 w-16 bg-white" />
		<div class="flex justify-between gap-4 items-center">
			<nav>
				<ol class="list-[upper-roman] flex gap-10 dark:text-main-yellow text-dark-main-yellow text-lg">
					<li><a href="#intro" class="dark:text-gray-50 text-gray-800">{data.content.nav[0]}</a></li>
					<li><a href="#about" class="dark:text-gray-50 text-gray-800">{data.content.nav[1]}</a></li>
					<li><a href="#projects" class="dark:text-gray-50 text-gray-800">{data.content.nav[2]}</a></li>
					<li><a href="#contact" class="dark:text-gray-50 text-gray-800">{data.content.nav[3]}</a></li>
				</ol>
			</nav>
			<a href="." class="items-center flex">
				<CustomSelect
					items={[
						{ imgSrc: 'us.svg', title: 'English', href: '/' },
						{ imgSrc: 'br.svg', title: 'Portuguese', href: '/pt' }
					]}
				>
					<span class="material-symbols-outlined dark:text-gray-50 text-gray-800" slot="header"> translate </span>
				</CustomSelect>
			</a>
			<button
				class="h-7 w-12 px-1 rounded-full bg-gray-50 border-[1px] border-gray-50 flex justify-between items-center relative"
				on:click={toggleDark}
			>
				<i class="fas fa-moon text-gray-600" />
				<i class="fas fa-sun text-yellow-600" />
				<span
					class="absolute bg-gray-900 rounded-full w-6 h-6 dark:right-0 right-[1.35rem] transition-all"
				/>
			</button>
		</div>
	</div>
</header>
<main
	id="intro"
	class:dark
	class="text-sm md:text-base lg:text-lg relative"
>
	<Hero {data} />
	<About />
	<Projects />
	<Contact />
</main>
<footer class="flex justify-center items-center h-52 relative" class:dark>
    <img src="waves.png" class="absolute bottom-0 w-full max-h-[500px] dark:opacity-10 opacity-30 z-0" alt="">
    <h3 class="text-xl dark:text-gray-50 text-gray-800 text-center ">Developed and Designed by Myself<br/>2023</h3>
</footer>

<Footer />
