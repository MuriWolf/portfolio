<script lang="ts">
    import * as Tooltip from "$lib/components/ui/tooltip";
    import { techIcons } from "$lib/utils";
    import { textContent, languageSelected } from '$lib/store';
	import Saos from "saos";

</script>

<!-- <Saos animation={"from-right 0.4s cubic-bezier(0.645, 0.045, 0.355, 1.000) both"} once={true}>
</Saos> -->

    <section id="techs" class="col-span-1 max-[956px]:col-span-2 gradient-white  py-12 h-full px-4 xs:px-6 sm:px-8 rounded-2xl shadow-xl shadow-stone-900 bg-test" >
        <h2 class="font-title font-bold text-2xl xs:text-3xl text-c-body-text mb-6 lowercase">3. {$textContent.techs.title[$languageSelected] ?? "TECHNOLOGIES"}</h2>
        <p class="text-c-body-text">{$textContent.techs.subtitle[$languageSelected] ?? ""}</p>
        <div class="w-full grid techs-grid gap-4 mt-6">
            <!-- min-[560px]:grid-cols-5 min-[956px]:grid-cols-6 xl:grid-cols-5  min-[956px]:gap-6 lg:gap-8 -->
            {#each techIcons as item}
                <Tooltip.Root openDelay={250}>
                <Tooltip.Trigger class="backdrop-blur-[1.5px] bg-black text-c-body-text bg-opacity-[0.05] backdrop-brightness-150 shadow-md hover:shadow-sm  hover:shadow-white rounded-xl overflow-hidden p-1 hover:bg-opacity-0 focus:bg-opacity-0 focus:outline-none duration-500 ease-in-out ">
                        <img src={item.url} alt={`${item.title} icon`} class="rounded-xl p-1" />
                    </Tooltip.Trigger>
                    <Tooltip.Content sideOffset={12} >
                        <p class="font-semibold">{item.title}</p>
                    </Tooltip.Content>
                </Tooltip.Root>
            {/each} 
        </div>
    </section>
