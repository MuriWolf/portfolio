<script lang="ts">
    import * as Tooltip from "$lib/components/ui/tooltip";

    const content = [
        {title: "Linux", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg"},
        {title: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain.svg"},
        {title: "Typescript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"},
        {title: "Svelte", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg"},
        {title: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"},
        {title: "Tailwind", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"},
        {title: "Figma", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"},
        {title: "Flutter", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg"},
        {title: "JQuery", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg"},
        {title: "MySQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg"},
        {title: "PHP", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg"},
        {title: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"},
        {title: "SASS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg"},
        {title: "CSS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"},
        {title: "Javascript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"},
        {title: "Vue", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"},

    ]
</script>

<section id="technologies" class="col-span-1 max-[956px]:col-span-2 gradient-dark-two py-12 px-6 xs:px-8 rounded-3xl ">
    <h2 class="font-title font-bold text-2xl xs:text-3xl text-c-body-text mb-6">3. TECHNOLOGIES</h2>
    <p class="text-gray-200 ">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad </p>
    <div class="w-full grid techs-grid gap-4 mt-6">
        <!-- min-[560px]:grid-cols-5 min-[956px]:grid-cols-6 xl:grid-cols-5  min-[956px]:gap-6 lg:gap-8 -->
        {#each content as item}
            <Tooltip.Root openDelay={400}>
                <Tooltip.Trigger class="bg-white bg-opacity-20 shadow-md rounded-xl overflow-hidden p-1 hover:ring-4 transition-all duration-500 ease-in-out ring-c-tertiary hover:shadow-none">
                    <img src={item.url} alt="" class="rounded-xl p-1" />
                </Tooltip.Trigger>
                <Tooltip.Content sideOffset={12} >
                    <p class="font-semibold">{item.title}</p>
                </Tooltip.Content>
            </Tooltip.Root>
        {/each} 
    </div>
</section>

<style>
    .techs-grid {
        grid-template-columns: repeat(auto-fill, minmax(50px, 1fr))
    }

    @media (min-width: 496px) {
        .techs-grid {
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr))
    }   
    }
</style>