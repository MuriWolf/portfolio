<script>
	let darkTheme = false;
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

<header class="absolute top-4 w-full hidden xl:block z-10">
	<div class="max-w-8xl w-[90%] flex justify-between items-center mx-auto">
		<div class="rounded-full h-16 w-16 bg-white" />
		<div class="flex justify-between gap-4 items-center">
			<nav>
				<ol class="list-decimal flex gap-10 text-gray-50 text-lg">
					<li>Intro</li>
					<li><a href="#about">About</a></li>
					<li><a href="#projects">Projects</a></li>
					<li><a href="#contact">Contact</a></li>
				</ol>
			</nav>
			<a href=".">
				<i class="fa-solid fa-language text-gray-50 fa-2xl" />
			</a>
			<button
				class="h-7 w-12 px-1 rounded-full bg-gray-50 border-[1px] border-gray-50 flex justify-between items-center relative"
				on:click={() => (darkTheme = !darkTheme)}
			>
				<i class="fas fa-moon text-gray-600" />
				<i class="fas fa-sun text-yellow-600" />
				<span
					class="absolute bg-gray-900 rounded-full w-6 h-6 left-0 {darkTheme == true
						? 'left-0'
						: 'right-0'}"
				/>
			</button>
		</div>
	</div>
</header>
<main
	class="bg-gradient-to-l from-dark-main-blue to-main-blue text-sm md:text-base relative"
>
	<img src="waves.png" class="absolute top-0 rotate-180 w-full opacity-20" alt="" />
	<section class="pt-32 w-[90%] h-screen mx-auto max-w-8xl relative">
		<div class="flex justify-between">
			<div class="flex-[5]">
				<h1 class="text-3xl sm:text-5xl lg:text-[5rem] font-semibold mt-16">
					<span
						class="font-bold bg-gradient-to-r from-main-yellow to-main-green bg-clip-text fill-transparent bg-[size:100%] text-transparent bg-main-yellow"
						>Hello,</span
					><br />
					<span class="text-gray-100">content content,</span><br />
					<span class="text-gray-300">content content content.</span>
				</h1>
				<h2 class="max-w-2xl mt-4 text-gray-200">
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit rerum voluptatem, molestiae
					quibusdam accusamus corrupti rem perspiciatis itaque recusandae cumque odit iure maiores
					ad dignissimos impedit iste! Consectetur, quas tempore.
				</h2>
			</div>
			<!-- <div class="flex-2 hidden min-[1280px]:block">
				<img src="Rock_On_R-Angle_A5.png" class=" -rotate-[80deg] scale-110" alt="" />
			</div> -->
		</div>
		<a href="#about" class="block text-center mx-auto p-3 mt-64"
			><i class="fa-solid fa-chevron-down fa-2xl text-gray-100" /></a
		>
	</section>
	<section class="pt-32 w-[90%] mx-auto max-w-8xl">
		<h3 id="about" class="text-gray-50 text-2xl">2. About</h3>
		<div class="flex gap-12 mt-16">
			<div class="profile-mold relative bg-red-400 h-[14.25rem]">
				<img src="me.jpg" class="border-2 border-main-yellow h-full z-[1] relative" alt="" />
			</div>
			<article class="flex-[2] flex flex-col gap-8 text-gray-200">
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
                <div class=" grid grid-cols-4 gap-4">
                    {#each techIcons as techIcon}
                        <div
                            class="rounded-xl from-light-main-blue to-main-blue bg-gradient-to-r flex justify-center items-center hover:scale-105 transition-all"
                        >
                            <img src={techIcon.src} class="h-[80%]" alt="" title={techIcon.name} />
                        </div>
                    {/each}
                </div>
            </div>
		</div>
	</section>
    <section class="pt-64 w-[90%] h-screen mx-auto max-w-8xl relative">
        <h3 id="projects" class="text-gray-50 text-2xl">3. Projects</h3>
        
    </section>
    <section class="pt-64 w-[90%] h-screen mx-auto max-w-8xl relative">
        <h3 id="contact" class="text-gray-50 text-2xl">4. Contact</h3>
    </section>
</main>
<footer>d</footer>

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
