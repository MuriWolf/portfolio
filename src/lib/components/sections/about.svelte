<script>
   	let techIcons = [
		{
			name: 'Vue',
			src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg'
		},
		{
			name: 'Tailwind',
			src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg'
		},
		{
			name: 'Sass',
			src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg'
		},
		{
			name: 'Bootstrap',
			src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg'
		},
		{
			name: 'TypeScript',
			src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
		},
		{
			name: 'JavaScript',
			src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
		},
		{
			name: 'jQuery',
			src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original-wordmark.svg'
		},
		{ name: 'Git', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
		{
			name: 'GitHub',
			src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg'
		},
		{
			name: 'HTML',
			src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'
		},
		{
			name: 'CSS',
			src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'
		},
		{ name: 'Gulp', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gulp/gulp-plain.svg' },
		{
			name: 'npm',
			src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg'
		},
		{
			name: 'Node.js',
			src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
		},
		{ name: 'PHP', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg' },
		{
			name: 'Python',
			src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
		},
		{
			name: 'MySQL',
			src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg'
		}
	];
</script>


<section class="pt-32 w-[90%] mx-auto max-w-8xl">
    <h3 id="about" class="dark:text-gray-50 text-gray-900 text-2xl">II. About</h3>
    <div class="flex gap-12 mt-16">
        <div class="profile-mold relative bg-red-400 h-[14.25rem]">
            <img src="me.jpg" class="border-2 border-main-yellow h-full z-[1] relative" alt="" />
        </div>
        <article class="flex-[2] flex flex-col gap-8 dark:text-gray-300 text-gray-600">
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et, optio ea. Expedita itaque,
                aliquam nulla molestias natus quis similique, provident unde mollitia id porro a? Quis
                temporibus sit non facere?
            </p>
            <p>
                Impedit sed non architecto adipisci. Praesentium, hic facilis laboriosam veritatis ratione
                fuga cum illum consequatur adipisci eius tenetur, velit minima culpa alias rerum deleniti
                dolorum. Omnis unde minus maxime reiciendis!
            </p>
            <p>
                Reiciendis inventore, ad aliquid adipisci deserunt provident sequi iure, sed quas ab optio
                atque vel qui exercitationem nobis obcaecati voluptates eligendi quo possimus maxime
                delectus? Nobis perferendis eius vero ullam?
            </p>
        </article>
        <hr class="bg-main-yellow w-[2px] h-auto" />
        <div class="flex-1">
            <!-- <h4 class="text-center text-gray-50 text-xl font-semibold mb-4">Technologies I use :)</h4> -->
            <div class=" grid grid-cols-4 gap-4 select-none">
                {#each techIcons as techIcon}
                    <div
                        class="rounded-xl dark:from-light-main-blue dark:to-main-blue from-l-main-blue to-l-light-main-blue bg-gradient-to-r flex justify-center items-center hover:scale-105 transition-all"
                    >
                        <img src={techIcon.src} class="h-[80%]" alt="" title={techIcon.name} />
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>

<style>
	.profile-mold::before {
		content: '';
		width: 100%;
		height: 100%;
		top: -20px;
		left: -20px;
		z-index: 0;
		position: absolute;
		border: 5px solid #ecd444;
	}
</style>