<script lang="ts">
    import { textContent, languageSelected } from '$lib/store';
	import Saos from 'saos';
</script>

<Saos animation={"from-left 0.3s cubic-bezier(0.35, 0.5, 0.65, 0.95) both"} once={true}>
</Saos>
    <section id="about" class="max-[956px]:col-span-2 relative flex justify-between shadow-xl shadow-stone-900 py-12 px-4 xs:px-6 sm:px-8 rounded-2xl gap-4 gradient-white">
        <div class="sm:w-1/2 w-full flex flex-col gap-y-4 md:gap-y-6" >
            <h2 class="font-title font-bold text-2xl xs:text-3xl text-black mb-2 lowercase">2. {$textContent.about.title[$languageSelected] ?? "about"}</h2>
            {#each $textContent.about.paragraphs as paragraph}
                <p class=" text-black font-medium">{paragraph[$languageSelected]}</p>
            {/each}
    
        </div>
        <div class="sm:flex-1 hidden sm:block">
            <img src="/images/photos/me2.png" width="240" height="240" draggable="false" class="max-[660px]:w-40 max-[660px]:h-40 max-[956px]:w-60 max-[956px]:h-60 w-40 h-40 lg:w-48 lg:h-48 xl:w-60 xl:h-60 ml-auto border-4 rounded-[10px] border-black shadow-2xl select-none"  alt="onwner of the website">
        </div>
    
        <!-- background image -->
        <!-- <img src="platonic-form.png" alt="" class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full opacity-75 pointer-events-none"> -->
    </section>
