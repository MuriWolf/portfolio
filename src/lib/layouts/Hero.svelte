<script>
	import SocialMedias from "$lib/components/SocialMedias.svelte";
    import { Button } from "$lib/components/ui/button";
    import { textContent, languageSelected } from '$lib/store';
</script>
<section class="flex flex-col justify-end bg-c-primary p-4 md:p-8 border-[1px] min-h-[50vh] md:min-h-[70vh] max-h-[800px] border-c-primary-darker rounded-2xl ">
    <h2 class="font-semibold text-c-text text-xl sm:text-xl md:text-3xl"> Murillo Pinheiro de Oliveira</h2>
    <h1 class="font-bold text-c-text-darker text-2xl sm:text-4xl md:text-5xl max-w-[1000px]">{$textContent.hero.subtitle[$languageSelected]}</h1>
    <div class="flex gap-x-6 gap-y-4  flex-wrap items-center mt-4 md:mb-24">
        <SocialMedias orientation="horizontal" />
        <Button class="bg-c-text-darker text-xl font-bold">{$languageSelected == "pt" ? 'Entre em contato' : 'Text me'}</Button>
    </div>
</section>