<script lang="ts">
	import me from '$lib/assets/images/me.webp';
	import curriculumPT from '$lib/assets/pdf/murillo-pinheiro-curriculum-web.pdf';
	import curriculumEN from '$lib/assets/pdf/murillo-pinheiro-curriculum-en.pdf';
	import Button from '$lib/components/ui/button/button.svelte';
	import { textContent, languageSelected } from '$lib/store';
</script>

<section class="flex flex-col flex-wrap relative items-center justify-center gap-6" id="me">
	<img src={me} class="xl:absolute rounded-full left-0 xl:translate-x-1/3" alt="me!" />
	<article class="flex flex-col gap-4 max-w-lg text-c-text font-medium mx-auto md:text-lg">
		{#each $textContent.about.paragraphs as paragraph}
			<p>{paragraph[$languageSelected]}</p>
		{/each}
	</article>
	{#if $languageSelected == 'pt'}
		<a
			href={curriculumPT}
			download
			type="application/pdf"
			class="block max-w-lg !w-full flex-1 mx-auto"
		>
			<Button
				class="bg-c-secondary gradient leading-none text-xl font-bold mx-auto block mt-6 max-w-lg w-full active:scale-95 transition-all ease-out text-center font-title text-stone-50 py-2 px-4 rounded-[2px] hover:bg-primary focus:bg-primary"
				>Baixar Currículo</Button
			>
		</a>
	{:else}
		<a
			href={curriculumEN}
			download
			type="application/pdf"
			class="block max-w-lg !w-full flex-1 mx-auto"
		>
			<Button
				class="bg-c-secondary gradient text-xl font-bold mx-auto block mt-6 max-w-lg w-full active:scale-95 transition-all ease-out text-center font-title leading-none text-stone-50 py-2 px-4 rounded-[2px] hover:bg-primary focus:bg-primary"
				>Download Resume</Button
			>
		</a>
	{/if}
</section>
