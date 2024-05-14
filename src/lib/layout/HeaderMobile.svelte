<script lang="ts">
	import { scale, slide } from "svelte/transition";
	import { openAsideMobile } from "$lib/store";
    import { Separator } from "$lib/components/ui/separator";
	import { bounceIn } from "svelte/easing";
	import GithubIcon from "$lib/assets/githubIcon.svelte";
	import LinkedinIcon from "$lib/assets/linkedinIcon.svelte";
	import TelegramIcon from "$lib/assets/telegramIcon.svelte";
	import RedditIcon from "$lib/assets/redditIcon.svelte";
	import { onMount } from "svelte";

    let openAnimation = false;

    const internalLinks = [
        {id: 1, name: "Intro", link: "hero"},
        {id: 2, name: "About", link: "about"},
        {id: 3, name: "Techs", link: "technologies"},
        {id: 4, name: "Projects", link: "projects"},
        {id: 5, name: "Testimonials", link: "testimonials"},
        {id: 6, name: "Contact", link: "contact"},
    ];

    const socialMedias = [
        { id: 1, name: "GitHub", icon: GithubIcon, link: "" },
        { id: 2, name: "Linkedin", icon: LinkedinIcon, link: "" },
        { id: 3, name: "Telegram", icon: TelegramIcon, link: "" },
        { id: 4, name: "Reddit", icon: RedditIcon, link: "" }
    ]

    onMount(() => {
        openAnimation = true;
    })

    function closeAsideMobile() {
        openAsideMobile.update((value) => value = false);
        openAnimation = false;
    }

</script>

<div class="fixed z-50 top-0 w-screen h-screen bg-black bg-opacity-10 backdrop-blur-xl ">
    <section class="h-[90%] border-b-4 border-white/80 rounded-b-2xl flex bg-black/60 transition-all p-6 shadow-inner-md {openAnimation ? '' : ''}" in:slide={{duration: 200}} out:slide={{duration: 100}}>
        <div class="flex-2">
            <nav class="text-c-body-text text-2xl font-medium">
                <ol class="ml-0 flex flex-col gap-4 w-full">
                    {#each internalLinks as internalLink (internalLink.id)}
                        {#if openAnimation}    
                            <a href={`#${internalLink.link}`} class="block hover:opacity-65 text-c-body-text-light hover:text-shadow-sm shadow-gray-600 transition-all duration-150 ease-in" transition:scale={{delay: internalLink.id * 50}}>
                                <li>{internalLink.id}. {internalLink.name}</li>
                            </a>
                        {/if}
                    {/each}
                </ol>
            </nav>
        </div>
        <div class="flex-1 h-full flex flex-col">
            <button on:click={closeAsideMobile} class="w-8 h-8 ml-auto block hover:opacity-65 text-c-body-text-light transition-all duration-100 ease-in">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" fill="currentColor"/></svg>
            </button>
            <ul class="flex flex-col gap-y-4 mt-auto ml-auto items-end justify-center text-c-body-text">
                <li class="ml-4 -mb-1">
                    <button >
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 36 36" fill="none">
                            <path d="M17.85 33L24.675 15H27.825L34.65 33H31.5L29.8875 28.425H22.6125L21 33H17.85ZM6 28.5L3.9 26.4L11.475 18.825C10.6 17.95 9.80625 16.95 9.09375 15.825C8.38125 14.7 7.725 13.425 7.125 12H10.275C10.775 12.975 11.275 13.825 11.775 14.55C12.275 15.275 12.875 16 13.575 16.725C14.4 15.9 15.2563 14.7438 16.1438 13.2563C17.0313 11.7688 17.7 10.35 18.15 9H1.5V6H12V3H15V6H25.5V9H21.15C20.625 10.8 19.8375 12.65 18.7875 14.55C17.7375 16.45 16.7 17.9 15.675 18.9L19.275 22.575L18.15 25.65L13.575 20.9625L6 28.5ZM23.55 25.8H28.95L26.25 18.15L23.55 25.8Z" fill="white"/>
                        </svg>
                    </button>
                </li>
                <Separator class="mb-3 w-8 border-2 rounded" />
                {#each socialMedias as socialMedia (socialMedia.id)}
                    <li class="hover:opacity-65 text-c-body-text-light hover:scale-110 transition-all ease-in">
                        {#if openAnimation}   
                            <a href={socialMedia.link} transition:scale={{delay: (socialMedia.id * 100)}}>
                                <svelte:component this={socialMedia.icon} />
                            </a>
                        {/if}
                    </li>
                {/each}
            </ul>
        </div>
    </section>
</div>