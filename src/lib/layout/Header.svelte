<script lang="ts">
	import logo from '$lib/assets/logo.svg';
</script>

<header class="flex justify-between items-center">
    <img src={logo} alt="logo" />
    <nav class="ml-auto">
        <ul class="flex gap-x-8 list-decimal text-c-body-text text-lg">
            <li><a href="#hero">Intro</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#technologies">Techs</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>
    <button class="ml-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M17.85 33L24.675 15H27.825L34.65 33H31.5L29.8875 28.425H22.6125L21 33H17.85ZM6 28.5L3.9 26.4L11.475 18.825C10.6 17.95 9.80625 16.95 9.09375 15.825C8.38125 14.7 7.725 13.425 7.125 12H10.275C10.775 12.975 11.275 13.825 11.775 14.55C12.275 15.275 12.875 16 13.575 16.725C14.4 15.9 15.2563 14.7438 16.1438 13.2563C17.0313 11.7688 17.7 10.35 18.15 9H1.5V6H12V3H15V6H25.5V9H21.15C20.625 10.8 19.8375 12.65 18.7875 14.55C17.7375 16.45 16.7 17.9 15.675 18.9L19.275 22.575L18.15 25.65L13.575 20.9625L6 28.5ZM23.55 25.8H28.95L26.25 18.15L23.55 25.8Z" fill="white"/>
        </svg>
    </button>
</header>