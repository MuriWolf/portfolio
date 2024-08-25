<script lang="ts">
	import me from '$lib/assets/images/me.webp';
	import curriculum from '$lib/assets/pdf/murillo-pinheiro-curriculum.pdf';
	import Button from '$lib/components/ui/button/button.svelte';
	import { textContent, languageSelected } from '$lib/store';
</script>

<section class="flex flex-col flex-wrap relative items-center justify-center my-6 gap-4" id="me">
	<img
		src={me}
		class="xl:absolute rounded-full mb-10 left-0 xl:translate-x-1/3"
		alt="me!"
	/>
	<article class="flex flex-col gap-4 max-w-lg text-c-text font-medium mx-auto text-lg">
		{#each $textContent.about.paragraphs as paragraph}
			<p>{paragraph[$languageSelected]}</p>
		{/each}
	</article>
	<a href={curriculum} download type="application/pdf" class="block max-w-lg !w-full flex-1 mx-auto mt-8">
		<Button
		class="bg-c-secondary block w-full text-white font-title font-semibold text-xl rounded-[2px] hover:bg-primary focus:bg-primary active:scale-95 transition-all "
		>{$languageSelected == 'pt' ? 'Baixar Currículo' : 'Download Resume'}</Button>
	</a>
</section>
