<script>
	import Button from '$lib/components/ui/button/button.svelte';

	import Footer from "$lib/layout/Footer.svelte";

</script>

<main class="max-w-[1340px] mx-auto flex flex-col gap-4 xs:gap-8 my-4 xs:my-8">
    <section class="mx-4 xs:mx-8 rounded-3xl py-10 px-8 lg:px-16 bg-opacity-20 bg-[linear-gradient(to_right_bottom,rgba(74,78,120,0.85),rgba(46,34,36,0.8)),url(/images/paintings/the-creation-of-adam.png)] shadow-claymorphism
    ">
    <div class="max-w-[800px] bg-gradient-to-bl from-[#c2c1c115] to-[#b1b2b413] bg-clip-padding border-4 border-transparent p-7 backdrop-blur-sm rounded-2xl flex flex-col mx-auto glass-border after:content-['Website_Screenshots'] after:bg-c-background after:absolute after:-bottom-[18px] after:rounded-lg after:p-1 after:px-4 after:text-[13px] after:text-gray-50 after:font-bold after:font-title after:translate-x-1/2 after:right-1/2">
            <div class="flex items-center gap-6 mb-6">
                <a href="/#projects" class="bg-c-tertiary w-[52px] h-[52px] flex justify-center items-center shadow-claymorphism rounded-lg">
                    <svg width="30" height="35" viewBox="0 0 30 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.629499 15.6295C-0.207554 16.4665 -0.207554 17.8259 0.629499 18.663L11.3438 29.3772C12.1808 30.2143 13.5402 30.2143 14.3773 29.3772C15.2143 28.5402 15.2143 27.1808 14.3773 26.3438L7.31253 19.2857H27.8572C29.0424 19.2857 30 18.3281 30 17.1429C30 15.9576 29.0424 15 27.8572 15H7.31923L14.3706 7.94197C15.2076 7.10492 15.2076 5.74554 14.3706 4.90849C13.5335 4.07144 12.1741 4.07144 11.3371 4.90849L0.622803 15.6228L0.629499 15.6295Z" fill="#221627"/>
                    </svg>
                </a>
                <h1 class="flex-1 text-white text-center font-title font-bold text-shadow-sm text-3xl bg-c-background bg-opacity-75 p-2 rounded-lg shadow-inner">Formulário de Sign In</h1>
            </div>
            <div class="mx-auto rounded-2xl overflow-hidden inline-block">
                <img src="/images/projects/project.png" alt="" class="block mx-auto" >
            </div>
        </div>
    </section>
    <section class="relative gradient-dark-two py-12 px-8 lg:px-16 rounded-3xl mx-4 xs:mx-8 text-center">
        <h2 class="text-gray-50 font-title font-semibold text-3xl xs:text-4xl mb-4">Description</h2>
        <div class="flex flex-col gap-4 max-w-lg mx-auto mb-12">
            <p class="text-gray-200">Lorem ipsum dolor adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad </p>
            <p class="text-gray-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad </p>
            <p class="text-gray-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad </p>
        </div>
        <h2 class="text-gray-50 font-title font-semibold text-3xl xs:text-4xl mb-16">Technologies used</h2>

        <h2 class="text-gray-50 font-title font-semibold text-3xl xs:text-4xl mb-4">In Depth</h2>
        <div class="flex max-sm:flex-col justify-center gap-6 items-center max-w-lg mx-auto mb-12">
            <Button class="bg-c-tertiary w-full block text-c-darker-background font-title font-bold text-lg xs:text-xl rounded-xl text-shadow shadow-[#00000066] active:bg-c-tertiary hover:bg-c-tertiary hover:brightness-90 active:scale-95 transition-all shadow-claymorphism-2">Live View</Button>
            <Button class="bg-c-primary w-full block !text-c-body-text font-title font-bold text-lg xs:text-xl rounded-xl text-shadow shadow-[#00000066] active:bg-c-primary hover:bg-c-primary hover:brightness-90 active:scale-95 transition-all shadow-claymorphism-2">Discover More</Button>
        </div>

        <h2 class="text-gray-50 font-title font-semibold text-3xl xs:text-4xl mb-4">More</h2>
        <div class="flex justify-center gap-6 items-center max-w-lg mx-auto ">
            <Button class="bg-white w-full block text-c-darker-background font-title font-bold text-lg xs:text-xl rounded-xl text-shadow shadow-[#00000066] active:bg-white hover:bg-white hover:brightness-90 active:scale-95 transition-all shadow-claymorphism-2">See Other Projects </Button>
</div>
    </section>
</main>

<Footer />