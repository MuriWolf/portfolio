<script lang="ts">
	import { textContent, languageSelected } from '$lib/store';
	import Saos from 'saos';
	import * as Tooltip from '$lib/components/ui/tooltip';
</script>

<Saos animation={'from-left 0.3s cubic-bezier(0.35, 0.5, 0.65, 0.95) both'} once={true}></Saos>
<section
	id="about"
	class="max-[956px]:col-span-2 h-full relative flex justify-between max-md:!bg-gradient-to-t max-md:!from-stone-200 max-md:!to-stone-200 section-default-style gap-4 gradient-white"
>
	<div class="flex-1 w-full flex flex-col gap-y-4 md:gap-y-6">
		<h2 class="font-title font-bold text-2xl xs:text-3xl text-black mb-2 lowercase">
			2. {$textContent.about.title[$languageSelected] ?? 'about'}
		</h2>
		{#each $textContent.about.paragraphs as paragraph}
			<p class="text-black/65 font-medium">{paragraph[$languageSelected]}</p>
		{/each}
	</div>
	<Tooltip.Root openDelay={300}>
		<Tooltip.Trigger class="sm:flex-1 hidden sm:flex min-[957px]:hidden xl:flex sm:w-40 sm:h-40 max-[956px]:w-60 max-[956px]:h-60 w-40 h-40 lg:w-48 lg:h-48 xl:w-60 xl:h-60">
			<div class="sm:flex-1 hidden sm:block min-[957px]:hidden xl:block mb-auto">
				<img
					src="/images/photos/me3.webp"
					width="240"
					height="240"
					draggable="false"
					class="max-[660px]:w-40 max-[660px]:h-40 max-[956px]:w-60 max-[956px]:h-60 w-40 h-40 lg:w-48 lg:h-48 xl:w-60 xl:h-60 ml-auto rounded-[10px] shadow-2xl select-none transition-all"
					alt="onwner of the website"
				/>
			</div>
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p class="font-semibold">{$languageSelected == "en" ? "That's me!" : "Esse sou eu!"}</p>
		</Tooltip.Content>
	</Tooltip.Root>


	<!-- background image -->
	<!-- <img src="platonic-form.png" alt="" class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full opacity-75 pointer-events-none"> -->
</section>
