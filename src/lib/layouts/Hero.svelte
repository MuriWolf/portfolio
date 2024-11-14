<script>
	import SocialMedias from '$lib/components/SocialMedias.svelte';
	import { textContent, languageSelected } from '$lib/store';
</script>

<section
	class="flex flex-col justify-end gradient p-4 md:p-8 border-2 min-h-[50vh] md:min-h-[70vh] max-h-[800px] border-c-primary-darker rounded-xl"
>
	<h2 class="font-bold font-title text-white/75 text sm:text-xl md:text-3xl mt-4">
		Murillo Pinheiro de Oliveira
	</h2>
	<h1
		class="font-bold font-title text-white text-2xl sm:text-4xl md:text-5xl max-w-[1000px] mb-4"
	>
		{$textContent.hero.subtitle[$languageSelected]}
	</h1>
	<div class="flex gap-x-6 gap-y-4 flex-wrap items-center mt-4 mb-4 md:mb-24">
		<SocialMedias orientation="horizontal" theme="light" />

	</div>
</section>
