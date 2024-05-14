<script lang="ts">
	import { Progress } from '$lib/components/ui/progress';
	import type { CarouselAPI } from './../components/ui/carousel/context';
	import Autoplay from 'embla-carousel-autoplay';
    import { textContent, languageSelected } from '$lib/store';
    import * as Carousel from "$lib/components/ui/carousel/index";
	import Saos from 'saos';

    let api: CarouselAPI;
    let count = 0;
    let current = 0;

    $: if (api) {
        count = api.scrollSnapList().length;
        current = api.selectedScrollSnap() + 1;
        api.on("select", () => {
            current = api.selectedScrollSnap() + 1;
        });
    }
</script>

<!-- <Saos animation={"from-right 0.4s cubic-bezier(0.645, 0.045, 0.355, 1.000) both"} once={true}>
</Saos> -->
    <section id="testimonials" class="relative bg-black py-12 xs:px-6 sm:px-8 rounded-2xl z-0 shadow-xl shadow-stone-900"> <!-- bg-test -->
        <hgroup class="mb-8 sm:mb-16 max-xs:px-4">
            <h2 class="font-title font-bold text-2xl xs:text-3xl text-c-body-text-light mb-6 lowercase">5. {$textContent.testimonials.title[$languageSelected] ?? "TESTIMONIALS"}</h2>
            {#if $textContent}
                <p class="xs:text-lg text-c-body-text-light/85 max-w-2xl">{$textContent.testimonials.subtitle[$languageSelected]}</p>
            {/if}
        </hgroup>
        <div class="flex gap-16 relative z-10 w-full">
            <Carousel.Root 
                bind:api
                opts={{
                    skipSnaps: true,
                    loop: true,  
                }}
                plugins={[
                    // Autoplay({
                    //     delay: 2750,
                    //     stopOnMouseEnter: true,
                    //     stopOnInteraction: false
                    // }),
                ]}
                class="w-full rounded-xl overflow-hidden"
            >
            <Carousel.Content>
                {#each Array(4) as _, i (i)}
                    <Carousel.Item class="basis-[92%] xs:mx-4 sm:basis-[60%] min-[960px]:basis-1/3 relative z-10">
                        <div class="py-6 px-7 rounded-[10px] backdrop-blur-md text-c-body-text-light/85 caroucel-testimonial-item">
                            <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 7.5C0 3.35625 3.35625 0 7.5 0H8C9.10625 0 10 0.89375 10 2C10 3.10625 9.10625 4 8 4H7.5C5.56875 4 4 5.56875 4 7.5V8H8C10.2063 8 12 9.79375 12 12V16C12 18.2062 10.2063 20 8 20H4C1.79375 20 0 18.2062 0 16V14V12V7.5ZM16 7.5C16 3.35625 19.3563 0 23.5 0H24C25.1063 0 26 0.89375 26 2C26 3.10625 25.1063 4 24 4H23.5C21.5688 4 20 5.56875 20 7.5V8H24C26.2062 8 28 9.79375 28 12V16C28 18.2062 26.2062 20 24 20H20C17.7938 20 16 18.2062 16 16V14V12V7.5Z" fill="#ffff"/>
                                </svg>                
                            <p class="mt-3">Estou completamente impressionado com a expertise e dedicação desta empresa. Seu comprometimento em superar expectativas é evidente em cada interação. Recomendo sem hesitar. </p>
                        </div>
                        <div class="flex items-center gap-4 py-3.5 px-7 bg-[#EFEFEF] rounded-[10px] mt-4 shadow-claymorphism">
                            <img src="" alt="" height="36" width="36" class="rounded-full">
                            <hgroup>
                                <h2 class="text-c-darker-background font-title font-bold text-lg">Default Name</h2>
                                <h3 class="text-xs text-black/70 font-title font-bold">Student of GFY</h3>
                            </hgroup>
                        </div>
                    </Carousel.Item>
                {/each}
                </Carousel.Content>
                <footer class=" p-2 mt-6 flex items-center justify-center gap-4 max-xs:px-4">
                    <Carousel.Previous style="all: unset;">
                        <button class="text-white active:scale-90 transition-all ease-in-out duration-150 flex" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" viewBox="0 0 256 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"/></svg>
                        </button>
                    </Carousel.Previous>
                    {#each Array(4) as _, i (i)}
                        <button on:click={() => api.scrollTo(i)} class="w-4 h-4 rounded-full border-2 border-green-50 transition-all duration-300 {current == i +1 ? 'bg-white' : ''}"></button>
                    {/each}
                    <!-- <Progress value={current} max={count} progressColor="bg-c-secondary" class=" transition-all duration-500 max-w-96 shadow-md" /> -->
                    <Carousel.Next style="all: unset;">
                        <button class="text-white active:scale-90 transition-all ease-in-out duration-150">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" viewBox="0 0 256 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/></svg>
                        </button>
                    </Carousel.Next>
                </footer>
            </Carousel.Root>
        </div>
        <img src="Torus.png" alt="" class="absolute top-1/2 -translate-y-1/2 right-20 z-0 hidden md:block"  draggable="false">
    </section>


<style>
    @property --testimonial-bg-c1 {
        syntax: '<color>';
        initial-value: #f7f7f75d;
        inherits: false;
    }

    @property --testimonial-bg-c2 {
        syntax: '<color>';
        initial-value: #f7f7f717;
        inherits: false;
    }

    .caroucel-testimonial-item {
        background: linear-gradient(135deg, var(--testimonial-bg-c1), var(--testimonial-bg-c2));
        transition: --testimonial-bg-c1 500ms, --testimonial-bg-c2 500ms;
    }

    .caroucel-testimonial-item:hover {
        --testimonial-bg-c1: #f7f7f744;
        --testimonial-bg-c2:#E8AEB72c;
    }
</style>