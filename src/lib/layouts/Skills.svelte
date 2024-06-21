<script lang="ts">
	import { slide } from 'svelte/transition';
    import { Badge } from "$lib/components/ui/badge";
	import { randomIntFromInterval } from '$lib/utilities/randomIntFromInterval';


    function addPadding(id: number) {
        const possibilities = [24, 48, 64, 96];
        // return possibilities[randomIntFromInterval(0, 2)];
        return possibilities[id];
    }

    const skills = [
    {
        name: 'Linux',
        relevance: 2
    },
    {
        name: 'Docker',
        relevance: 1
    },
    {
        name: 'Typescript',
        relevance: 2
    },
    {
        name: 'Svelte/kit',
        relevance: 3
    },
    {
        name: 'Git',
        relevance: 2
    },
    {
        name: 'Tailwind',
        relevance: 3
    },
    {
        name: 'Figma',
        relevance: 2
    },
    {
        name: 'Gimp',
        relevance: 2
    },
    {
        name: 'Flutter',
        relevance: 0
    },
    {
        name: 'JQuery',
        relevance: 0
    },
    {
        name: 'MySQL',
        relevance: 2
    },
    {
        name: 'php',
        relevance: 1
    },
    {
        name: 'Python',
        relevance: 1
    },
    {
        name: 'SASS',
        relevance: 2
    },
    {
        name: 'CSS',
        relevance: 2
    },
    {
        name: 'Javascript',
        relevance: 2
    },
    {
        name: 'Vue',
        relevance: 1
    },
    {
        name: 'Vercel',
        relevance: 3
    },
    {
        name: 'Shadcn-svelte',
        relevance: 3
    }
];
</script>

<section class="mt-16" id="skills">
    <h2 class="text-c-text-darker text-3xl font-bold mb-4">What I use</h2>
    <div class="flex flex-wrap gap-x-3 gap-3 mx-auto transition-all" transition:slide >
        {#each skills as skill, id}
            {#key id}
                <Badge class="bg-c-primary rounded-[10px] hover:bg-c-primary/50 border-[1px] border-c-primary-darker text-c-text-darker text-lg hover:text-primary transition-all" style={`padding: 0px ${addPadding(skill.relevance)}px;`}>{skill.name}</Badge>
            {/key}
        {/each}
    </div>
</section>