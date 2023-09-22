<script>
// @ts-nocheck

    export let data;
</script>

<img src="waves.png" class="absolute -top-24 rotate-180 w-full opacity-40 dark:opacity-10 max-h-[750px]" alt="" />
<section class="pt-28 w-[90%] h-screen mx-auto max-w-8xl relative">
    <div class="flex justify-between">
        <div class="flex-[5]">
            <h1 class="text-3xl sm:text-5xl lg:text-[5rem] font-semibold">
                <span
                    class="font-extrabold bg-gradient-to-r dark:from-main-yellow from-dark-main-yellow dark:to-main-green to-main-green bg-clip-text fill-transparent bg-[size:100%] text-transparent bg-main-yellow"
                    >{data.content.heroTitle},</span
                ><br />
                <span class="dark:text-gray-100 text-gray-700">content content,</span><br />
                <span class="dark:text-gray-300 text-gray-600">content content content.</span>
            </h1>
            <h2 class="max-w-3xl mt-4 dark:text-gray-200 text-gray-600">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit rerum voluptatem, molestiae
                quibusdam accusamus corrupti rem perspiciatis itaque recusandae cumque odit iure maiores
                ad dignissimos impedit iste! Consectetur, quas tempore.
            </h2>
        </div>
    </div>
    <a href="#about" class="block text-center mx-auto p-3 mt-32"
        ><i class="fa-solid fa-chevron-down fa-2xl dark:text-gray-100 text-gray-700" /></a
    >
</section>