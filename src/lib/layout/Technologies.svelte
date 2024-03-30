<script lang="ts">
    import * as Tooltip from "$lib/components/ui/tooltip";
    import { techIcons } from "$lib/utils";
    import { textContent, languageSelected } from '$lib/store';

</script>

<section id="techs" class="col-span-1 max-[956px]:col-span-2 gradient-dark-two py-12 px-4 xs:px-6 sm:px-8 rounded-3xl bg-test">
    <h2 class="font-title font-bold text-2xl xs:text-3xl text-c-body-text mb-6 uppercase">3. {$textContent.techs.title[$languageSelected] ?? "TECHNOLOGIES"}</h2>
    <p class="text-gray-200 ">{$textContent.techs.subtitle[$languageSelected] ?? ""}</p>
    <div class="w-full grid techs-grid gap-4 mt-6">
        <!-- min-[560px]:grid-cols-5 min-[956px]:grid-cols-6 xl:grid-cols-5  min-[956px]:gap-6 lg:gap-8 -->
        {#each techIcons as item}
            <Tooltip.Root openDelay={250}>
                <Tooltip.Trigger class="backdrop-blur-[1.5px] bg-white bg-opacity-[0.08] backdrop-brightness-150 hover:backdrop-brightness-200 shadow-md rounded-xl overflow-hidden p-1 hover:ring-2 focus:ring-2 duration-500 ease-in-out ring-c-tertiary hover:shadow-none">
                    <img src={item.url} alt="" class="rounded-xl p-1" />
                </Tooltip.Trigger>
                <Tooltip.Content sideOffset={12} >
                    <p class="font-semibold">{item.title}</p>
                </Tooltip.Content>
            </Tooltip.Root>
        {/each} 
    </div>
</section>