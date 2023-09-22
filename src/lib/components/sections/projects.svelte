<script>
	import Project from "../project.svelte";

</script>
<section class="pt-64 w-[90%] mx-auto max-w-8xl relative">
    <h3 id="projects" class="text-gray-50 text-2xl">III. Projects</h3>

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-8">
        {#each [1,2,3,4,5,6,7] as aa}
            <Project />
        {/each}
    </div>
</section>