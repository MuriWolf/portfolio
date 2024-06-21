<script lang="ts">
	import Contact from '$lib/assets/icons/Contact.svelte';
	import Testimonials from '$lib/assets/icons/Testimonials.svelte';
	import Skills from '$lib/assets/icons/Skills.svelte';
	import Folder from '$lib/assets/icons/Folder.svelte';
	import Person from '$lib/assets/icons/Person.svelte';

</script>

<header class="flex justify-between items-center bg-c-primary p-4 md:px-8 rounded-2xl border-[1px] border-c-primary-darker">
    <div class="bg-c-text rounded-full h-16 w-16"></div>
    <nav>
        <ul class="flex gap-4 font-semibold text-lg">
            <li class="text-c-text-darker hover:text-primary">
                <a href="#me" class="flex items-center gap-2">
                    <Person />
                    Me
                </a>
            </li>
            <li class="text-c-text-darker hover:text-primary">
                <a href="#projects" class="flex items-center gap-2">
                    <Folder />
                    Projects
                </a>
            </li>
            <li class="text-c-text-darker hover:text-primary">
                <a href="#testimonials" class="flex items-center gap-2">
                    <Testimonials />
                    Testimonials
                </a>
            </li>
            <li class="text-c-text-darker hover:text-primary">
                <a href="#skills" class="flex items-center gap-2">
                    <Skills />
                    Skills
                </a>
            </li>
            <li class="text-c-text-darker hover:text-primary">
                <a href="#contact" class="flex items-center gap-2">
                    <Contact />
                    Contact
                </a>
            </li>
        </ul>
    </nav>
</header>