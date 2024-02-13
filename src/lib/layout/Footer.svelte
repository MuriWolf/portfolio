<script type="ts">
	import logo from '$lib/assets/logo.svg';
    import * as Tooltip from "$lib/components/ui/tooltip";

    const date = new Date();
    const currentYear = date.getFullYear()
</script>

<footer class="max-w-[1340px] mx-auto ">
    <div class="flex-col relative text-center bg-c-primary border-4 border-c-secondary mx-8 py-10 px-8 lg:px-16 rounded-3xl shadow-claymorphism flex justify-center mb-8">
        <p class="text-c-body-text font-semibold">Designed & Developed by</p>
        <img src={logo} alt="logo" class=" max-sm:mb-4 sm:absolute sm:left-1/2 sm:-translate-x-[275%] mx-auto max-w-[82px] max-h-[82px]" />
        <Tooltip.Root openDelay={300} >
            <Tooltip.Trigger >
                <p class="text-c-secondary font-bold text-lg">@ Murillo Pinheiro de Oliveira</p>
            </Tooltip.Trigger>
            <Tooltip.Content>
              <p class="font-semibold bg-opacity-0 shadow-none">Made with the help of my love, Ana Laura ❤️</p>
            </Tooltip.Content>
        </Tooltip.Root>
        <p class="text-c-body-text font-semibold">{currentYear ?? 2024}</p>
    </div>
</footer>