<script>
	import SocialMedias from "$lib/components/SocialMedias.svelte";
    import { Button } from "$lib/components/ui/button";
</script>
<section class="flex flex-col justify-end bg-c-primary p-4 md:p-8 border-[1px] h-[50vh] border-c-primary-darker rounded-2xl ">
    <h2 class="font-semibold text-c-text text-3xl"> Murillo Pinheiro de Oliveira</h2>
    <h1 class="font-bold text-c-text-darker text-5xl max-w-[1000px]">Building websites with responsiveness, accessibility and user experience in mind.</h1>

    <div class="flex gap-4 items-center mt-4">
        <SocialMedias />
        <Button class="bg-c-text-darker text-xl font-bold ml-4">Text me</Button>
    </div>
</section>