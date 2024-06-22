<script lang="ts">
    import logo from '$lib/assets/images/logo.png';
	import { fade } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { languageSelected, textContent } from '$lib/store';
	import { openAsideMobile } from '$lib/store';
	import Translate from '$lib/assets/icons/Translate.svelte';
    import brazilFlag from '$lib/assets/icons/flags/br.svg'
    import usaFlag from '$lib/assets/icons/flags/us.svg'

	let languageSwitcherForm;

	function toggleAsideMobile() {
		openAsideMobile.update((value) => (value = !value));
	}

	function submitNewLanguage({ action }) {
		const newLanguage = action.searchParams.get('language');
		languageSelected.set(newLanguage);
	}

</script>

<header class="flex justify-between items-center bg-c-primary p-4 md:px-8 rounded-2xl border-[1px] border-c-primary-darker mx-4">
    <a href="/">
        <img src={logo} alt="website logo" width="64" height="64" class="rounded-full">
    </a>
    <slot />
   
   <DropdownMenu.Root>
        <DropdownMenu.Trigger>
            <button class="flex items-center justify-end text-c-text-darker hover:text-primary transition-all duration-100 ease-in-out w-16">
                <Translate />
           </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content class="p-0 bg-c-primary-light/75 backdrop-blur-sm border-c-primary-darker ">
            <DropdownMenu.Group>
                <form method="POST" bind:this={languageSwitcherForm} use:enhance={submitNewLanguage}>
                    <button
                        formaction="/?/setLanguage&language=pt"
                        class="flex gap-x-2 items-center hover:bg-c-primary p-3 transition-all duration-150 hover:cursor-pointer font-semibold w-full"
                    >
                        <img src={brazilFlag} width="32" alt="brazil flag" />
                        <p>Português</p>
                    </button>
                    <DropdownMenu.Separator class="my-0 mx-0 w-full bg-c-primary-darker" />
                    <button
                        formaction="/?/setLanguage&language=en"
                        class="flex gap-x-2 items-center hover:bg-c-primary p-3 transition-all duration-150 hover:cursor-pointer font-semibold w-full "
                    >
                        <img src={usaFlag} width="32" alt="United States of America flag" />
                        <p>English</p>
                    </button>
                </form>
            </DropdownMenu.Group>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
</header>

