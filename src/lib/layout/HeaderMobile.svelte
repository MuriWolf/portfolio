<script lang="ts">
	import { enhance } from '$app/forms';
	import { scale, slide } from 'svelte/transition';
	import { languageSelected, openAsideMobile } from '$lib/store';
	import { Separator } from '$lib/components/ui/separator';
	import { bounceIn } from 'svelte/easing';
	import GithubIcon from '$lib/assets/githubIcon.svelte';
	import LinkedinIcon from '$lib/assets/linkedinIcon.svelte';
	import TelegramIcon from '$lib/assets/telegramIcon.svelte';
	import RedditIcon from '$lib/assets/redditIcon.svelte';
	import { onMount } from 'svelte';

	let openAnimation = false;

	const internalLinks = [
		{ id: 1, name: 'Intro', link: 'hero' },
		{ id: 2, name: 'About', link: 'about' },
		{ id: 3, name: 'Techs', link: 'technologies' },
		{ id: 4, name: 'Projects', link: 'projects' },
		{ id: 5, name: 'Testimonials', link: 'testimonials' },
		{ id: 6, name: 'Contact', link: 'contact' },
	];

	const socialMedias = [
		{ id: 1, name: 'GitHub', icon: GithubIcon, link: '' },
		{ id: 2, name: 'Linkedin', icon: LinkedinIcon, link: '' },
		{ id: 3, name: 'Telegram', icon: TelegramIcon, link: '' },
		{ id: 4, name: 'Reddit', icon: RedditIcon, link: '' },
	];

	onMount(() => {
		openAnimation = true;
	});
	let languageSwitcherForm;
	function closeAsideMobile() {
		openAsideMobile.update((value) => (value = false));
		openAnimation = false;
	}


	function submitNewLanguage({ action }) {
		const newLanguage = action.searchParams.get('language');
		languageSelected.set(newLanguage);
	}
</script>

<div class="fixed z-50 top-0 w-screen h-screen bg-black bg-opacity-10 backdrop-blur-xl">
	<section
		class="h-[90%] border-b-4 border-white/80 rounded-b-2xl flex bg-black/60 transition-all p-6 shadow-inner-md {openAnimation
			? ''
			: ''}"
		in:slide={{ duration: 200 }}
		out:slide={{ duration: 100 }}
	>
		<div class="flex-2">
			<nav class="text-c-body-text text-2xl font-medium">
				<ol class="ml-0 flex flex-col gap-4 w-full">
					{#each internalLinks as internalLink (internalLink.id)}
						{#if openAnimation}
							<a
								href={`#${internalLink.link}`}
								class="block hover:opacity-65 text-c-body-text-light hover:text-shadow-sm shadow-gray-600 transition-all duration-150 ease-in"
								transition:scale={{ delay: internalLink.id * 50 }}
							>
								<li>{internalLink.id}. {internalLink.name}</li>
							</a>
						{/if}
					{/each}
				</ol>
			</nav>
		</div>
		<div class="flex-1 h-full flex flex-col">
			<button
				on:click={closeAsideMobile}
				class="w-8 h-8 ml-auto block hover:opacity-65 text-c-body-text-light transition-all duration-100 ease-in"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
					><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
						d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
						fill="currentColor"
					/></svg
				>
			</button>
			<ul class="flex flex-col gap-y-4 mt-auto ml-auto items-end justify-center text-c-body-text">
				<form method="POST" bind:this={languageSwitcherForm} use:enhance={submitNewLanguage}>
					<button
						formaction="/?/setLanguage&language=pt"
						class="flex gap-x-2 items-center p-3 pr-0 transition-all duration-150 hover:cursor-pointer font-semibold w-full"
					>
						<img src="images/flags/br.svg" width="32" class="rounded-[3.5px]" alt="brazil flag" />
					</button>
					<button
						formaction="/?/setLanguage&language=en"
						class="flex gap-x-2 items-center p-3 pr-0 transition-all duration-150 hover:cursor-pointer font-semibold w-full"
					>
						<img src="images/flags/us.svg" width="32" class="rounded-[3.5px]" alt="United States of America flag" />
					</button>
				</form>
				<Separator class="mb-3 w-8 border-2 rounded" />
				{#each socialMedias as socialMedia (socialMedia.id)}
					<li
						class="hover:opacity-65 text-c-body-text-light hover:scale-110 transition-all ease-in"
					>
						{#if openAnimation}
							<a href={socialMedia.link} transition:scale={{ delay: socialMedia.id * 100 }}>
								<svelte:component this={socialMedia.icon} />
							</a>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	</section>
</div>
