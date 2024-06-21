<script lang="ts">
    import type { CarouselAPI } from './../components/ui/carousel/context';
    import * as Carousel from '$lib/components/ui/carousel/index'
    import { textContent, languageSelected } from '$lib/store';


    let api: CarouselAPI;
    let count = 0;
    let current = 0;

    $: if (api) {
        count = api.scrollSnapList().length;
        current = api.selectedScrollSnap() + 1;
        api.on('select', () => {
            current = api.selectedScrollSnap() + 1;
        });
    }
</script>

<section
	id="testimonials"
	class="relative mt-16">
	<h2 class="text-c-text-darker text-3xl font-bold mb-1">What people say</h2>
    <p class="text-c-text text-lg mb-8">Some feedback from people I worked with. I hope yours is next.</p>
	<div class="flex gap-16 relative z-10 w-full ">
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
			<!-- xs:mx-2 -->
			<Carousel.Content>
				{#each $textContent.testimonials.content as testimonial, i (i)}
					<Carousel.Item
						class="basis-[100%] sm:basis-[70%] min-[960px]:basis-[40%] relative z-10 text-c-text" 
					>
						<div
							class="py-6 px-7 rounded-[10px] bg-c-primary border-[1px] border-c-primary-darker"
						>
							<svg
								width="28"
								height="20"
								viewBox="0 0 28 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M0 7.5C0 3.35625 3.35625 0 7.5 0H8C9.10625 0 10 0.89375 10 2C10 3.10625 9.10625 4 8 4H7.5C5.56875 4 4 5.56875 4 7.5V8H8C10.2063 8 12 9.79375 12 12V16C12 18.2062 10.2063 20 8 20H4C1.79375 20 0 18.2062 0 16V14V12V7.5ZM16 7.5C16 3.35625 19.3563 0 23.5 0H24C25.1063 0 26 0.89375 26 2C26 3.10625 25.1063 4 24 4H23.5C21.5688 4 20 5.56875 20 7.5V8H24C26.2062 8 28 9.79375 28 12V16C28 18.2062 26.2062 20 24 20H20C17.7938 20 16 18.2062 16 16V14V12V7.5Z"
									fill="#505050"
								/>
							</svg>
							<p class="mt-3 font-semibold">
								{testimonial.quote[$languageSelected]}"
							</p>
						</div>
						<div
							class="flex items-center justify-between gap-4 py-3.5 px-7 bg-c-text-darker rounded-[10px] mt-4 shadow-claymorphism"
						>
							<!-- <img src="" alt="" height="36" width="36" class="rounded-full" /> -->
							<hgroup>
								<h2 class="text-c-darker-background font-title font-bold text-lg text-stone-50">{testimonial.name}</h2>
								<h3 class="text-xs text-white/70 font-title font-bold">{testimonial.occupation}</h3>
							</hgroup>
						</div>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
			{#if $textContent.testimonials.content.length > 1}
				<footer class="hidden md:flex items-center justify-center gap-4 p-2 mt-6 max-xs:px-4">
					<Carousel.Previous style="all: unset;" class="!cursor-pointer">
						<button class="text-white active:scale-90 transition-all ease-in-out duration-150 flex">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								fill="currentColor"
								viewBox="0 0 256 512"
								><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
									d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"
								/></svg
							>
						</button>
					</Carousel.Previous>
					{#each $textContent.testimonials.content as _, i (i)}
						<button
							on:click={() => api.scrollTo(i)}
							class="w-4 h-4 rounded-full transition-all duration-100 ease-in-out {current ==
							i + 1
								? 'bg-black'
								: 'bg-c-text/50 border-2'}"
						></button>
					{/each}
					<!-- <Progress value={current} max={count} progressColor="bg-c-secondary" class=" transition-all duration-500 max-w-96 shadow-md" /> -->
					<Carousel.Next style="all: unset;" class="!cursor-pointer">
						<button class="text-white active:scale-90 transition-all ease-in-out duration-150">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								fill="currentColor"
								viewBox="0 0 256 512"
								><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
									d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"
								/></svg
							>
						</button>
					</Carousel.Next>
				</footer>
			{/if}
		</Carousel.Root>
	</div>
	<!-- <img
		src="Torus.png"
		alt=""
		class="absolute top-1/2 -translate-y-1/2 right-20 z-0 hidden md:block"
		draggable="false"
	/> -->
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
		transition:
		--testimonial-bg-c1 500ms,
		--testimonial-bg-c2 500ms;			
	}

	.caroucel-testimonial-item:hover {
		--testimonial-bg-c1: #07beb831;
		--testimonial-bg-c2: #737cff18;
	}

	@supports(-moz-appearance:none) {
		.caroucel-testimonial-item {
			transition: all 0.5s;
			background: linear-gradient(135deg, #f7f7f75d, #f7f7f717);
		}

		.caroucel-testimonial-item:hover {
			background: linear-gradient(135deg, #273a44, #020444b2);
		}
	}
</style>