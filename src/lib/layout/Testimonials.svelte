<script lang="ts">
     import * as Carousel from "$lib/components/ui/carousel/index";
</script>

<section id="testimonials" class="col-span-2 relative gradient-dark-two py-10 px-8 lg:px-16 rounded-3xl z-0">
    <hgroup class="mb-16">
        <h2 class="font-title font-bold text-3xl text-c-body-text mb-6">5. TESTIMONIALS</h2>
        <p class="text-lg text-c-body-text max-w-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad</p>
    </hgroup>
    <div class="flex gap-16 relative z-10">
        <Carousel.Root 
            opts={{
                skipSnaps: true,
                loop: true,
                
            }}
            class="w-full"
        >
        <Carousel.Content>
            {#each Array(4) as _, i (i)}
                <Carousel.Item class="basis-1/3 px-5 relative z-10">
                    <div class="py-6 px-7 rounded-md backdrop-blur-md bg-gradient-to-br from-[#f7f7f75d] hover:from-[#f7f7f744] to-[#f7f7f717] hover:to-[#E8AEB72c] transition-colors duration-500 text-c-body-text">
                        <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 7.5C0 3.35625 3.35625 0 7.5 0H8C9.10625 0 10 0.89375 10 2C10 3.10625 9.10625 4 8 4H7.5C5.56875 4 4 5.56875 4 7.5V8H8C10.2063 8 12 9.79375 12 12V16C12 18.2062 10.2063 20 8 20H4C1.79375 20 0 18.2062 0 16V14V12V7.5ZM16 7.5C16 3.35625 19.3563 0 23.5 0H24C25.1063 0 26 0.89375 26 2C26 3.10625 25.1063 4 24 4H23.5C21.5688 4 20 5.56875 20 7.5V8H24C26.2062 8 28 9.79375 28 12V16C28 18.2062 26.2062 20 24 20H20C17.7938 20 16 18.2062 16 16V14V12V7.5Z" fill="#E8AEB7"/>
                            </svg>                
                        <p class="mt-3">Estou completamente impressionado com a expertise e dedicação desta empresa. Seu comprometimento em superar expectativas é evidente em cada interação. Recomendo sem hesitar. </p>
                    </div>
                    <div class="flex items-center gap-4 py-3.5 px-7 bg-[#EFEFEF] rounded-xl mt-4 shadow-claymorphism">
                        <img src="" alt="" height="36" width="36" class="rounded-full">
                        <hgroup>
                            <h2 class="text-c-darker-background font-title font-bold text-lg">Default Name</h2>
                            <h3 class="text-xs bg-c-background text-c-secondary font-title font-bold pl-2">Student of GFY</h3>
                        </hgroup>
                    </div>
                </Carousel.Item>
            {/each}
            </Carousel.Content>
        </Carousel.Root>
    </div>
    <img src="Torus.png" alt="" class="absolute top-1/2 -translate-y-1/2 right-20 z-0"  draggable="false">
</section>