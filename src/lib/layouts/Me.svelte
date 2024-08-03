<script lang="ts">
	import me from '$lib/assets/images/me.webp';
	import { textContent, languageSelected } from '$lib/store';
</script>

<section class="flex flex-col relative md:flex-row items-center justify-center my-6 gap-4" id="me">
	<img
		src={me}
		class="xl:absolute rounded-full mb-10 md:mb-0 md:ml-auto left-0 xl:translate-x-1/3"
		alt="me!"
	/>
	<article class="flex flex-col gap-4 max-w-lg text-c-text font-medium mx-auto text-lg">
		{#each $textContent.about.paragraphs as paragraph}
			<p>{paragraph[$languageSelected]}</p>
		{/each}
	</article>
</section>
