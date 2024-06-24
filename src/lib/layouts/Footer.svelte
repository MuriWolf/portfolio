<script>
	import SocialMedias from "$lib/components/SocialMedias.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
    import { Separator } from "$lib/components/ui/separator";
    import { languageSelected } from '$lib/store';
</script>
<footer class="bg-c-primary border-[1px] border-c-primary-darker p-4 md:px-8 rounded-2xl mt-16 sm:mt-24 mx-2 sm:mx-4" id="contact">
    <h1 class="font-bold text-c-text-darker text-3xl text-center">{$languageSelected == "pt" ? 'Podemos trabalhar juntos. Hoje.' : 'Let’s work together. Today.'}</h1>
    <Button class="bg-c-text-darker text-xl font-bold ml-4 mx-auto block mt-6 max-w-lg w-full active:scale-95 transition-all ease-out">{$languageSelected == "pt" ? 'Entre em contato' : 'Text me'}</Button>
    <Separator class="mt-6 bg-c-primary-darker max-w-xl mx-auto" />
    <SocialMedias class="mx-auto mt-6" orientation="horizontal" />
    <p class="text-c-text text-center font-medium mt-6">2024</p>
</footer>