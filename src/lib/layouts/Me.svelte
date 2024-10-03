<script lang="ts">
	import me from '$lib/assets/images/me.webp';
	import curriculumPT from '$lib/assets/pdf/murillo-pinheiro-curriculum-1-1.pdf';
	import curriculumEN from '$lib/assets/pdf/curriculum-en.pdf';
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
				class="bg-c-secondary w-full text-white font-title font-semibold text-xl rounded-[2px] hover:bg-primary focus:bg-primary active:scale-95 transition-all flex items-center"
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
				class="bg-c-secondary w-full text-white font-title font-semibold text-xl rounded-[2px] hover:bg-primary focus:bg-primary active:scale-95 transition-all flex items-center"
				>Download Resume</Button
			>
		</a>
	{/if}
</section>
