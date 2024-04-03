<script lang="ts">
	import { textContent, languageSelected, projectName } from "$lib/store";
  import "../style/app.css";
  import "../style/utilities.css";

  export let data;
  const linkContent = { 
    title: {en: "Murillo P. de Oliveira's Portfolio", pt: "Portfolio de Murillo P. de Oliveira"},
    description: {en: "Young front-end web Developer", pt: "Jovem desenvolvedor front-end web"},
  }

  textContent.set(data.content);
  languageSelected.set(data.language || "en");
</script>

<svelte:head>
  {#if $projectName == ""}
    <title>Murillo | Web Dev</title>
  {:else}
    <title>{$projectName} | Murillo</title>
  {/if}
  <meta name="description" content={linkContent.description[$languageSelected]}>
  <meta name="keywords" content="web development front-end brazil programming freelance developer">
  <meta name="og:image" content={`/images/logo.png`} />
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
</style>