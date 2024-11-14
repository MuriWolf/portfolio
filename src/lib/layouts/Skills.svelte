<script lang="ts">
	import { slide } from 'svelte/transition';
    import { Badge } from "$lib/components/ui/badge";
	import { increaseSkillSizeBasedOnRelevance } from '$lib/utilities/increaseSkillSizeBasedOnRelevance';
    import { textContent, languageSelected } from '$lib/store';

    const skills = [
    {
        name: 'Typescript',
        relevance: 2
    },
    {
        name: 'Svelte/kit',
        relevance: 3
    },
    {
        name: 'Angular',
        relevance: 3
    },
    {
        name: 'Java',
        relevance: 2
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
        name: 'JQuery',
        relevance: 0
    },
    {
        name: 'Linux',
        relevance: 2
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
        name: 'Vercel',
        relevance: 3
    },
    {
        name: 'Shadcn-svelte',
        relevance: 3
    }
];
</script>

<section class="mt-8 sm:mt-16" id="skills">
    <h2 class="text-c-text-darker text-3xl font-title font-bold mb-4">{$languageSelected == 'pt' ? 'O que uso' : 'What I use'}</h2>
    <div class="flex flex-wrap gap-x-3 gap-3 mx-auto transition-all" >
        {#each skills as skill, id}
            {#key id}
                <Badge class="bg-c-primary hover:animate-button-hover hover:border-transparent  inline-block rounded-[2px] max-sm:!px-2 !py-1 border-none border-c-primary-darker text-c-text-darker text-lg transition-all" style={`padding: 0px ${increaseSkillSizeBasedOnRelevance(skill.relevance)}px;`}>{skill.name}</Badge>
            {/key}
        {/each}
    </div>
</section>