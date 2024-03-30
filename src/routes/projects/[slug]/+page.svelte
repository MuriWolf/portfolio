<script lang="ts">
	import { type projectType } from '$lib/types/projectType';
	import Button from '$lib/components/ui/button/button.svelte';
	import Footer from "$lib/layout/Footer.svelte";
  import { techIcons } from "$lib/utils";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import type { CarouselAPI } from '$lib/components/ui/carousel/context';
  import * as Carousel from "$lib/components/ui/carousel/index";
  import { textContent, languageSelected } from '$lib/store';

  export let data;
  const project: projectType = data.project;

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

<main class="max-w-[1340px] mx-auto flex flex-col gap-4 xs:gap-8 my-4 xs:my-8">
    <section class="mx-4 xs:mx-8 rounded-3xl py-12 px-4 xs:px-6 sm:px-8 lg:px-16 shadow-claymorphism wrap
    ">
    <!-- bg-[linear-gradient(to_right_bottom,rgba(74,78,120,0.85),rgba(46,34,36,0.8)),url(/images/paintings/the-creation-of-adam.png)] -->
    <div class="max-w-[800px] bg-gradient-to-bl from-[#c2c1c115] to-[#b1b2b413] bg-clip-padding border-0 xs:border-4 border-transparent p-0 sm:px-4 backdrop-blur-sm rounded-2xl flex flex-col mx-auto glass-border after:content-['Website_Screenshots'] after:bg-c-background after:absolute after:-bottom-[18px] after:rounded-lg after:p-1 after:px-4 after:text-[12px] after:xs:text-[13px] after:text-center after:text-gray-50 after:font-bold after:font-title after:translate-x-1/2 after:right-1/2 after:max-md:hidden {project.images.length == 1 ? 'sm:py-7' : 'sm:pt-7 sm:pb-4'}">
            <div class="flex items-center gap-6 mb-6">
                <a href="/#projects" class="bg-gradient-to-b from-c-tertiary to-[#B5F186] hover:brightness-90 active:scale-95 transition-all w-[52px] h-[52px] justify-center items-center shadow-claymorphism rounded-lg hidden md:flex">
                  <svg width="30" height="35" viewBox="0 0 30 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.629499 15.6295C-0.207554 16.4665 -0.207554 17.8259 0.629499 18.663L11.3438 29.3772C12.1808 30.2143 13.5402 30.2143 14.3773 29.3772C15.2143 28.5402 15.2143 27.1808 14.3773 26.3438L7.31253 19.2857H27.8572C29.0424 19.2857 30 18.3281 30 17.1429C30 15.9576 29.0424 15 27.8572 15H7.31923L14.3706 7.94197C15.2076 7.10492 15.2076 5.74554 14.3706 4.90849C13.5335 4.07144 12.1741 4.07144 11.3371 4.90849L0.622803 15.6228L0.629499 15.6295Z" fill="#221627"/>
                  </svg>
                </a>
                <h1 class="flex-1 text-white text-center font-title font-bold text-shadow-sm text-lg max-xs:uppercase xs:text-xl sm:text-2xl md:text-3xl bg-c-background bg-opacity-75 p-2 rounded-lg shadow-inner">{project.title.pt}</h1>
            </div>
            {#if project.images.length == 1}
            <div class="mx-auto rounded-2xl overflow-hidden inline-block border-2 border-c-background/40">
                <img src={project.images[0]} alt="" height="736" width="736" class="block mx-auto" >
            </div>
            {:else}
            <Carousel.Root 
            bind:api
            opts={{
                skipSnaps: true,
                loop: true,
                breakpoints: {
                }
            }}
            plugins={[
                // Autoplay({
                //     delay: 2750,
                    // stopOnMouseEnter: true,
                //     stopOnInteraction: false
                // }),
            ]}
            class="w-full rounded-3xl overflow-hidden bg-opacity-0 bg-black"
        >
            <Carousel.Content class="">
              {#each project.images as image}
                  <Carousel.Item class="flex flex-col gap-5">
                    <img
                      src={image}
                      alt={``}
                      class="rounded-3xl object-cover h-full w-full border-2 border-c-background/40"
                    />
                  </Carousel.Item>
              {/each}
            </Carousel.Content>
            <footer class=" p-2 mt-2 flex items-center justify-center gap-4 max-xs:px-4">
                <Carousel.Previous style="all: unset;">
                    <button class="text-c-background active:scale-90 transition-all ease-in-out duration-150 flex" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" viewBox="0 0 256 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"/></svg>
                    </button>
                </Carousel.Previous>
                <div class="flex gap-4 items-center justify-center">
                {#each project.images as image (project.images.indexOf(image)) }
                        <button on:click={() => api.scrollTo(project.images.indexOf(image))} class="w-4 h-4 border-2 border-white transition-all duration-300 rounded-full {current == project.images.indexOf(image) +1 ? ' relative rotate-45 bg-c-background' : ''}"></button>
                    {/each}
                </div>
                <Carousel.Next style="all: unset;">
                    <button class="text-c-background active:scale-90 transition-all ease-in-out duration-150">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" viewBox="0 0 256 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/></svg>
                    </button>
                </Carousel.Next>
            </footer>
          </Carousel.Root>
            {/if}
        </div>
        <div class="top-plane"></div>
        <div class="bottom-plane"></div>
    </section>
    <section class="relative gradient-dark-two py-12 px-8 lg:px-16 rounded-3xl mx-4 xs:mx-8 text-center">
      {#if project.description[$languageSelected]}
        <h2 class="text-gray-50 font-title font-semibold text-3xl mb-4">{$textContent.projectPage.description[$languageSelected]}</h2>
        <div class="flex flex-col gap-4 max-w-lg mx-auto mb-12">
          {#each project.description[$languageSelected] as paragraph}
            <p class="text-gray-100 leading-7 tracking-wide text-start">{paragraph}</p>  
          {/each}
       </div>
      {/if}
        <h2 class="text-gray-50 font-title font-semibold text-3xl  mb-4">{$textContent.projectPage.techs[$languageSelected]}</h2>
        <div class="max-w-lg flex flex-wrap flex-row justify-center gap-4 mx-auto mb-12">
        {#each techIcons.filter((techIcon) =>  project.technologies.includes(techIcon.title.toLowerCase())) as item}
          <Tooltip.Root openDelay={0}>
            <Tooltip.Trigger class="min-w-16 sm:min-w-24 hover:backdrop-brightness-200 shadow-md rounded-xl overflow-hidden transition-all duration-300 ease-in-outhover:shadow-none">
                <img src={item.url} alt="" class="rounded-xl p-1" />
            </Tooltip.Trigger>
            <Tooltip.Content sideOffset={12} >
                <p class="font-semibold">{item.title}</p>
            </Tooltip.Content>
        </Tooltip.Root>
        {/each}
        </div>

        <h2 class="text-gray-50 font-title font-semibold text-3xl  mb-4">{$textContent.projectPage.depth[$languageSelected]}</h2>
        <div class="flex max-sm:flex-col justify-center gap-6 items-center max-w-lg mx-auto mb-12">
          <a href={project.liveUrl} class="flex-[2] hover:flex-[3] focus-within:flex-[3] transition-all duration-300 w-full" target="_blank">
            <Button class="bg-gradient-to-b from-c-tertiary to-[#B5F186] w-full block text-c-darker-background font-title font-bold text-lg xs:text-xl rounded-xl text-shadow shadow-[#00000066] active:bg-c-tertiary hover:bg-c-tertiary hover:brightness-90 active:scale-95 transition-all shadow-claymorphism-2 ">Live View</Button>
          </a>
          {#if !(project.codeUrl === "private")}
            <a href={project.codeUrl} class="flex-[2] hover:flex-[3] focus-within:flex-[3] transition-all duration-300 w-full" target="_blank">
              <Button class="bg-gradient-to-b from-c-primary to-[#55598D] w-full block !text-c-body-text font-title font-bold text-lg xs:text-xl rounded-xl text-shadow shadow-[#00000066] active:bg-c-primary hover:bg-c-primary hover:brightness-90 active:scale-95 transition-all shadow-claymorphism-2">Discover More</Button>
            </a>
          {/if}
        </div>

        <!-- <h2 class="text-gray-50 font-title font-semibold text-3xl  mb-4">More</h2> -->
        <div class="flex justify-center gap-6 items-center max-w-lg mx-auto ">
          <a href="/#projects" class="flex-1 w-full -mt-5">
            <Button class="bg-gradient-to-b from-white to-gray-300 mx-auto hover:w-full block text-c-darker-background font-title font-bold text-lg xs:text-xl rounded-xl text-shadow shadow-[#00000066] active:bg-white hover:bg-white hover:brightness-90 active:scale-95 transition-all duration-300 shadow-claymorphism-2 w-3/5">See Other Projects </Button>
          </a>
</div>
    </section>
</main>

<Footer />

<style lang="scss">
    // @import "compass/css3";

$nodeStreak: rgba(153, 156, 201, 0.5);
$computationalFogTop: rgba(91, 95, 151, 0);
$computationalFogBot: rgba(91, 95, 151, 0);
$visualDistortionZapper: 360px;
$nanoVelocity: 3s;

.wrap {
  perspective: $visualDistortionZapper;
  perspective-origin: 50% 50%;  
  overflow: hidden;
  background: linear-gradient($computationalFogTop 25%, $nodeStreak 50%, $nodeStreak 50%, $computationalFogBot 100%);  
  background-color: #5B5F97;
}

.top-plane {
  width: 200%;
  height: 130%;
  position: absolute;
  bottom: -30%;
  left: -50%;
  background-image: -webkit-linear-gradient($nodeStreak 2px, transparent 2px), -webkit-linear-gradient(left, $nodeStreak 2px, transparent 2px);
  background-size: 100px 100px,100px 100px;
  background-position: -1px -1px,-1px -1px;
  transform: rotateX(85deg);
  animation: planeMoveTop $nanoVelocity infinite linear;
}

.bottom-plane {
  @extend .top-plane;
  transform: rotateX(-85deg);
  top: -30%;
  animation: planeMoveBot $nanoVelocity infinite linear;
}

@keyframes planeMoveTop {
  from {
    background-position: 0px -100px,0px 0px;
  }
  to {
    background-position: 0px 0px, 100px 0px;
  }
}

@keyframes planeMoveBot {
  from {
    background-position: 0px 0px,0px 0px;
  }
  to {
    background-position: 0px -100px, 100px 0px;
  }
}

@media (max-height: 350px) {
  .wrap {
    perspective: $visualDistortionZapper - 150;
  }
}

</style>