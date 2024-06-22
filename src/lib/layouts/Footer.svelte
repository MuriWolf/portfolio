<script>
	import SocialMedias from "$lib/components/SocialMedias.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
    import { Separator } from "$lib/components/ui/separator";
</script>
<footer class="bg-c-primary border-[1px] border-c-primary-darker p-4 md:px-8 rounded-2xl mt-6 mx-4" id="contact">
    <h1 class="font-bold text-c-text-darker text-3xl text-center">Let’s work together. Today.</h1>
    <Button class="bg-c-text-darker text-xl font-bold ml-4 mx-auto block mt-6 max-w-lg w-full">Text me</Button>
    <Separator class="mt-6 bg-c-primary-darker max-w-xl mx-auto" />
    <SocialMedias class="mx-auto mt-6" />
    <p class="text-c-text text-center font-medium mt-6">2024</p>
</footer>