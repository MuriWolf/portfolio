<script lang="ts">
	import { enhance } from '$app/forms';
	import { scale, slide, fade } from 'svelte/transition';
	import { languageSelected, openAsideMobile, textContent } from '$lib/store';
	import { Separator } from '$lib/components/ui/separator';
	import { bounceIn } from 'svelte/easing';
	import { onMount } from 'svelte';
    import brazilFlag from '$lib/assets/icons/flags/br.svg'
    import usaFlag from '$lib/assets/icons/flags/us.svg'
    import { createEventDispatcher } from 'svelte';
	import SocialMedias from '$lib/components/SocialMedias.svelte';
    const dispatchEvent = createEventDispatcher();
	let openAnimation = false;

	// const socialMedias = [
	// 	{ id: 1, name: 'GitHub', icon: GithubIcon, link: 'https://github.com/muriWolf' },
	// 	{ id: 2, name: 'Linkedin', icon: LinkedinIcon, link: 'https://www.linkedin.com/in/murillo-pinheiro-de-oliveira-2b931724a/' },
	// 	{ id: 3, name: 'Telegram', icon: TelegramIcon, link: 'https://web.telegram.org/k/#@MuriWolf' },
	// 	{ id: 4, name: 'Reddit', icon: RedditIcon, link: 'https://web.telegram.org/k/#@MuriWolf' },
	// ];

	onMount(() => {
		openAnimation = true;
	});

	let languageSwitcherForm;
	function closeAsideMobile() {
		dispatchEvent("closeNavMoble");
	}

	function submitNewLanguage({ action }: any) {
		const newLanguage = action.searchParams.get('language');
		languageSelected.set(newLanguage);
	}
</script>

<div class="fixed z-50 top-0 w-screen h-screen bg-black bg-opacity-10 backdrop-blur-xl">
	<section
		class="h-[80%] min-h-[414px] max-h-[800px] border-b-4 border-c-primary-darker w-full rounded-b-2xl flex bg-c-primary transition-all p-6 shadow-inner-md {openAnimation
			? ''
			: ''}"
		in:slide={{ duration: 200 }}
		out:slide={{ duration: 100 }}
	>
		<div class="flex-2">
			<nav class="text-c-body-text text-2xl font-medium" >
				<ol class="ml-0 flex flex-col gap-6 w-full ">
					{#each $textContent.nav as item (item.id)}
						{#if openAnimation}
							<a
								href={`#${item.en.toLowerCase()}`}
								class="block hover:text-white text-c-text-darker font-semibold hover:text-shadow-sm transition-all duration-150 ease-in"
								transition:scale={{ delay: item.id * 50 }}
							>
								<li>{item[$languageSelected]}</li>
							</a>
						{/if}
					{/each}
				</ol>
			</nav>
		</div>
		<div class="flex-1 h-full flex flex-col">
			<button
				on:click={closeAsideMobile}
				class="w-8 h-8 ml-auto block hover:text-primary text-c-text-darker transition-all duration-100 ease-in"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
					><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
						d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
						fill="currentColor"
					/></svg
				>
			</button>
			<ul class="flex flex-col gap-y-4 mt-auto ml-auto items-end justify-center text-c-body-text" in:slide={{ duration: 150 }} out:slide={{ duration: 100 }} >
				<form method="POST" bind:this={languageSwitcherForm} use:enhance={submitNewLanguage}>
					<button
						formaction="/?/setLanguage&language=pt"
						class="flex gap-x-2 items-center p-3 pr-0 transition-all duration-150 hover:cursor-pointer font-semibold w-full"
					>
						<img src={brazilFlag} width="32" class="rounded-[3.5px]" alt="brazil flag" />
					</button>
					<button
						formaction="/?/setLanguage&language=en"
						class="flex gap-x-2 items-center p-3 pr-0 transition-all duration-150 hover:cursor-pointer font-semibold w-full"
					>
						<img src={usaFlag} width="32" class="rounded-[3.5px]" alt="United States of America flag" />
					</button>
				</form>
				<Separator class="mb-3 w-8 border-2 border-c-text-darker rounded" />
                <SocialMedias orientation="vertical" />
			</ul>
		</div>
	</section>
</div>