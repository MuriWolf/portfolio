<script type="ts">
	import logo from '$lib/assets/logo.svg';
    import * as Tooltip from "$lib/components/ui/tooltip";
	import { languageSelected, textContent } from '$lib/store';
	import Saos from 'saos';
    
    const date = new Date();
    const currentYear = date.getFullYear()
</script>

<!-- <Saos animation={"slide-top 0.4s cubic-bezier(0.645, 0.045, 0.355, 1.000) both"} top={50} bottom={50} > -->
    <footer class="max-w-[1340px] mx-auto">
        <div class="flex-col relative text-center gradient-blue-ish border-2 border-white/70 mx-2 md:mx-8 py-10 px-8 lg:px-16 rounded-2xl flex justify-center mb-2 md:mb-8 ">
            <img src={logo} alt="logo" class="max-sm:mb-4 sm:absolute sm:left-1/2 sm:-translate-x-[275%] mx-auto max-w-[82px] max-h-[82px]" />
            <p class="text-c-body-text font-semibold">{$textContent.footer.authorship[$languageSelected]}</p>
            <Tooltip.Root openDelay={300} >
                <Tooltip.Trigger >
                    <p class="text-c-body-text-light font-bold text-lg">@ Murillo Pinheiro de Oliveira</p>
                </Tooltip.Trigger>
                <Tooltip.Content>
                  <p class="font-semibold bg-opacity-0 shadow-none">{$textContent.footer.love[$languageSelected]}</p>
                </Tooltip.Content>
            </Tooltip.Root>
            <p class="text-c-body-text font-semibold">{currentYear ?? 2024}</p>
        </div>
    </footer>
<!-- </Saos> -->