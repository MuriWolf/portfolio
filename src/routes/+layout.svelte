<script lang="ts">
	import { textContent, languageSelected, projectName } from '$lib/store';
	import '../style/app.css';
	import { onNavigate } from '$app/navigation';
	import Footer from '$lib/layouts/Footer.svelte';
	import logo from '$lib/assets/images/logo-big.png';

	onNavigate((navigation) => {
		// this class is applied to the body on the main page, when filter or the map is open. This prevents the overflow-hidden to stay on page.
		// @ts-ignore
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
				// @ts-ignore
				document.startViewTransition(async () => {
						resolve();
						await navigation.complete;
				});
		});
	});


	export let data;
	const linkContent = {
		title: { en: "Murillo P. de Oliveira's Portfolio", pt: 'Portfolio de Murillo P. de Oliveira' },
		description: { en: 'Young front-end web Developer', pt: 'Jovem desenvolvedor front-end web' },
	};

	textContent.set(data.content);
	languageSelected.set(data.language || 'en');
</script>

<svelte:head>
	{#if $projectName == ''}
		<title>Murillo | Web Dev</title>
	{:else}
		<title>{$projectName} | Murillo</title>
	{/if}
	<meta name="description" content={linkContent.description[$languageSelected]} />
	<meta
		name="keywords"
		content="web development front-end brazil programming freelance developer"
	/>
	<meta name="og:image" content={logo} />
</svelte:head>

<slot />

<style>
	@keyframes -global-from-left {
		0% {
			transform: rotateX(50deg) translateX(-200vw) skewX(-50deg);
			opacity: 1;
		}
		100% {
			transform: rotateX(0deg) translateX(0) skewX(0deg);
			opacity: 1;
		}
	}

	@keyframes -global-from-right {
		0% {
			transform: rotateX(50deg) translateX(200vw) skewX(-50deg);
			opacity: 1;
		}
		100% {
			transform: rotateX(0deg) translateX(0) skewX(0deg);
			opacity: 1;
		}
	}

	@keyframes -global-slide-bottom {
		0% {
			-webkit-transform: translateY(-100vh);
			transform: translateY(-100vh);
		}
		100% {
			-webkit-transform: translateY(0px);
			transform: translateY(0px);
		}
	}

	@keyframes -global-slide-top {
		0% {
			-webkit-transform: translateY(100vh);
			transform: translateY(100vh);
		}
		100% {
			-webkit-transform: translateY(0px);
			transform: translateY(0px);
		}
	}

	@keyframes -global-swing-right-bck {
		0% {
			-webkit-transform: rotateY(-180deg);
			transform: rotateY(-180deg);
			-webkit-transform-origin: right;
			transform-origin: right;
		}
		100% {
			-webkit-transform: rotateY(0);
			transform: rotateY(0);
			-webkit-transform-origin: right;
			transform-origin: right;
		}
	}
	@keyframes -global-slide-fwd-center {
		0% {
			-webkit-transform: translateZ(0) perspective(200px);
			transform: translateZ(0) perspective(200px);
		}
		100% {
			-webkit-transform: translateZ(160px) perspective(200px);
			transform: translateZ(160px) perspective(200px);
		}
	}
</style>