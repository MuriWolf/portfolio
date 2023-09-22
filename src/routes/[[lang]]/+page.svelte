<script>
	// @ts-nocheck
	import About from '$lib/components/sections/about.svelte';
	import CustomSelect from '$lib/components/customSelect.svelte';
	import Hero from '$lib/components/sections/hero.svelte';
	import { darkTheme } from '../../store.js';
	import Projects from '$lib/components/sections/projects.svelte';
	import Contact from '$lib/components/sections/contact.svelte';
	import { browser } from '$app/environment';
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

<header class="w-full hidden xl:block z-10 transition-all sticky {!showHeader && stickyHeader ? '-translate-y-full' : ''} {stickyHeader ? ' backdrop-blur-lg bg-opacity-30 top-0' : 'top-0 bg-opacity-50'}" class:dark bind:clientHeight={headerH}>
	<div class="max-w-8xl w-[90%] flex justify-between items-center py-4 mx-auto">
		<div class="rounded-full h-16 w-16 bg-white" />
		<div class="flex justify-between gap-4 items-center">
			<nav>
				<ol class="list-[upper-roman] flex gap-10 text-main-yellow text-lg">
					<li><span class="text-gray-50">{data.content.nav[0]}</span></li>
					<li><a href="#about" class="text-gray-50">{data.content.nav[1]}</a></li>
					<li><a href="#projects" class="text-gray-50">{data.content.nav[2]}</a></li>
					<li><a href="#contact" class="text-gray-50">{data.content.nav[3]}</a></li>
				</ol>
			</nav>
			<a href="." class="items-center flex">
				<CustomSelect
					items={[
						{ imgSrc: 'us.svg', title: 'English', href: '/' },
						{ imgSrc: 'br.svg', title: 'Portuguese', href: '/pt' }
					]}
				>
					<span class="material-symbols-outlined text-gray-50" slot="header"> translate </span>
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
	class:dark
	class="text-sm md:text-base lg:text-lg relative"
>
	<Hero {data} />
	<About />
	<Projects />
	<Contact />
</main>

<footer><p /></footer>
