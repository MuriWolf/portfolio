<script lang="ts">
	import { enhance } from '$app/forms';
	import logo from '$lib/assets/logo.svg';
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { languageSelected, textContent } from '$lib/store';
	import { openAsideMobile } from '$lib/store'; 

    let languageSwitcherForm;

    function toggleAsideMobile() {
        openAsideMobile.update((value) => value = !value);
    }

    function submitNewLanguage({ action }) {
        const newLanguage = action.searchParams.get('language');
        languageSelected.set(newLanguage);
    }
</script>

<header class="flex justify-between items-center">
    <img src={logo} alt="logo" />
    <nav class="ml-auto hidden min-[980px]:block">
        <ul class="flex gap-x-8 list-decimal text-c-body-text text-lg">
            {#if $textContent}
                {#each $textContent.nav as item (item.id)}
                    <li class="hover:text-black text-c-body-text-light transition-all duration-200 ease-in font-semibold"><a href={`#${(item.en).toLowerCase()}`}>{item[$languageSelected]}</a></li>
                {/each}
            {/if}
        </ul>
    </nav>
   
    <DropdownMenu.Root>
        <DropdownMenu.Trigger>
            <button class="ml-4 hidden min-[980px]:block text-white hover:text-black transition-all duration-200 ease-in">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <path d="M17.85 33L24.675 15H27.825L34.65 33H31.5L29.8875 28.425H22.6125L21 33H17.85ZM6 28.5L3.9 26.4L11.475 18.825C10.6 17.95 9.80625 16.95 9.09375 15.825C8.38125 14.7 7.725 13.425 7.125 12H10.275C10.775 12.975 11.275 13.825 11.775 14.55C12.275 15.275 12.875 16 13.575 16.725C14.4 15.9 15.2563 14.7438 16.1438 13.2563C17.0313 11.7688 17.7 10.35 18.15 9H1.5V6H12V3H15V6H25.5V9H21.15C20.625 10.8 19.8375 12.65 18.7875 14.55C17.7375 16.45 16.7 17.9 15.675 18.9L19.275 22.575L18.15 25.65L13.575 20.9625L6 28.5ZM23.55 25.8H28.95L26.25 18.15L23.55 25.8Z" fill="currentColor"/>
                </svg>
            </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content class="p-0">
          <DropdownMenu.Group>
            <form method="POST" bind:this={languageSwitcherForm} use:enhance={submitNewLanguage}>
                <button formaction="/?/setLanguage&language=pt" class="flex gap-x-2 items-center hover:bg-gray-100 p-3 transition-all duration-150 hover:cursor-pointer font-semibold w-full">
                    <img src="images/flags/br.svg" width="32" alt="brazil flag"> <p>Português</p>
                </button>
                <DropdownMenu.Separator class="my-0" />
                <button formaction="/?/setLanguage&language=en" class="flex gap-x-2 items-center hover:bg-gray-100 p-3 transition-all duration-150 hover:cursor-pointer font-semibold w-full">
                    <img src="images/flags/us.svg" width="32" alt="United States of America flag"> <p>English</p>
                </button>
            </form>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    <button class="min-[980px]:hidden text-[#f7f7f7] hover:text-black transition-all ease-in" on:click={toggleAsideMobile}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.28571 0H13.7143C14.3205 0 14.9019 0.337142 15.3305 0.937258C15.7592 1.53737 16 2.35131 16 3.2C16 4.04869 15.7592 4.86263 15.3305 5.46274C14.9019 6.06286 14.3205 6.4 13.7143 6.4H2.28571C1.67951 6.4 1.09812 6.06286 0.66947 5.46274C0.240816 4.86263 0 4.04869 0 3.2C0 2.35131 0.240816 1.53737 0.66947 0.937258C1.09812 0.337142 1.67951 0 2.28571 0ZM18.2857 25.6H29.7143C30.3205 25.6 30.9019 25.9371 31.3305 26.5373C31.7592 27.1374 32 27.9513 32 28.8C32 29.6487 31.7592 30.4626 31.3305 31.0627C30.9019 31.6629 30.3205 32 29.7143 32H18.2857C17.6795 32 17.0981 31.6629 16.6695 31.0627C16.2408 30.4626 16 29.6487 16 28.8C16 27.9513 16.2408 27.1374 16.6695 26.5373C17.0981 25.9371 17.6795 25.6 18.2857 25.6ZM2.28571 12.8H29.7143C30.3205 12.8 30.9019 13.1371 31.3305 13.7373C31.7592 14.3374 32 15.1513 32 16C32 16.8487 31.7592 17.6626 31.3305 18.2627C30.9019 18.8629 30.3205 19.2 29.7143 19.2H2.28571C1.67951 19.2 1.09812 18.8629 0.66947 18.2627C0.240816 17.6626 0 16.8487 0 16C0 15.1513 0.240816 14.3374 0.66947 13.7373C1.09812 13.1371 1.67951 12.8 2.28571 12.8Z" fill="currentColor"/>
        </svg>			
    </button>
</header>