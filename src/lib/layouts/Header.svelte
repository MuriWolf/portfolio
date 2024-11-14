<script lang="ts">
	import logo from '$lib/assets/images/logo.png';
	import { enhance } from '$app/forms';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { languageSelected } from '$lib/store';
	import Translate from '$lib/assets/icons/Translate.svelte';
	import brazilFlag from '$lib/assets/icons/flags/br.svg';
	import usaFlag from '$lib/assets/icons/flags/us.svg';
	import { createEventDispatcher } from 'svelte';
	const dispatchEvent = createEventDispatcher();

	function toggleNavMobile() {
		dispatchEvent('openNavMobile');
	}

	let languageSwitcherForm;
	function submitNewLanguage({ action }) {
		const newLanguage = action.searchParams.get('language');
		languageSelected.set(newLanguage);
	}
</script>

<header class="flex justify-between items-center rounded-2xl mx-2 sm:mx-4">
	<a
		href="/"
		title={$languageSelected == 'pt' ? 'Ir para a página inicial' : 'Go to the main page'}
		class="flex items-center justify-center text-2xl font-bold text-white w-16 h-16 gradient rounded-full"
	>
		M<span class="text-black">W</span>
	</a>
	<slot name="header-center" />
	<slot name="header-left">
		<button
			class="min-[880px]:hidden text-c-text-darker bg-c-primary-darker p-2 rounded-xl"
			on:click={toggleNavMobile}
			aria-label="toggle nav mobile"
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" fill="currentColor"
				><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
					d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
				/></svg
			>
		</button>

		<div class="hidden min-[880px]:block">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<button
						class="flex items-center justify-end text-c-text-darker hover:text-white transition-all ease-out w-12 sm:w-16"
					>
						<Translate />
					</button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content
					class="p-0 bg-c-primary-light backdrop-blur-sm border-c-primary-light "
				>
					<DropdownMenu.Group>
						<form method="POST" bind:this={languageSwitcherForm} use:enhance={submitNewLanguage}>
							<button
								formaction="/?/setLanguage&language=pt"
								class="flex gap-x-2 items-center bg-c-primary-light hover:bg-c-primary text-c-text-darker p-3 transition-all duration-150 hover:cursor-pointer font-semibold w-full"
							>
								<img src={brazilFlag} width="32" alt="brazil flag" />
								<p>Português</p>
							</button>
							<DropdownMenu.Separator class="my-0 mx-0 w-full bg-c-primary-darker" />
							<button
								formaction="/?/setLanguage&language=en"
								class="flex gap-x-2 items-center hover:bg-c-primary text-c-text-darker p-3 transition-all duration-150 hover:cursor-pointer font-semibold w-full"
							>
								<img src={usaFlag} width="32" alt="United States of America flag" />
								<p>English</p>
							</button>
						</form>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</slot>
</header>
